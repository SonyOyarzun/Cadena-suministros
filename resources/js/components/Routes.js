import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'

import {Route} from 'react-router-dom';

//Importar componentes y rutas
import User from './User'
import Product from './Product'
import MyProduct from './MyProduct'
import ApiConfig from './api/ApiConfig'
import Send from './Send'
import Receive from './Receive';

class Routes extends Component {

    render() {
        return (

<div>
     
<Route path="/User"         component={User}        />
<Route path="/Product"      component={Product}     />
<Route path="/MyProduct"    component={MyProduct}   />

<Route path="/ApiConfig"    component={ApiConfig}   />

<Route path="/Send"         component={Send}        />
<Route path="/Receive"      component={Receive}     />

</div>

        )
    }
}

export default Routes;