<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MinicursoIncricoes extends Model
{
    protected $fillable = [
        'id',
        'pagamento',
        'minicurso_id',
	    'user_id'
    ];

    public function Minicurso()
    {
        return $this->belongsTo(Minicurso::class, 'minicurso_id', 'id')->with('Inscricoes');
    }

    public function User(){
    	return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
