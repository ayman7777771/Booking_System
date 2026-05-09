<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('exceptions', function (Blueprint $table) {
        $table->id();
        $table->date('date');
        $table->boolean('estDisponible');
        $table->time('heureDebut')->nullable();
        $table->time('heureFin')->nullable();
        $table->foreignId('provider_id')->constrained('providers')->onDelete('cascade');
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exceptions');
    }
};
