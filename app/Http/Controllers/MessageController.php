<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request, ?User $user = null): Response
    {
        $currentUser = $request->user();
        $selectedUser = $this->validConversationUser($currentUser, $user);

        if ($selectedUser) {
            Message::where('sender_id', $selectedUser['id'])
                ->where('receiver_id', $currentUser->id)
                ->where('lu', false)
                ->update(['lu' => true]);
        }

        return Inertia::render('Messages/Index', [
            'contacts' => $this->contactsFor($currentUser),
            'conversations' => $this->conversationsFor($currentUser),
            'selectedUser' => $selectedUser,
            'messages' => $selectedUser
                ? $this->messagesBetween($currentUser, $selectedUser)
                : collect(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $currentUser = $request->user();

        $data = $request->validate([
            'receiver_id' => ['required', 'integer', Rule::exists('users', 'id')],
            'contenu' => ['required', 'string', 'max:2000'],
        ]);

        $receiver = User::findOrFail($data['receiver_id']);

        abort_unless($this->canMessage($currentUser, $receiver), 403);

        Message::create([
            'sender_id' => $currentUser->id,
            'receiver_id' => $receiver->id,
            'contenu' => $data['contenu'],
            'envoyeLe' => now(),
            'lu' => false,
        ]);

        return to_route('messages.index', $receiver)->with('success', 'Message envoye.');
    }

    private function validConversationUser(User $currentUser, ?User $user): ?array
    {
        if (! $user || ! $this->canMessage($currentUser, $user)) {
            return null;
        }

        return $user->only(['id', 'name', 'email', 'photoProfile', 'role']);
    }

    private function canMessage(User $sender, User $receiver): bool
    {
        if ($sender->id === $receiver->id) {
            return false;
        }

        if ($sender->role === 'admin') {
            return in_array($receiver->role, ['client', 'provider'], true) && $sender->statut && $receiver->statut;
        }

        if ($receiver->role === 'admin') {
            return in_array($sender->role, ['client', 'provider'], true) && $sender->statut && $receiver->statut;
        }

        return in_array($sender->role, ['client', 'provider'], true)
            && in_array($receiver->role, ['client', 'provider'], true)
            && $sender->role !== $receiver->role
            && $sender->statut
            && $receiver->statut;
    }

    private function contactsFor(User $currentUser): Collection
    {
        if ($currentUser->role === 'admin') {
            return User::query()
                ->select(['id', 'name', 'email', 'photoProfile', 'role'])
                ->whereIn('role', ['client', 'provider'])
                ->where('statut', true)
                ->orderBy('name')
                ->get();
        }

        $targetRole = $currentUser->role === 'provider' ? 'client' : 'provider';

        return User::query()
            ->select(['id', 'name', 'email', 'photoProfile', 'role'])
            ->where('role', $targetRole)
            ->where('statut', true)
            ->orderBy('name')
            ->get();
    }

    private function conversationsFor(User $currentUser): Collection
    {
        $latestMessageIds = Message::query()
            ->select(DB::raw('MAX(id)'))
            ->where(function ($query) use ($currentUser) {
                $query->where('sender_id', $currentUser->id)
                    ->orWhere('receiver_id', $currentUser->id);
            })
            ->groupByRaw('CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END', [$currentUser->id]);

        return Message::query()
            ->with(['sender:id,name,email,photoProfile,role', 'receiver:id,name,email,photoProfile,role'])
            ->whereIn('id', $latestMessageIds)
            ->latest('envoyeLe')
            ->get()
            ->map(function (Message $message) use ($currentUser) {
                $otherUser = $message->sender_id === $currentUser->id
                    ? $message->receiver
                    : $message->sender;

                return [
                    'user' => $otherUser->only(['id', 'name', 'email', 'photoProfile', 'role']),
                    'last_message' => [
                        'contenu' => $message->contenu,
                        'envoyeLe' => $message->envoyeLe,
                        'mine' => $message->sender_id === $currentUser->id,
                    ],
                    'unread_count' => Message::where('sender_id', $otherUser->id)
                        ->where('receiver_id', $currentUser->id)
                        ->where('lu', false)
                        ->count(),
                ];
            })
            ->values();
    }

    private function messagesBetween(User $currentUser, array $selectedUser): Collection
    {
        return Message::query()
            ->with(['sender:id,name,photoProfile,role', 'receiver:id,name,photoProfile,role'])
            ->where(function ($query) use ($currentUser, $selectedUser) {
                $query->where('sender_id', $currentUser->id)
                    ->where('receiver_id', $selectedUser['id']);
            })
            ->orWhere(function ($query) use ($currentUser, $selectedUser) {
                $query->where('sender_id', $selectedUser['id'])
                    ->where('receiver_id', $currentUser->id);
            })
            ->orderBy('envoyeLe')
            ->get()
            ->map(fn (Message $message) => [
                'id' => $message->id,
                'contenu' => $message->contenu,
                'envoyeLe' => $message->envoyeLe,
                'lu' => $message->lu,
                'sender_id' => $message->sender_id,
                'receiver_id' => $message->receiver_id,
                'mine' => $message->sender_id === $currentUser->id,
            ]);
    }
}
