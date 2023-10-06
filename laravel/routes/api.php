<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    //Minicursos
    Route::get('/course/my_courses', 'MinicursoController@my_courses');
	Route::post('/course/store', 'MinicursoController@store');
	Route::post('/course/update', 'MinicursoController@update');
	Route::get('/course/available_courses', 'MinicursoController@available_courses');
	Route::post('/course/destroy', 'MinicursoController@destroy');
	Route::post('/course/certificate', 'MinicursoController@destroy');

	//Inscrições
	Route::post('/course/subscribe', 'MinicursoIncricoesController@store');

	//Dashboard
	Route::get('/dashboard', 'DashboardController@index');

});
