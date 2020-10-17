import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BarChart } from "reaviz";


export default class Lineal extends Component {


    render() {
        const data = [
            { key: '1', data: 7.6 },
            { key: '2', data: 8.5 },
            { key: '3', data: 9.8 }
        ];
        return (
            <div>
                <BarChart width={this.props.width} height={this.props.height} data={data} />
            </div>
        );
    }
}