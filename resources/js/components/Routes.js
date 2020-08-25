import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'

import {Route} from 'react-router-dom';

//Importar componentes y rutas
import User from './User'
import Product from './Product'
import MyProduct from './MyProduct'

class Routes extends Component {

    render() {
        return (

<div>
     
<Route path="/User"         component={User}        />
<Route path="/Product"      component={Product}     />
<Route path="/MyProduct"    component={MyProduct}   />

</div>

        )
    }
}

export default Routes;