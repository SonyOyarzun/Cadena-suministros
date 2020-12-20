import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LinearAxis, LinearGauge, BarSeries, StackedNormalizedBarSeries, BarChart } from "reaviz";
import Chart from "react-google-charts";

import { getAsset, getTransaction } from '../tables/TableFunctions'

import { getMeter } from '../extra/ExtraFunctions';
import { create, transfer } from '../api/CRAB';


export default class Lineal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            data: [],
            transaction : [],
            asset : this.props.data.asset
        };
        this.listen = this.listen.bind(this)
    }

    channel = 'meter.' + this.props.data.id

    listen() {
        //console.log('canal :',this.channel)
        Echo.private(this.channel)
            .listen('MeterEvent', (response) => {
                  console.log('echo :',response.data[0][1][1] )
                this.setState({ data: response.data[0][1][1] })
            });

    }

    count=0

    componentDidMount() {

        getMeter().then(response => {
            this.setState({ data: response })
        })

        this.listen()

    };



    render() {

        return (
            <>
                <Chart
                    backgroundColor={'blue'}
                    width={'100%'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Cargando Registros</div>}

                    data={this.state.data}

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
            </>
        )
    }
}





