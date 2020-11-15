import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LinearAxis, LinearGauge, BarSeries, StackedNormalizedBarSeries, BarChart } from "reaviz";
import Chart from "react-google-charts";

import { getAsset, getTransaction } from '../tables/TableFunctions'

import { getMeter } from './ExtraFunctions';
import { create, transfer , searchMetadata } from '../api/CRAB';


export default class AuditMeter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
        };

        this.audit = this.audit.bind(this)
    }


    audit() {

        searchMetadata(this.state.search,this.props.config).then(response => {
            this.setState({ data: response })
        })

    }

    count=0

    componentDidMount() {

        this.audit()

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





