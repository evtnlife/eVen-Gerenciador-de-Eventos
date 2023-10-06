<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MinicursoRequisitos extends Model
{
    protected $table = 'minicurso_requisitos';
    protected $fillable = [
        'id',
        'titulo',
        'descricao',
        'created_at',
        'minicurso_id'
    ];

    public function Minicurso()
    {
        return $this->belongsTo(Minicurso::class, 'minicurso_id', 'id');
    }
}
