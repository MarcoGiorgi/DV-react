import React, {Component} from 'react';
import {
  Area, AreaChart, Brush, CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer
} from 'recharts';
import * as moment from 'moment';
import '../style.scss';
import copy from "clipboard-copy";
import {toast} from "react-toastify";
import {Title} from "../components/ChartTitle";
import { DEVELOPMENT } from "../../../config";
import * as configuration from "../../../config";

export class PricesChart extends Component {
  render() {
    const startIndex = () => {
      let idx = 0;

      if (this.props.values.length > 10) {
        idx = this.props.values.length - this.props.values.length / 6;
      }

      return Math.floor(idx);
    };

    const renderAreaChart = () => (
      <AreaChart data={this.props.values}>
        <defs>
          {this.props.keys.map((key) => (
            <linearGradient id={key.hashCode()} x1="0" y1="0" x2="0" y2="1">
              <stop offset="2%" stopColor={this.props.colors[key.hashCode()]} stopOpacity={0.8}/>
              <stop offset="98%" stopColor={this.props.colors[key.hashCode()]} stopOpacity={0.2}/>
            </linearGradient>
          ))}
        </defs>
        <YAxis hide domain={['auto', 'auto']}/>
        {this.props.keys.map((key) => (
          <Area dot={false} dataKey={key} strokeWidth={0} fillOpacity={1} fill={`url(#${key.hashCode()})`}/>
        ))}
      </AreaChart>
    );

    const getYAxisTitle = () => {
      if (!this.props.uom || this.props.uom.length === 1) {
        return `Soles por ${this.props.uom[0]}`
      }

      return 'Soles';
    };

    const getEmbedLink = () => {
      if (this.props.type === 'retail') {
        return `<iframe width="100%" height="100%" src='${
          window.location.protocol}//${window.location.host}/#/embed/economic-explorer/food-prices/retail-markets/${
          this.props.filters.region}/${
          moment(this.props.filters.startDate).format('DD-MM-YYYY')}/${
          moment(this.props.filters.endDate).format('DD-MM-YYYY')}/${
          this.props.filters.products.join()}' />`;
      } else {
        //marketCodes=15013406&productCodes=040102,040103
        const products = configuration.is(DEVELOPMENT)
          ? ['040102', '040103']
          : this.props.filters.products;

        const market = configuration.is(DEVELOPMENT)
          ? '15013406'
          : this.props.filters.market;

        return `<iframe width="100%" height="100%" src='${
          window.location.protocol}//${window.location.host}/#/embed/economic-explorer/food-prices/wholesale-markets/${
          market}/${
          moment(this.props.filters.startDate).format('DD-MM-YYYY')}/${
          moment(this.props.filters.endDate).format('DD-MM-YYYY')}/${
          products.join()}' />`;
      }
    };

    return (
      <>

        <div style={{textAlign: "-webkit-center", marginTop: 50}}>
          <Title
            text={this.props.title}
            exportFileName={'pricetrend.png'}
            export={document.getElementById('pricetrend')}
            embed={() => {
              copy(getEmbedLink()).then(toast('Code to embed has been copied to the clipboard'));
            }}
          />
        </div>
        <div id='pricetrend' style={{background: 'white'}}>
          <ResponsiveContainer width={'96%'} height={500}>

            <LineChart width={'100%'} height={400} data={this.props.values}>
              {this.props.keys.map((key) => (
                <Line type="monotone" dot={false} dataKey={key} strokeWidth={2}
                      stroke={this.props.colors[key.hashCode()]}/>
              ))}

              <CartesianGrid vertical={false} stroke="#ccc"/>
              <XAxis dataKey="date" tickFormatter={(tickItem) => moment(tickItem, 'YYYY/MM/DD').format('DD MMM YYYY')}/>
              <YAxis
                tickFormatter={(tick) => tick === 0 ? 0 : tick.toFixed(2)}
                domain={[0.0, (dataMax) => Math.ceil(dataMax/4.0)*5]}
                tickCount={configuration.getInstance().LINE_CHART.AXIS.Y.TICK_COUNT}
                allowDecimals={true}
              >
                <Label
                  value={'Soles'}
                  position="insideLeft"
                  angle={-90}
                  offset={10}
                  style={{textAnchor: 'middle', fontWeight: 'normal'}}
                  stroke="rgb(88,88,88)"
                />
              </YAxis>
              {this.props.values && this.props.values.length > 0 && (
                <Brush
                  fill="transparent"
                  startIndex={startIndex()}
                  tickFormatter={(tick) => moment(this.props.values[tick].date, 'YYYY/MM/DD').format('DD/MM/YYYY')}
                  height={100}
                >
                  {renderAreaChart()}
                </Brush>
              )}
              <Tooltip
                cursor={{strokeDasharray: '5 5'}}
                content={(evt) => {
                  if (!evt.payload || !evt.payload[0]) {
                    return '';
                  }
                  return (
                    <div className="chartTooltip">
                      <h4>{moment(evt.payload[0].payload.date, 'YYYY/MM/DD').format('DD MMM YYYY')}</h4>
                      {evt.payload.map((item) => (
                        <>
                          <i style={{background: item.stroke}}/>
                          <span>{item.dataKey} </span>
                          <span style={{fontWeight: 'bold'}}>
                            {item.payload[item.dataKey].toFixed(2)}
                          </span>
                          <br/>
                        </>
                      ))}
                    </div>
                  );
                }}
              />
              <Legend formatter={(value, entry) => <span style={{ fontWeight: 'bold' }}>{value}</span>}/>
            </LineChart>

          </ResponsiveContainer>
        </div>
      </>

    );
  }
}

export default PricesChart;
