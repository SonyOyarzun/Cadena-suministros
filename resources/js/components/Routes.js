import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom'

import { Route } from 'react-router-dom';

//Importar componentes y rutas
import User from './User'
import Product from './Product'
import MyProduct from './MyProduct'
import MyReception from './MyReception'
import ApiConfig from './api/ApiConfig'
import Trace from './api/Trace'
import Search from './api/Search'
import Send from './Send'
import Receive from './Receive';
import Order from './Order';

import Pdf from './extra/Pdf';

class Routes extends Component {

    render() {
        return (

            <div>

                <Route path="/User" component={User} />
                <Route path="/Product" component={Product} />
                <Route path="/MyProduct" component={MyProduct} />
                <Route path="/MyReception" component={MyReception} />

                <Route path="/ApiConfig" component={ApiConfig} />

                <Route path="/Send" component={Send} />
                <Route path="/Receive" component={Receive} />
                <Route path="/Order" component={Order} />

                <Route path="/Trace" component={Trace} />
                <Route path="/Search" component={Search} />

                <Route path="/Pdf" component={Pdf} />

            </div>

        )
    }
}

export default Routes;