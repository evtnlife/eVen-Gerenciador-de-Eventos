<?php

namespace App\Http\Controllers;

use App\Minicurso;
use App\MinicursoIncricoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MinicursoIncricoesController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$this->middleware('auth:api');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function store(Request $request)
	{
		$validated = Validator::make($request->all(), ['id' => 'required']);
		$request = $request->all();
		if(!$validated->fails())
		{
			try
			{
				$minicurso = Minicurso::find($request['id']);
				if($minicurso != null)
				{
					$getMinicurso = MinicursoIncricoes::where('user_id', Auth::user()->id)->where('minicurso_id', $request['id'])->get();
					if(count($getMinicurso) > 0)
						throw new \Exception("Inscrição ja realizada!");
					$insc = new MinicursoIncricoes();
					$insc->pagamento = 0;
					$insc->minicurso_id = $request['id'];
					$insc->user_id = Auth::user()->id;
					$insc->save();
				}
				else
					throw new \Exception("Minicurso não encontrado na base de dados.");
			}
			catch(\Exception $ex)
			{
				return response()->json(['status' => 'fail', 'response' => $ex->getMessage()], 200);
			}
			return response()->json(['status' => 'success', 'response' => 'Inscrição realizada com sucesso!'], 200);
		}
		else
		{
			return response()->json(['status' => 'fail', 'response' => $validated->errors()], 200);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\MinicursoIncricoes $minicursoIncricoes
	 * @return \Illuminate\Http\Response
	 */
	public function show(MinicursoIncricoes $minicursoIncricoes)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\MinicursoIncricoes $minicursoIncricoes
	 * @return \Illuminate\Http\Response
	 */
	public function edit(MinicursoIncricoes $minicursoIncricoes)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @param \App\MinicursoIncricoes $minicursoIncricoes
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, MinicursoIncricoes $minicursoIncricoes)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\MinicursoIncricoes $minicursoIncricoes
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(MinicursoIncricoes $minicursoIncricoes)
	{
		//
	}
}
