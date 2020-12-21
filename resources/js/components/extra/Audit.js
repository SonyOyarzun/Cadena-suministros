import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LinearAxis, LinearGauge, BarSeries, StackedNormalizedBarSeries, BarChart } from "reaviz";
import Chart from "react-google-charts";

import { getAsset, getTransaction, getConfig, searchMetadata } from '../tables/TableFunctions'

import { getMeter } from './ExtraFunctions';
import { create, transfer } from '../api/CRAB';


export default class AuditMeter extends Component {
    constructor(props) {
        super(props);

    }

    data = []


    render() {

        console.log('audit',this.props.data.data[0])

        {
            this.props.data.data != false ? (

                this.data = this.props.data.data[0]

            ) : (

                this.data = [["T", "C°", "Min", "Max"], [0, 0, 0, 0]]
            )

        }

        return (
            <Chart
                backgroundColor={'blue'}
                width={'100%'}
                height={'600px'}
                chartType="AreaChart"
                loader={<div>Cargando Registros</div>}

                data={this.data}

                options={{
                    hAxis: {
                        title: 'Registro',
                    },
                    vAxis: {
                        title: 'Temperatura',
                    },
                    chartArea: { width: '83%', height: '94%' },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}





