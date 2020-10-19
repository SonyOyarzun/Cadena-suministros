import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';

import { NavLink, Link, withRouter } from 'react-router-dom';

import { create, transfer } from '../api/CRAB';


class Meter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data.value,
            max: this.props.data.max,
            min: this.props.data.min,
            transaction: [],
            start: false
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
    keysTransfer = {
        receivePublickey: '8t6F2tkjtReYVFSiEzoKazzJS9n9MmfgQp1uqWABym84',
        sendPrivateKey: '83cPMqhrRnofy3EVE4SPMqVCokjWcKZTLuadqprRgLFB',
    }

    data = {
        type: 'temperatura',
        date: new Date().toString()
    }

    tempUp() {
        this.setState({ value: this.state.value + Math.random() })
    }

    tempDown() {
        this.setState({ value: this.state.value - Math.random() })
    }

    start() {

        create(this.data, this.state, this.keysCreate, this.props.data.config).then(response => {
            console.log('response ', response)
        }).catch(error => {
            console.log('error ', error)
        })

        this.componentDidMount()

    }

    componentDidMount() {

        console.log('start :', this.state.start)

        this.setState({ start: true })

        if (this.state.start) {

            this.tempDown()

            setInterval(() => {

                if (Math.random() < 0.6) {
                    this.tempUp()
                }
                else {
                    this.tempDown()
                }

                transfer(this.state.transaction, this.state, this.keysTransfer, this.props.data.config)

            }, 5000)

        }

    }



    render() {

        console.log('Meter props:', this.props)
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