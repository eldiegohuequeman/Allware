<?php
use App\Http\Controllers\ControllerEmpresa;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('select', [ControllerEmpresa::class, 'index']);//selecciona todas las empresas

Route::post('insertar',[ControllerEmpresa::class, 'store']);//inserta nueva empresa
Route::post('editar', [ControllerEmpresa::class, 'update']);//modifica nueva empresa
Route::post('eliminar', [ControllerEmpresa::class, 'destroy']);//cambia estado empresa a eliminado nueva empresa