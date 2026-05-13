<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $users = DB::table('users')->get();

        foreach ($users as $user) {
            if (!$user->ville) continue;

            $ville = DB::table('villes')
                ->where('name', $user->ville)
                ->first();

            if ($ville) {
                DB::table('users')
                    ->where('id', $user->id)
                    ->update([
                        'ville_id' => $ville->id
                    ]);
            }
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('ville');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('ville')->nullable();
        });
    }
};