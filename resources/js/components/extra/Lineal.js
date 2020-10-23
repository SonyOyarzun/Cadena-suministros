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
                data : []
            };
        }
    
        // single websocket instance for the own application and constantly trying to reconnect.
    
        componentDidMount() {
            this.connect();
        }
    
        timeout = 250; // Initial timeout duration as a class variable
    
        /**
         * @function connect
         * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
         */
        connect = () => {
            var ws = new WebSocket("ws://localhost:8000/meter/list/");
            let that = this; // cache the this
            var connectInterval;
    
            // websocket onopen event listener
            ws.onopen = () => {
                console.log("connected websocket main component");
    
                this.setState({ ws: ws });
    
                that.timeout = 250; // reset timer to 250 on open of websocket connection 
                clearTimeout(connectInterval); // clear Interval on on open of websocket connection
            };
    
            // websocket onclose event listener
            ws.onclose = e => {
                console.log(
                    `Socket is closed. Reconnect will be attempted in ${Math.min(
                        10000 / 1000,
                        (that.timeout + that.timeout) / 1000
                    )} second.`,
                    e.reason
                );
    
                that.timeout = that.timeout + that.timeout; //increment retry interval
                connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
            };
    
            // websocket onerror event listener
            ws.onerror = err => {
                console.error(
                    "Socket encountered error: ",
                    err.message,
                    "Closing socket"
                );
    
                ws.close();
            };
        };
    
        /**
         * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
         */
        check = () => {
            const { ws } = this.state;
            if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
        };
    
        render() {
            return(
                <>
                <Chart
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





