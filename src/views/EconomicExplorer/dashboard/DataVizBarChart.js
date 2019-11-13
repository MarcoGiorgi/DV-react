import React, { Component } from 'react';
import _ from "lodash-es/lodash.default";
import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from "recharts";
import * as moment from "moment";
import copy from "clipboard-copy";
import { toast } from "react-toastify";
import { Title } from "../components/ChartTitle";
import deepEqual from "react-fast-compare";

export class DataVizBarChart extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.width !== this.props.width) {
            return true;
        }

        return !deepEqual(this.props.dataSource.series, nextProps.dataSource.series)
            || !deepEqual(this.props.dataSource.seriesKeys, nextProps.dataSource.seriesKeys);

    }

    getEmbedCode() {
        return `<iframe width="100%" height="100%" src='${window.location.protocol}//${window.location.host}/#/embed/economic-explorer/dashboard/barchart/${this.props.filters.category.code}/${this.props.filters.category.name}/${moment(this.props.filters.startDate).format('DD-MM-YYYY')}' />`;
    }

    render() {
        return (
            <>

                <Title
                    text={this.props.title}
                    subtitle={this.props.subtitle}
                    exportFileName={'barchart.png'}
                    embed={() => {
                        copy(
                            this.getEmbedCode()
                        ).then(toast('Code to embed has been copied to the clipboard'));
                    }}
                    export={document.getElementById('barchart')}
                />
                <div id={'barchart'} style={{ background: 'white', textAlign: 'left' }}>
                    <BarChart
                        ref={(chart) => this.currentChart = chart}
                        width={this.props.width}
                        height={this.props.height}
                        data={_.sortBy(this.props.dataSource.series, o => o.month)}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month"
                            tickFormatter={(tickItem) => moment().month(tickItem - 1).format('MMMM')}
                        />
                        <YAxis
                            tickFormatter={(tickItem) => `${tickItem}`}
                        >
                            <Label
                                value="Toneladas"
                                position="insideLeft"
                                angle={-90}
                                dx={-20}
                                style={{ textAnchor: 'middle', fontWeight: 'normal' }}
                                stroke="rgb(88,88,88)"
                            />
                        </YAxis>
                        <Tooltip
                            cursor={{ strokeDasharray: '5 5' }}
                            content={(evt) => {
                                if (!evt.payload || !evt.payload[0]) {
                                    return '';
                                }
                                return (
                                    <div className="chartTooltip">
                                        <h4>{moment().month(evt.label - 1).format('MMMM')}</h4>
                                        {evt.payload.map((item) => (
                                            <>
                                                <i style={{ background: item.fill }} />
                                                <span style={{ fontWeight: 'bold' }}>
                                                    {item.payload[item.dataKey].toFixed(2)}
                                                </span>
                                                <br />
                                            </>
                                        ))}
                                    </div>
                                );
                            }}
                        />
                        <Legend />
                        {
                            this.props.dataSource.seriesKeys && this.props.dataSource.seriesKeys.map(item => (<Bar key={item.key} dataKey={item.key} fill={item.color} />))
                        }
                    </BarChart>
                </div>
            </>
        );
    }

}