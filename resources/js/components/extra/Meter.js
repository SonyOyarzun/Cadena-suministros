

import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';

import { NavLink, Link, withRouter } from 'react-router-dom';

import { newMeter, resetMeter } from '../extra/ExtraFunctions';

//Componentes de Bootstap
import { Button, Modal, Card, Form } from 'react-bootstrap';
import { ClearAll } from '@material-ui/icons';


class Meter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data.value,
            max: this.props.data.max,
            min: this.props.data.min,
            date: new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
            chain: this.props.data.chain,
            asset: this.props.data.asset
        }
        this.tempUp = this.tempUp.bind(this);
        this.tempDown = this.tempDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    startColor = '#03afff'; // cornflowerblue
    endColor = '#ff0000'; // crimson


    tempUp() {
        console.log('UP')
        this.setState({ value: this.state.value + Math.random() })
    }

    tempDown() {
        console.log('DOWN')
        this.setState({ value: this.state.value - Math.random() })
    }

    reset() {
        console.log('RESET')
        resetMeter().then(response => {
            console.log('meter reset :', response)
            this.setState({chain : 0 , value : 0 })
        })
    }


    timer = setInterval(() => {

        if (Math.random() < 0.5) {
            this.tempUp()
        }
        else {
            this.tempDown()
        }


        newMeter(this.state).then(response => {
            console.log('meter', response)
        })

        this.setState({ chain: this.state.chain + 1 })

    }, 5000)



    componentDidMount() {
        this.timer
    }

    componentWillUnmount() {
    clearInterval(this.timer)
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        console.log('state Meter', this.state)
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
                <Form>

                    <Form.Group controlId="form.max">
                        <Form.Label>Maximo</Form.Label>
                        <Form.Control name='max' type="number" placeholder="maximo" maxLength="2" onChange={this.onChange} defaultValue={this.state.max} min='1' />
                    </Form.Group>

                    <Form.Group controlId="form.min">
                        <Form.Label>Minimo</Form.Label>
                        <Form.Control name='min' type="number" placeholder="minimo" maxLength="2" onChange={this.onChange} defaultValue={this.state.min} max='0' />
                    </Form.Group>

                    <Form.Group controlId="form.min">
                        <Button className='btn btn-block' onClick={this.reset}>Reset</Button>
                    </Form.Group>

                </Form>
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
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#ffff00').toString(),
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