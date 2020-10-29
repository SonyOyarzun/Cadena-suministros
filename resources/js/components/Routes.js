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
import Temperature from './Temperature';


//access
//import Register from '../access/Register';
import Forgot from '../access/ForgotPass';
import Reset from '../access/Reset';

class Routes extends Component {

    //para parametros de url
    //<Route exact path="/Trace/:asset" component={Trace} /> 

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

                <Route exact path="/Trace" component={Trace} />
                <Route exact path="/Trace/:asset" component={Trace} />

                <Route path="/Search" component={Search} />

                <Route exact path="/Forgot" component={Forgot} />
                <Route exact path="/Reset/:email/:token"  component={Reset} />

                <Route exact path="/Temperature" component={Temperature} />
                <Route exact path="/Temperature/:id" component={Temperature} />

            </div>

        )
    }
}

export default Routes;