<?php

namespace App\Http\Controllers;

use App\Minicurso;
use App\MinicursoRequisitos;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MinicursoController extends Controller
{
	/**
	 * Create a new AuthController instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth:api');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function my_courses()
	{
		$minicursos = Minicurso::with('Requisitos')->where('user_id', Auth::user()->id)->get();

		return response()->json([
			'minicursos' => $minicursos
		], 200);
	}

	public function available_courses()
	{
		try
		{
			$minicursos = Minicurso::with('Requisitos')
				->with('Inscricoes')
				->with('Professor')
				->with('User')
				->where('status', 1)
				->get();
			return response()->json([
				'status' => 'success',
				'response' => $minicursos
			], 200);
		} catch(\Exception $ex)
		{
			return response()->json([
				'status' => 'fail',
				'response' => $ex->getMessage()
			], 200);
		}
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
		$validated = Validator::make($request->all(), [
			'titulo' => 'required|max:255',
			'descricao' => 'required|min:50',
			'endDate' => 'required',
			'startDate' => 'required',
			'cargaHoraria' => 'required',
			'requisitos' => 'required'
		]);
		$request = $request->all();
		if(!$validated->fails())
		{

			$minicurso = new Minicurso();
			try
			{
				$minicurso->user_id = Auth::user()->id;
				$minicurso->professor_id = Auth::user()->id;
				$minicurso->titulo = $request['titulo'];
				$minicurso->descricao = $request['descricao'];
				$minicurso->data_inicial = new \DateTime($request['startDate']);
				$minicurso->data_final = new \DateTime($request['endDate']);
				$minicurso->carga_horaria = $request['cargaHoraria'];
				$minicurso->status = 0;
				$minicurso->save();
			} catch(\Exception $ex)
			{
				return response()->json([
					'status' => 'fail',
					'response' => $ex->getMessage()
				], 200);
			}

			try
			{
				foreach($request['requisitos'] as $requisito)
				{
					if($requisito['titulo'] != '-')
					{
						$reqItem = new MinicursoRequisitos();
						$reqItem->descricao = $requisito['titulo'];
						$reqItem->minicurso_id = $minicurso->id;
						$reqItem->save();
					}
				}
			} catch(\Exception $ex)
			{
				return response()->json([
					'status' => 'fail',
					'response' => $ex->getMessage()
				], 200);
			}
			return response()->json([
				'status' => 'success',
				'response' => $request
			], 200);
		} else
		{
			return response()->json([
				'status' => 'fail',
				'response' => $validated->errors()
			], 200);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param \App\Minicurso $minicurso
	 * @return \Illuminate\Http\Response
	 */
	public function show(Minicurso $minicurso)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param \App\Minicurso $minicurso
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Minicurso $minicurso)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @param \App\Minicurso $minicurso
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function update(Request $request)
	{
		$validated = Validator::make($request->all(), [
			'id' => 'required',
			'titulo' => 'required|max:255',
			'descricao' => 'required|min:50',
			'endDate' => 'required',
			'startDate' => 'required',
			'cargaHoraria' => 'required',
			'requisitos' => 'required'
		]);
		$request = $request->all();
		if(!$validated->fails())
		{
			DB::beginTransaction();
			try
			{
				$minicurso = Minicurso::find($request['id']);
				if($minicurso != null)
				{
					$minicurso->titulo = $request['titulo'];
					$minicurso->descricao = $request['descricao'];
					$minicurso->data_inicial = new \DateTime($request['startDate']);
					$minicurso->data_final = new \DateTime($request['endDate']);
					$minicurso->carga_horaria = $request['cargaHoraria'];
					$minicurso->status = 0;
					$minicurso->save();
				} else throw new \Exception("Minicurso não encontrado");
			} catch(\Exception $ex)
			{
				DB::rollBack();
				return response()->json([
					'status' => 'fail',
					'response' => $ex->getMessage()
				], 200);
			}
			try
			{
				MinicursoRequisitos::where('minicurso_id', $request['id'])->delete();
				foreach($request['requisitos'] as $requisito)
				{
					if($requisito['titulo'] != '-')
					{
						$reqItem = new MinicursoRequisitos();
						$reqItem->descricao = $requisito['titulo'];
						$reqItem->minicurso_id = $minicurso->id;
						$reqItem->save();
					}
				}
			} catch(\Exception $ex)
			{
				DB::rollBack();
				return response()->json([
					'status' => 'fail',
					'response' => $ex->getMessage()
				], 200);
			}
			DB::commit();
			return response()->json([
				'status' => 'success',
				'response' => $request
			], 200);
		} else
		{
			return response()->json([
				'status' => 'fail',
				'response' => $validated->errors()
			], 200);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param \App\Minicurso $minicurso
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Minicurso $minicurso)
	{
		//
	}
}
