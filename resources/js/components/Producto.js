import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'


class Producto extends Component {

    render() {
        return (

<div>

<title> Owl Evaluation | Departamentos </title>


    <div className="panel panel-success">
        <div className="panel-heading">
            <div className="btn-group pull-right">
                <button type='button' className="btn btn-success" data-toggle="modal" data-target="#nuevoCliente"><span className="glyphicon glyphicon-plus" ></span> Nuevo departamento </button>
            </div>
            <h4><i className='glyphicon glyphicon-search'></i> Buscar Departamento</h4>
        </div>
        <div className="panel-body">

            <form className="form-horizontal" role="form">

                <div className="form-group row">
                    <label for="q" className="col-md-2 control-label">Nombre</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control" id="q" placeholder="Nombre del departamento" onkeyup='load(1);'/>
                    </div>
                    <div className="col-md-3">
                        <button type="button" className="btn btn-default" onClick='load(1);'>
                            <span className="glyphicon glyphicon-search" ></span> Buscar</button>
                        <span id="loader"></span>
                    </div>

                </div>

            </form>

            <div id="resultados"></div>
            <div className='outer_div'></div>
        </div>
    </div>

</div>

        )
    }
}

export default Producto;
