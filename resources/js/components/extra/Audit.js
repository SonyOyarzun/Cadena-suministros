import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LinearAxis, LinearGauge, BarSeries, StackedNormalizedBarSeries, BarChart } from "reaviz";
import Chart from "react-google-charts";

import { getAsset, getTransaction , getConfig , searchMetadata } from '../tables/TableFunctions'

import { getMeter } from './ExtraFunctions';
import { create, transfer } from '../api/CRAB';


export default class AuditMeter extends Component {
    constructor(props) {
        super(props);

    }

    data = []


    render() {

        {this.props.data.data !=false ? (

            this.data = this.props.data.data

        ):(

            this.data =  [["T", "C°", "Min", "Max"],[0, 0, 0, 0]]
        )
            
        }

        return (
                <Chart
                    backgroundColor={'blue'}
                    width={'100%'}
                    height={'400px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}

                    data={this.data}

                    options={{
                        hAxis: {
                            title: 'Registro',
                        },
                        vAxis: {
                            title: 'Temperatura',
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
        )
    }
}





