import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const baseUrl = "/api/";

export default class Empresas extends Component {

    constructor(props){
      super(props);
      this.state = {
        idEmpresa:0,
        formNombre:'',
        formNumero:'',
        formCategoria:'',
        edit:false,
        empresa:[]
      }

      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeNumero  = this.handleChangeNumero.bind(this);
      this.handleChangeCategoria  = this.handleChangeCategoria.bind(this);

    }

    componentDidMount(){

      axios.get(baseUrl+'select').then(response=>{
        this.setState({empresa:response.data})
      }).catch(error=>{
        alert("Error "+error)
      })

    }

    handleChangeNombre(event) {
        this.setState({formNombre: event.target.value});
      }
  
      handleChangeNumero(event) {
        this.setState({formNumero: event.target.value});
      }
  
      handleChangeCategoria(event) {
        this.setState({formCategoria: event.target.value});
      }

    render() {
        return (
          <div className="container">
            <br/>
            <h1>Allware</h1>
            <h3>Empresas</h3>
            <hr/>

            <table className="table table-bordered order-table ">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Numero trabajadores</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                  {this.renderList()}
              </tbody>
            </table>
{/* 
            delete */}
            <div ref="putomodal" className="modal fade" id="exampleModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Eliminar empresa</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                      <p>¿Estas seguro de querer eliminar esta empresa?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    
                    <button type="button" class="btn btn-warning" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                    
                 
                     
                   
                  </div>
                </div>
              </div>
            </div>
            {/* delete */}
            <button type="button" className="btn btn-primary col-md-4" data-toggle="modal" data-target="#exampleModal">
                Agregar empresa
              </button>

            <form>
            <div ref="putomodal" className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Formulario de empresa</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                     <label for="exampleInputEmail1">Nombre empresa </label>
                     <input type="text" className="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                    </div>
                    <div className="form-group">
                     <label for="exampleInputEmail1">Numero Trabajadores</label>
                     <input type="number" className="form-control" rows="3" value={this.state.formNumero} onChange={this.handleChangeNumero}></input>
                    </div>

                    
                    <div className="form-group">

                     <label for="exampleInputEmail1">Tipo empresa</label><br></br>
                     <select value={this.state.formCategoria} onChange={this.handleChangeCategoria}>              
                    <option >Selecciona una categoria</option>
                    <option value="Software">Software</option>
                    <option value="Retail">Retail</option>       
                    </select>
                 
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    
                    
                    {
                      this.state.edit?
                      <button type="button" class="btn btn-warning" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                      :
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkEmpresa()}>Guardar</button>
                    }
                     
                   
                  </div>
                </div>
              </div>
            </div>
            </form>

          </div>




        );
    }

    showModalDelete(data){ 
      // id seleccionado para eliminar
      this.setState({ idEmpresa:data.id })
      $("#exampleModalDelete").modal("show");
    }
  
    //
    showModalEdit(data){
      
      this.setState({
        idEmpresa:data.id,
        formNombre:data.NOMBRE,
        formNumero:data.Numero_trabajador,
        formCategoria: data.TIPO_EMPRESA,
        edit:true
      })
      $("#exampleModal").modal("show");
    }
////datos modal agregar
    sendNetworkEmpresa(){

        const formData = new FormData()
        formData.append('NOMBRE',this.state.formNombre)
        formData.append('Numero_trabajador',this.state.formNumero)
        formData.append('TIPO_EMPRESA',this.state.formCategoria)
  
        axios.post(baseUrl+'insertar',formData).then(response=>{
  
             if (response.data.success==true) {
               alert(response.data.message)
               // cargar datos de nuevo
               this.loadDataEmpresa()
               $("#exampleModal").modal("hide");
             }
  
         }).catch(error=>{
           alert("Error "+error)
         })
  
      }

      sendNetworkDelete(){

        const formData = new FormData()
        formData.append('id',this.state.idEmpresa)
  
        axios.post(baseUrl+'eliminar',formData).then(response=>{
  
             if (response.data.success==true) {
               alert(response.data.message)
               // para cargar datos de nuevo
               this.loadDataempresas()
               // para cerrar el modal
               $("#exampleModalDelete").modal("hide");
             }
  
         }).catch(error=>{
           alert("Error "+error)
         })
  
      }

      sendNetworkUpdate(){

        const formData = new FormData()
        formData.append('id',this.state.idEmpresa)
        formData.append('NOMBRE',this.state.formNombre)
        formData.append('Numero_trabajador',this.state.formNumero)
        formData.append('TIPO_EMPRESA',this.state.formCategoria)
  
        axios.post(baseUrl+'editar',formData).then(response=>{
  
             if (response.data.success==true) {
               alert(response.data.message)
               // para cargar datos de nuevo
               this.loadDataProduct()
               // para cerrar el modal
               $("#exampleModal").modal("hide");
             }
  
         }).catch(error=>{
           alert("Error 456"+error)
         })
  
   }

    renderList(){

      return this.state.empresa.map((data)=>{

        return(
          <tr>
            <td>{data.NOMBRE}</td>
            <td>{data.Numero_trabajador}</td>
            <td>{data.TIPO_EMPRESA}</td>
            <td>
              <button className="btn btn-warning" onClick={()=>this.showModalEdit(data)}>Editar</button> 
              <br/>
              <button class="btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>
            </td>
          </tr>

          
        )

      })

    }
}

if (document.getElementById('empresa')) {
    ReactDOM.render(<Empresas />, document.getElementById('empresa'));
}