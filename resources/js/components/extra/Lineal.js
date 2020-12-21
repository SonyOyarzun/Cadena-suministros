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
            transaction: [],
            asset: this.props.data.asset
        };
        this.listen = this.listen.bind(this)
    }

    channel = 'meter.' + this.props.data.id

    listen() {
        //console.log('canal :',this.channel)
        Echo.private(this.channel)
            .listen('MeterEvent', (response) => {
          //      console.log('echo :', response.data[0])
                //       this.setState({ data: response.data[0] })

                let array = []
                let row = []
    
                response.data[0].map((content, index) => (
    
    
                    row[index] = [content.fecha, content.temp[1], content.temp[2], content.temp[3]],
    
                    array.push(row)
                // ,   console.log('row:', row)
                ))
    
                this.setState({ data: array })
            });

    }

    count = 0

    componentDidMount() {

        getMeter().then(response => {
       //     console.log('Lineal data :', response)

            let array = []
            let row = []

            response.map((content, index) => (


                row[index] = [content.fecha, content.temp[1], content.temp[2], content.temp[3]],

                array.push(row)
           // ,    console.log('row:', row)
            ))

            this.setState({ data: array })
        })

        this.listen()

    };



    render() {

     //   console.log('hhh:', this.state.data)

        return (
            <>
                <Chart
                    backgroundColor={'blue'}
                    width={'100%'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Cargando Registros</div>}

                    data={this.state.data[0]}

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





