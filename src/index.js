import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';//Adjuntamos jquery

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: {Id: '',Nombre: '',Apellidos:'',Edad: ''}};

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleApellidosChange = this.handleApellidosChange.bind(this);
    this.handleEdadChange = this.handleEdadChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  carga(datos) {
    if (datos != null) {
        this.setState({value: {Id:datos.Id, Nombre: datos.Nombre ,Apellidos: datos.Apellidos, Edad: datos.Edad}});
    }    
  }

  componentDidMount(){
    $.ajax({
        // la URL para la petición
        url : 'http://localhost:49581/api/Personas/',     
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : { id : 1 },     
        // especifica si será una petición POST o GET
        type : 'GET',     
        // el tipo de información que se espera de respuesta
        dataType : 'json',     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : (datos) => this.carga(datos),
            
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    });
  }


  validarString (campo){
    if (campo.length <= 20) {
        return true;
    } else {
        return false;
    }    
  }

  validarInt (campo){
    //if (!isNaN(campo) && campo.length < 4) {//Acepta decimales
    //if (/^([0-9]{1,3})$/.test(campo)) {
    if (/^([0-9])*$/.test(campo) && campo.length < 4) {
        return true;
    } else {
        return false;
    }    
  }

  handleNombreChange(event) {
    let nombre = event.target.value;
    if (this.validarString (nombre)) {
        //this.setState({value: {Nombre: event.target.value ,Apellidos: this.state.value.Apellidos, Edad: this.state.value.Edad}});
        this.setState({value: {Nombre: event.target.value}});
    } else {
        alert('Nombre no es valido');
    }
  }

  handleApellidosChange(event) {
    let apellido = event.target.value;
    if (this.validarString (apellido)) {
        //this.setState({value: {Nombre: this.state.value.Nombre ,Apellidos: event.target.value, Edad: this.state.value.Edad}});
        this.setState({value: {Apellidos: event.target.value}});
    } else {
        alert('Apellidos no es valido');
    }    
  }

  handleEdadChange(event) {
    //let edad = parseInt(event.target.value);
    //if (Number.isInteger(edad) ) {
    let edad = event.target.value;
    if (this.validarInt (edad)) {
        //this.setState({value: {Nombre: this.state.value.Nombre ,Apellidos: this.state.value.Apellidos, Edad: event.target.value}});
        this.setState({value: { Edad: event.target.value}});
    } else {
        alert('Edad tiene que ser numerico y maximo 3 digitos');
    }    
  }

  handleSubmit(event) {
    //alert('Hola ' + this.state.value.Nombre + ' ' + this.state.value.Apellidos + ' de ' +this.state.value.Edad + ' años.');

    let Nombre1 = document.getElementById('Nombre').value;
    let Apellido1 = document.getElementById('Apellido').value;
    let Edad1 = document.getElementById('Edad').value;
    $.ajax({
        // la URL para la petición
        url : 'http://localhost:49581/api/Personas/',     
        // la información a enviar

        // especifica si será una petición POST o GET
        type : 'POST',     
        // el tipo de información que se espera de respuesta
        dataType : 'json',     
        data: { Nombre : Nombre1, Apellidos: Apellido1, Edad: Edad1 },
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(data) {           
            //debugger;
            //alert('Todo funciono bien')

        },     
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },     
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    });

    event.preventDefault();
  }

  NuevoBoton() {
    document.getElementById('Nombre').value='';
    document.getElementById('Apellido').value='';
    document.getElementById('Edad').value=''; 
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nombre:
          <input id="Nombre" type="text" value={this.state.value.Nombre} onChange={this.handleNombreChange} />
        </label>
        <br/>
        <label>
          Apellidos:
          <input id="Apellido" type="text" value={this.state.value.Apellidos} onChange={this.handleApellidosChange} />
        </label>
        <br/>
        <label>
          Edad:
          <input id="Edad" type="text" value={this.state.value.Edad} onChange={this.handleEdadChange} />
        </label>
        <br/>
         <input type="submit" value="Guardar" />
         <button type="buttonNuevo" onclick="NuevoBoton()">Nuevo</button> 
         <button type="buttonBorr">Borrar</button> 
         
      </form>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('root1')
);