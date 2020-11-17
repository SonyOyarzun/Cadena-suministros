import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LinearAxis, LinearGauge, BarSeries, StackedNormalizedBarSeries, BarChart } from "reaviz";
import Chart from "react-google-charts";

import { getAsset, getTransaction , getConfig , searchMetadata } from '../tables/TableFunctions'

import { getMeter } from './ExtraFunctions';
import { create, transfer } from '../api/CRAB';


export default class AuditMeter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                [ 'T' ,'C°','Min','Max'],
                [  0  , 0  ,  0  ,  0  ],
            ],
            search:{
                asset:'user-'+this.props.data.user.id
            }
        };

        this.audit = this.audit.bind(this)
    }


    audit() {

        searchMetadata(this.state.search).then(response => {
            console.log('user-',response)
            this.setState({ data: response })
        })

    }


    componentDidMount() {

        this.audit()
    
    };



    render() {

        return (
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
        )
    }
}





