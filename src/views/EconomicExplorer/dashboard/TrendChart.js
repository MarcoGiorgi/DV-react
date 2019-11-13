import React, {Component} from 'react';
import {CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import * as moment from "moment";
import {Title} from "../components/ChartTitle";
import copy from "clipboard-copy";
import {toast} from "react-toastify";

class TrendChart extends Component {

  render() {
    const getLineChartTicks = () => {
      const ticks = [];

      if (this.props.dataSource && this.props.dataSource.length) {
        const maxDate = moment().year(2500).format('x');
        const dataMax = this.props.dataSource.reduce((res, serie) => Math.max(serie.data.reduce((res, data) => Math.max(res, data.date), 0), res), 0);
        const dataMin = this.props.dataSource.reduce((res, serie) => Math.min(serie.data.reduce((res, data) => Math.min(res, data.date), maxDate), res), maxDate);

        let tick = dataMin;

        if (!dataMax || !dataMin) {
          return;
        }

        while (tick <= dataMax) {
          ticks.push(tick);
          tick = moment(tick, 'x').add(1, 'months').format('x');
          if (ticks.length > 100) {
            console.log('ERRORE, dataMin: ', dataMin, ' dataMax: ', dataMax, 'data: ', this.props.dataSource);
            break;
          }
        }
      }

      return ticks;
    };

    return (
      <>
        <Title
          text={this.props.title}
          subtitle={this.props.subtitle}
          exportFileName={'trendchart.png'}
          export={document.getElementById('trendchart')}
          embed={() => {
            copy(
              `<iframe width="100%" height="100%" src='${window.location.protocol}//${
                window.location.host
                }/#/embed/economic-explorer/dashboard/trendchart/${this.props.category.code}/${this.props.category.name}/${moment(this.props.startDate).format('DD-MM-YYYY')}' />`
            ).then(toast('Code to embed has been copied to the clipboard'));
          }}
        />
        <div id={'trendchart'} style={{background: 'white', textAlign: 'left'}}>
          <LineChart width={this.props.width} height={400}
                     ref={(chart) => this.currentChart = chart}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={['dataMin', 'dataMax']}
              dataKey="date"
              tickFormatter={(tickItem) => {
                return moment(tickItem, 'x').format("MMM 'YY");
              }}
              ticks={getLineChartTicks()}
              allowDuplicatedCategory={false}
            />
            <YAxis
              dataKey="volume"
              tickFormatter={(tickItem) => `${tickItem}`}
            >
              <Label
                value="Toneladas"
                position="insideLeft"
                angle={-90}
                dx={-4}
                style={{textAnchor: 'middle', fontWeight: 'normal'}}
                stroke="rgb(88,88,88)"
              />
            </YAxis>
            <Tooltip
              cursor={{strokeDasharray: '5 5'}}
              content={(evt) => {
                if (!evt.payload || !evt.payload[0]) {
                  return '';
                }
                return (
                  <div className="chartTooltip">
                    <h4>{moment(evt.label, 'x').format("MMM 'YY")}</h4>
                    {evt.payload.map((item) => (
                      <>
                        <i style={{background: item.stroke}}/>
                        <span>{item.name} </span>
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
            <Legend/>
            {this.props.dataSource
            && this.props.dataSource.map((s) => (
              <Line
                type="monotone"
                dataKey="volume"
                data={s.data}
                name={s.name}
                key={s.name}
                stroke={s.color}
                strokeWidth={2}
                dot={true}
                isAnimationActive={true}
              />
            ))}
          </LineChart>
        </div>
      </>
    );
  }
}

export default TrendChart;
