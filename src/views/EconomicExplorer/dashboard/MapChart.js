import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps';

import * as topojson from 'topojson';
import {geoTimes} from "d3-geo-projection"
import {geoPath} from "d3-geo"
import {VictoryBar, VictoryTheme, VictoryGroup} from "victory"
import {Title} from "../components/ChartTitle";
import _ from 'lodash-es';
import ReactTooltip from "react-tooltip"
import { getApiServer } from "../../../config";
import '../style.scss';
import ACTIONS from "../../../modules/action";
import * as moment from "moment";
import copy from "clipboard-copy";
import {toast} from "react-toastify";


class MapChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      geographies: null,
      zoom: 1,
      center: [-75.2988222, -5.3912658],
    };

    this.projection = this.projection.bind(this);
  }

  componentWillMount() {
    if (this.props.category && this.props.category.code && this.props.startDate) {
      this.props.fetchSupplyByRegion(this.props.category.code, this.props.startDate);
    }
  }

  loadGeographies() {
    const self = this;
    axios.get(`${getApiServer()}/api/Geographies/Admin1`)
      .then(result => {

        const geoJson = result.data;
        const topoJson = topojson.topology({foo: result.data});

        const path = geoPath().projection(this.projection());

        const graphs = geoJson.features.map(feature => {
          const centroid = this.projection().invert(path.centroid(feature));

          return {
            id: feature.properties.IDDPTO,
            name: feature.properties.NOMBDEP,
            center: centroid
          }
        });

        self.setState({
          geographies: topoJson,
          graphs
        }, () => {
          self.centerAndZoom()
        });
      });
  }

  componentDidMount() {
    this.loadGeographies();

  }

  projection() {
    return geoTimes()
      .translate([this.props.width / 2, this.props.height / 2])
      .scale(160);
  }

  centerAndZoom() {
    // calculate zoom level
    const bounds = topojson.bbox(this.state.geographies);
    const dx = bounds[2] - bounds[0];
    const dy = bounds[3] - bounds[1];
    const zoom = 0.35 / Math.max(dx / this.props.width, dy / this.props.height);

    const center = [(bounds[0] + bounds[2]) / 2.0, (bounds[1] + bounds[3]) / 2.0];

    if (zoom !== this.state.zoom) {
      this.setState({
        zoom,
        center
      })
    }
  }

  componentWillUpdate() {
    if (this.state.geographies)
      this.centerAndZoom();
  }

  componentDidUpdate() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  getDataSource() {
    return this.props.supply.byRegion && this.props.supply.byRegion.data;
  }


  render() {
    const renderBarChart = (graphData) => {
      const data = _.filter(this.getDataSource(), o => o.dsc_ubigeo === graphData.name);
      return (
        data && data.length &&
        <VictoryGroup
          theme={VictoryTheme.material}

          standalone={false}
          width={10}
          height={100}
          padding={0}
        >
          <VictoryBar
            data={_.filter(this.getDataSource(), o => o.dsc_ubigeo === graphData.name)}
            domain={{y: [0, _.maxBy(this.getDataSource(), 'volume').volume]}}
            barWidth={10}
            style={{
              data: {
                fill: '#5A93BD',
                stroke: 'black',
                strokeWidth: 1
              },
              labels: {
                fill: "#FF0000",
                stroke: "#FF0000",
                color: "#FF0000",
              },
            }
            }
            y='volume'
            x='dsc_ubigeo'
          />
        </VictoryGroup>
      );
    };

    return (
      <>
        <Title text={this.props.title}
               subtitle={this.props.subtitle}
               exportFileName={'mapchart.png'}
               export={document.getElementById('mapchart')}
               embed={() => {
                 copy(
                   `<iframe width="100%" height="100%" src='${window.location.protocol}//${
                     window.location.host
                     }/#/embed/economic-explorer/dashboard/mapchart/${this.props.category.code}/${this.props.category.name}/${moment(this.props.startDate).format('DD-MM-YYYY')}' />`
                 ).then(toast('Code to embed has been copied to the clipboard'));
               }}/>
        <div id={'mapchart'} style={{background: 'white'}}>
          <ComposableMap
            height={this.props.height - 3}
            width={this.props.width}
            projection={this.projection}
            style={{
              width: this.props.width || '100%',
              height: this.props.height || "auto",
            }}
          >
            <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
              <Geographies geography={this.state.geographies} disableOptimization>
                {(geographies, projection) => geographies.map((geography, i) => {
                  return (
                    <Geography
                      key={i}
                      round
                      data-tip={geography.properties.NOMBDEP}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.1,
                          outline: "none",
                        },
                        hover: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.1,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.1,
                          outline: "none",
                        },
                      }}
                    />
                  )
                })}
              </Geographies>
              <Markers>
                {
                  this.state.graphs && this.state.graphs.map((graphData, i) => (
                    <Marker
                      key={`marker-${i}`}
                      marker={{coordinates: graphData.center}}
                      style={{
                        default: {
                          outline: "none",
                        },
                        hover: {
                          outline: "none",
                        },
                        pressed: {
                          outline: "none",
                        },
                      }}
                    >
                      <g transform="translate(-10,-100)">
                        {renderBarChart(graphData)}
                      </g>
                    </Marker>
                  ))
                }
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
          <ReactTooltip className='reactTooltip' getContent={regName => {
            const data = _.filter(this.getDataSource(), o => o.dsc_ubigeo === regName);
            if (data && data.length) {
              return `${regName} : ${ data[0].volume.toFixed(2)}`;
            } else {
              return regName;
            }
          }}/>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  supply: state.economic.prices.supply,
  loading: state.economic.prices.loading,
  error: state.economic.prices.error
});

const mapDispatchToProps = (dispatch) => ({
  fetchSupplyByRegion: (categoryCode, startDate) => dispatch(ACTIONS.ECONOMICEXPLORER.SUPPLY.fetchSupplyByRegion(categoryCode, startDate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapChart);