import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BarChart } from "reaviz";

import { getAsset, getTransaction } from '../tables/TableFunctions'

import { getMeter } from '../extra/ExtraFunctions';

export default class Lineal extends Component {

    state = {
        data: []
    }
    preRows = []

    componentDidMount(){
        
        getMeter().then(response => {
            
            this.preRows.push(response)
            console.log('data :', this.preRows)
                
        })
    }

    render() {


        return (
            <div>
                <BarChart width={this.props.width} height={this.props.height} data={this.preRows} />
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