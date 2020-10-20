import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BarChart } from "reaviz";

import { getAsset, getTransaction } from '../tables/TableFunctions'


export default class Lineal extends Component {

    state = {
        data: []
    }


    render() {


        let preRows = []

        const params = {
            "asset": '103e6f32fc419955948b8e1d8bfbe99beb7178cfbcb5b8342ecebaa466bcc876',
        }

        getAsset(params).then(response => {

            response.map((value, index) => (
                preRows.push({ key: index , data: value.metadata.metadata.value }),
                this.setState({data: preRows})
            ))

        })

        console.log('data :',this.state.data)


        return (
            <div>
                <BarChart width={this.props.width} height={this.props.height} data={this.state.data} />
            </div>
        );
    }
}

/**
  const data = [
            { key: '1', data: 7.6 },
            { key: '2', data: 8.5 },
            { key: '3', data: 9.8 }
        ];
 */