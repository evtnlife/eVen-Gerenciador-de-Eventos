<?php

namespace App\Http\Controllers;

use App\MinicursoAgenda;
use Illuminate\Http\Request;

class MinicursoAgendaController extends Controller
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
        //
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\MinicursoAgenda  $minicursoAgenda
     * @return \Illuminate\Http\Response
     */
    public function show(MinicursoAgenda $minicursoAgenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\MinicursoAgenda  $minicursoAgenda
     * @return \Illuminate\Http\Response
     */
    public function edit(MinicursoAgenda $minicursoAgenda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\MinicursoAgenda  $minicursoAgenda
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MinicursoAgenda $minicursoAgenda)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\MinicursoAgenda  $minicursoAgenda
     * @return \Illuminate\Http\Response
     */
    public function destroy(MinicursoAgenda $minicursoAgenda)
    {
        //
    }
}
