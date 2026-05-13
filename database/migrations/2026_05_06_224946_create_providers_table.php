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
    Schema::create('providers', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');
        $table->text('description')->nullable();
        $table->string('main_photo')->nullable();
        $table->decimal('longitude', 10, 7)->nullable();
        $table->decimal('latitude', 10, 7)->nullable();
        $table->string('service');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('providers');
}
};
