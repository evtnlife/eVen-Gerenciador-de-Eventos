<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Minicurso extends Model
{
    protected $table = 'minicursos';
    protected $fillable = [
        'titulo',
        'descricao',
        'foto',
        'data_inical',
        'data_final',
        'carga_horaria',
        'status',
        'professor_id',
        'user_id',
        'created_at',
        'updated_at'
    ];
    public function Professor(){
        return $this->belongsTo(User::class,'professor_id', 'id');
    }

    public function User(){
        return $this->belongsTo(User::class,'user_id', 'id');
    }

    public function Requisitos(){
        return $this->hasMany(MinicursoRequisitos::class, 'minicurso_id', 'id');
    }

    public function Inscricoes(){
        return $this->hasMany(MinicursoIncricoes::class, 'minicurso_id', 'id');
    }
}
