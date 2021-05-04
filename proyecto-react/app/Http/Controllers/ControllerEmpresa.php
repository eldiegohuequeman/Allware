<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use DB;

class ControllerEmpresa extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $t=  DB::select("SELECT id,NOMBRE,Numero_trabajador,TIPO_EMPRESA from empresas
          ");
        return response()->json($t);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $empresaNueva = new Empresa;
        $empresaNueva->NOMBRE = $request->NOMBRE;
        $empresaNueva->Numero_trabajador = $request->Numero_trabajador;
        $empresaNueva->TIPO_EMPRESA = $request->TIPO_EMPRESA;
        $empresaNueva->CREACION = $request->CREACION;
        $empresaNueva->ESTADO = 'ACTIVO';
   
        
        $empresaNueva->save();

        $response['message'] = "Guardo exitosamente";
        $response['success'] = true;
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function show(Empresa $empresa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $NOMBRE = $request->input('NOMBRE');
        $Numero_trabajador = $request->input('Numero_trabajador');
        $TIPO_EMPRESA = $request->input('TIPO_EMPRESA');
        $id = $request->input('id');
        DB::update('update empresas set NOMBRE = ?,Numero_trabajador=?,TIPO_EMPRESA=? where id=?',[$NOMBRE,$Numero_trabajador,$TIPO_EMPRESA,$id]);
        $response['message'] = "Actualizo exitosamente";
        $response['success'] = true;
  
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Empresa  $empresa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
      /*   $empresaNueva->ESTADO = 'ACTIVO'; */
      $id = $request->input('id');
        // Eliminar
      Empresa::where('id',$request->input('id'))->delete();
      // respesta de JSON
      $response['message'] = "Elimino exitosamente";
      $response['success'] = true;

      return $response;
    }
}
