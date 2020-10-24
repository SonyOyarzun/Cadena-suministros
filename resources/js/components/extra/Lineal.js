import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LinearAxis, LinearGauge, BarSeries, StackedNormalizedBarSeries, BarChart } from "reaviz";
import Chart from "react-google-charts";

import { getAsset, getTransaction } from '../tables/TableFunctions'

import { getMeter } from '../extra/ExtraFunctions';

import ws from '../api/WebSocket';


export default class Lineal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            data: []
        };
        this.listen = this.listen.bind(this)

    }


    listen() {
        
        console.log('socket : listen')

        Echo.private('meter')
            .listen('MeterEvent', (e) => {

                this.setState({data: e})
                console.log('socket : Echo', e)
            });

    }


    componentDidMount() {




    };



    render() {

        this.listen()

        console.log(' lineal data :',this.state.data)
        return (
            <>
                <Chart
                    backgroundColor={'blue'}
                    width={'100%'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}

                    data={this.state.data}

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
            </>
        )
    }
}



/**
  const data = [
            { key: '1', data: 7.6 },
            { key: '2', data: 8.5 },
            { key: '3', data: 9.8 }
        ];
 */





