<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pubs', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
            $table->id();
            $table->datetime('datefinpub');
            $table->string('lien')->nullable();
            $table->string('editeur',150)->nullable();
            $table->string('photo');
            $table->unsignedBigInteger('pub_dimension_id');
            $table->foreign('pub_dimension_id')->references('id')->on('pub_dimensions');
            $table->string('createdBy',50)->nullable();
            $table->string('lastmodifiedBy',50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pubs');
    }
};
