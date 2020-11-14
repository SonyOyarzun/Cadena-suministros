import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LinearAxis, LinearGauge, BarSeries, StackedNormalizedBarSeries, BarChart } from "reaviz";
import Chart from "react-google-charts";

import { getAsset, getTransaction } from '../tables/TableFunctions'

import { getMeter } from '../extra/ExtraFunctions';
import { create, transfer } from '../api/CRAB';

import ws from '../api/WebSocket';


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
                //  console.log('echo :',response.data[0] )
                this.setState({ data: response.data[0] })
            });

    }


    /*
    keysTransfer = {
        receivePublickey: '8t6F2tkjtReYVFSiEzoKazzJS9n9MmfgQp1uqWABym84',
        sendPrivateKey: '83cPMqhrRnofy3EVE4SPMqVCokjWcKZTLuadqprRgLFB',
    }
    keysTransfer2 = {
        receivePublickey: 'BXYYLSVnDGpxkLngaWTS2ioMSrZxRNmATLj82hs9z86d',
        sendPrivateKey: 'HMtmAxvo6Z7eVHuXjtQQ4m94QZscDo3uVScpwsZPBWb8',
    }
*/
    keys = []

    keysTransfer = {
        receivePublickey: '8t6F2tkjtReYVFSiEzoKazzJS9n9MmfgQp1uqWABym84',
        sendPrivateKey: '83cPMqhrRnofy3EVE4SPMqVCokjWcKZTLuadqprRgLFB',
    }
    keysTransfer1 = {
        receivePublickey: '8t6F2tkjtReYVFSiEzoKazzJS9n9MmfgQp1uqWABym84',
        sendPrivateKey: 'HMtmAxvo6Z7eVHuXjtQQ4m94QZscDo3uVScpwsZPBWb8',
    }
    keysTransfer2 = {
        receivePublickey: 'BXYYLSVnDGpxkLngaWTS2ioMSrZxRNmATLj82hs9z86d',
        sendPrivateKey: '83cPMqhrRnofy3EVE4SPMqVCokjWcKZTLuadqprRgLFB',
    }

    count=0

    


    componentDidMount() {

        getMeter().then(response => {
            this.setState({ data: response })
        })

        this.listen()

        if (this.count == 0) {
            console.log('keysTransfer[0]')
            this.keys = this.keysTransfer
        }
        else if (this.count % 2 == 0) {
            console.log('keysTransfer[1]')
            this.keys = this.keysTransfer1
        } else {
            console.log('keysTransfer[2]')
            this.keys = this.keysTransfer2
        }

        this.count = this.count + 1


    };



    render() {

        return (
            <>
                <Chart
                    backgroundColor={'blue'}
                    width={'100%'}
                    height={'400px'}
                    chartType="AreaChart"
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





