import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';

export default class Meter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:  this.props.meter.value,
            max: this.props.meter.max,
            min: this.props.meter.min,
            random: 0 ,

        }
        this.tempUp = this.tempUp.bind(this);
        this.tempDown = this.tempDown.bind(this);
    }

    startColor = '#03afff'; // cornflowerblue
    endColor = '#ff0000'; // crimson


    tempUp() {
       this.setState({ value: this.state.value + 0.1 })
    }

    tempDown() {
       this.setState({ value: this.state.value - 0.1 }) 
    }



    componentDidMount() {

        this.tempDown()  

        setInterval(()=>{

            if(this.state.random < 0.4) {
                this.tempUp()
            }
            else{
                this.tempDown()
            }
            this.setState({ random: Math.random()}) 
        },3000)

    }



    render() {

        console.log(this.state)
        const radius = this.props.radius;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
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
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={(this.state.value/this.state.max)*100}
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

