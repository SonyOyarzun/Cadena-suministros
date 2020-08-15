import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'

import {Route} from 'react-router-dom';

//Importar componentes y rutas
import User from './User'

class Routes extends Component {

    render() {
        return (

<div>
     
<Route path="/User" component={User} />
        
</div>

        )
    }
}

export default Routes;