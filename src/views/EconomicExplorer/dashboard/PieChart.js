import React, { Component } from 'react';
import {
    AccumulationChartComponent,
    AccumulationSeriesCollectionDirective,
    AccumulationSeriesDirective,
    PieSeries,
    Inject,
    AccumulationDataLabel,
    AccumulationTooltip,
    Export
} from "@syncfusion/ej2-react-charts";
import { Title } from "../components/ChartTitle";
import copy from "clipboard-copy";
import * as moment from "moment";
import { toast } from "react-toastify";
import deepEqual from "react-fast-compare";

const PALETTE = [
    '#5A93BD',
    '#E26E68',
    '#84C789',
    '#FFD53D',
    '#A47BCE',
    '#FFA15D',
    '#C7C7C7',
    '#B77D55',
    '#FFBDD1',
];

export class PieChart extends Component {

    //constructor(props) {
    //    super(props);
    //    this.state = { data: this.props.dataSource }
    //}

    shouldComponentUpdate(nextProps) {
        /*if (nextProps.dataSource && nextProps.width !== this.props.width) {
            return true;
        }

        
        return !deepEqual(this.props.dataSource, nextProps.dataSource);
        
        console.log('PIECHART UPDATE: ', nextProps)        
        return false;
*/
        const should = !deepEqual(nextProps, this.props);
        console.log('PIECHART UPDATE: ', should, nextProps, this.props);
        return should;
    }

    componentDidUpdate() {
        this.pieChart && this.pieChart.refresh();
    }

    getEmbedCode() {
        return `<iframe width="100%" height="100%" src='${window.location.protocol}//${window.location.host}/#/embed/economic-explorer/dashboard/${this.props.type}/${this.props.filters.category.code}/${this.props.filters.category.name}/${moment(this.props.filters.startDate).format('DD-MM-YYYY')}' />`;
    }

    // Commented lines below are for a test
    //componentWillReceiveProps(nextProps) {
    //    if (nextProps.dataSource != undefined && (this.state.data ==undefined || nextProps.dataSource.length != this.state.data.length))
    //        this.setState({ data: nextProps.dataSource });
    //}

    render() {
        const isDataAvailable = () => {
            return this.props.dataSource && this.props.dataSource.length;
        };

        const renderError = () => <div
            className={'noGraphDataMessage'}> {this.props.nodata || 'No data to be visualized'}</div>;

        const tooltipRender = args => {
            let value = args.point.y / args.series.sumOfPoints * 100;
            args.text = `${args.point.x} : VOLUME:${args.point.y} ( ${Math.ceil(value)}% )`;
        };

        const tooltipTemplate = (args) => {
            return (
                <div className="chartTooltip">
                    <h4>{args.x}</h4>

                    <i style={{ background: args.color }} />
                    <span style={{ fontWeight: 'bold' }}>
                        {args.y.toFixed(2)} ({Math.round(args.percentage * 10) / 10}%)
          </span>
                    <br />
                </div>
            )
        };

        return (
            <div id={this.props.type + "chart"}>
                <Title
                    text={this.props.title}
                    exportFileName={this.props.type + ".png"}
                    export={() => this.chartInstance.export('PNG', this.props.type)}
                    embed={() => {
                        copy(
                            this.getEmbedCode()
                        ).then(toast('Code to embed has been copied to the clipboard'));
                    }}
                />
                <div style={{ margin: '0 auto', textAlign: 'center' }}>
                    <AccumulationChartComponent id={this.props.id}
                        ref={chart => this.chartInstance = chart}
                        tooltip={{ enable: true, template: tooltipTemplate }}
                        tooltipRender={tooltipRender}
                        loaded={args => {
                            this.pieChart = args.chart;
                            console.log("PieChart Loaded", this.props.dataSource)
                        }}
                    >
                        <Inject services={[PieSeries, AccumulationTooltip, AccumulationDataLabel, Export]} />
                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective
                                dataSource={this.props.dataSource}
                                xName={this.props.xName}
                                yName={this.props.yName}
                                palettes={PALETTE}
                                type='Pie'
                                innerRadius={this.props.innerRadius} dataLabel={{
                                    visible: true,
                                    name: this.props.xName,
                                    position: 'Outside',
                                    connectorStyle: { length: '10%' }
                                }} />
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                    {!isDataAvailable() && renderError()}
                </div>
            </div>
        )
    }
}
