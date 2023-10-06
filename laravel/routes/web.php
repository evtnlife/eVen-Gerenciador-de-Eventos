<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
	return redirect('/home');
});

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/course/approval', 'AdminController@getCoursePendingApproval')->name('approval');
Route::get('/course/payment', 'AdminController@getDataForInformPayment')->name('payment');

Route::post('/course/approve', 'AdminController@approveCourse')->name('approveCourse');
Route::post('/course/inform_payment', 'AdminController@informPayment')->name('informPayment');


Route::group([
	'middleware' => 'web'
], function ($router) {


});
