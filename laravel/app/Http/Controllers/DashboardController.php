<?php

namespace App\Http\Controllers;

use App\MinicursoAgenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$user = Auth::user();
		if($user == null)
			return response()->json(null, 401);
		$inscricao = $user->Inscricao()->first()->toArray();
		$minicursos = $user->Minicursos()->get()->toArray();
		$response = [
			'MinhasInscricoes' => $inscricao,
			'MeusMinicursos' => $minicursos
		];
		return response()->json($response, 200);
		//return $inscricao->first()->toArray();
	}
}
