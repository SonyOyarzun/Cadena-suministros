

import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';

import { NavLink, Link, withRouter } from 'react-router-dom';

import { create, transfer, append } from '../api/CRAB';

import { newMeter } from '../extra/ExtraFunctions';


class Meter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data.value,
            max: this.props.data.max,
            min: this.props.data.min,
            start: false,
            date: new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
            chain: 0,
        }
        this.tempUp = this.tempUp.bind(this);
        this.tempDown = this.tempDown.bind(this);
        this.start = this.start.bind(this);

    }


    startColor = '#03afff'; // cornflowerblue
    endColor = '#ff0000'; // crimson


    keysCreate = {
        publicKey: '8t6F2tkjtReYVFSiEzoKazzJS9n9MmfgQp1uqWABym84',
        privateKey: '83cPMqhrRnofy3EVE4SPMqVCokjWcKZTLuadqprRgLFB',
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

    keysTransfer2 = {
        receivePublickey: 'BXYYLSVnDGpxkLngaWTS2ioMSrZxRNmATLj82hs9z86d',
        sendPrivateKey: '83cPMqhrRnofy3EVE4SPMqVCokjWcKZTLuadqprRgLFB',
    }
    keysTransfer1 = {
        receivePublickey: '8t6F2tkjtReYVFSiEzoKazzJS9n9MmfgQp1uqWABym84',
        sendPrivateKey: 'HMtmAxvo6Z7eVHuXjtQQ4m94QZscDo3uVScpwsZPBWb8',
    }


    tempUp() {
        this.setState({ value: this.state.value + Math.random() })
    }

    tempDown() {
        this.setState({ value: this.state.value - Math.random() })
    }

    start() {
        /*
                create(this.data, this.state, this.keysCreate, this.props.data.config).then(response => {
            //        console.log('start create response ', response)
                    this.setState({ transaction: response })
                }).catch(error => {
                    console.log('error ', error)
                })
        */
        this.setState({ start: true })

        this.componentDidMount()
    }

    componentDidMount() {

        //   console.log('start :', this.state.start, 'chain :', this.state.chain)

        if (this.state.start) {

            this.tempDown()

            setInterval(() => {

                if (Math.random() < 0.6) {
                    this.tempUp()
                }
                else {
                    this.tempDown()
                }

                if (this.state.chain == 0) {
                    this.keys = this.keysTransfer
                }
                else if (this.state.chain % 2 == 0) {
                    this.keys = this.keysTransfer1
                } else {
                    this.keys = this.keysTransfer2
                }

                newMeter(this.state).then(response => {
                    console.log('meter', response)
                })
                /*    
                append(this.state.transaction, this.state, this.keys, this.props.data.config).then(response => {
               //     console.log('start transfer response ', response)
                    this.setState({ transaction: response })
                 //   console.log('state transaction ', this.state.transaction)
                    this.setState({ chain: this.state.chain + 1 })  
                })
   */

            }, 5000)



        }

    }



    render() {

        const radius = this.props.radius;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate((this.state.value / this.state.max));
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];


        return (
            <div>
                <button onClick={() => this.start()}>Iniciar</button>
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={(this.state.value / this.state.max) * 100}
                    percent="C°"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        const value = parseFloat(this.state.value).toFixed(2);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };

                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan style={percentStyle}>{props.percent}</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: fillColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                />
                <div
                    style={{
                        margin: '20px auto',
                        width: 120
                    }}
                >
                </div>
            </div>
        );
    }
}

export default Meter