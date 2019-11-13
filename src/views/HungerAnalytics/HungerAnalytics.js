import React, { Component } from 'react';
import L from 'leaflet';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import 'leaflet-easybutton';
import { toast, ToastContainer } from 'react-toastify';
import copy from 'clipboard-copy';
import 'react-toastify/dist/ReactToastify.css';
import {
 Button, Popover, PopoverBody, ButtonGroup 
} from 'reactstrap';
import './HungerAnalytics.scss';
import t from '../../i18n';
import {
 PopulationDensityLayer, RemoteSensingLayer, LogisticsLayer, MarketsLayer, Admin1Layer 
} from './map-layers';

import './style.scss';

const MARKETS = 1;
const RAINFALL = 2;
const NDVI = 4;
const ROAD = 8;
const ADMIN1 = 16;
const ADMIN2 = 32;

class HungerAnalytics extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      popoverOpen: false,
      legend: {
        ndvi: true,
        rainfall: true,
        roads: true,
        markets: true
      }
    };

    this.layers = {};
    this.populationDensityLayer = new PopulationDensityLayer();
    this.remoteSensing = new RemoteSensingLayer();
    this.logisticsLayer = new LogisticsLayer();
    this.marketLayer = new MarketsLayer();
    this.admin1Layer = new Admin1Layer();
  }

  toggle() {
    this.setState((prevState) => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }

  toggleLegend(name) {
    const newLegend = _.cloneDeep(this.state.legend);
    newLegend[name] = !newLegend[name];

    this.setState({ legend: newLegend });
  }

  loadMap() {
    this.map = L.map('map', { attributionControl: false }).setView([0, 0], 3);

    const cartoDB = L.tileLayer(
      `https://cartodb-basemaps-c.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}${
        L.Browser.retina ? '@2x.png' : '.png'
      }`,
      {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0
      }
    );

    const newPane = 'labels';
    this.map.createPane(newPane).style.zIndex = 650;
    this.map.getPane('labels').style.pointerEvents = 'none';

    const mapLabels = L.tileLayer(
      `https://cartodb-basemaps-c.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}${
        L.Browser.retina ? '@2x.png' : '.png'
      }`,
      {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0,
        pane: 'labels'
      }
    );

    cartoDB.addTo(this.map);
    mapLabels.addTo(this.map);
  }

  componentDidMount() {
    this.loadMap();
    this.admin1Layer.showAdmin1(this.map);
    this.marketLayer.showOrHideMarkets(this.map, this.getPropValue(MARKETS));
    this.remoteSensing.showOrHideRainfall(this.map, this.getPropValue(RAINFALL));
    this.remoteSensing.showOrHideNDVI(this.map, this.getPropValue(NDVI));
    this.logisticsLayer.showOrHideRoads(this.map, this.getPropValue(ROAD));
    this.populationDensityLayer.showPopulation(this.map, this.getPropValue(ADMIN1), this.getPropValue(ADMIN2));
  }

  getLegendContent() {
    return (
      <div>
        {this.remoteSensing.getRainfallLegendContent(this.getPropValue(RAINFALL), this)}
        {this.remoteSensing.getNDVILegendContent(this.getPropValue(NDVI), this)}
        {this.logisticsLayer.getRoadsLegendContent(this.getPropValue(ROAD), this)}
        {this.marketLayer.getMarketsLegendContent(this.getPropValue(MARKETS), this)}
      </div>
    );
  }

  renderToastContainer() {
    if (this.props.match && this.props.match.params && this.props.match.params.layer) {
      return <ToastContainer />;
    }
    return '';
  }

  getLayerCode() {
    let layerCode = 0;

    layerCode += this.props.hunger.marketsAndEconomic.markets ? MARKETS : 0;
    layerCode += this.props.hunger.remoteSensing.rainfall ? RAINFALL : 0;
    layerCode += this.props.hunger.marketsAndEconomic.ndvi ? NDVI : 0;
    layerCode += this.props.hunger.logistics.road ? ROAD : 0;
    layerCode += this.props.hunger.populationDensity.admin1 ? ADMIN1 : 0;
    layerCode += this.props.hunger.populationDensity.admin2 ? ADMIN2 : 0;

    return layerCode;
  }

  render() {
    return (
      <div>
        {this.renderToastContainer()}
        <Popover
          placement="bottom-end"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
          style={{ width: 350 }}
        >
          <PopoverBody style={{ height: 400, overflow: 'auto' }}>{this.getLegendContent()}</PopoverBody>
        </Popover>
        <div id="map" style={{ height: '800px' }}>
          <ButtonGroup size="sm" className="float-right" style={{ zIndex: 1000 }}>
            <Button id="Popover1" block size="sm">
              {t('hunger.main.map.legend', this.props.language)}
            </Button>
            <Button
              onClick={() => {
                copy(
                  `<iframe width="100%" height="100%" src='${window.location.protocol}//${
                    window.location.host
                  }/#/embed/hunger-analytics/${this.getLayerCode()}' />`
                ).then(toast('Code to embed has been copied to the clipboard'));
              }}
            >
              <i className="fa fa-clipboard" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }

  // this.props.match && this.props.match.params

  getPropValue(layerCode) {
    if (this.props.match && this.props.match.params && this.props.match.params.layer) {
      return this.props.match.params.layer & layerCode;
    }
    switch (layerCode) {
      case MARKETS:
        return this.props.hunger.marketsAndEconomic.markets;
      case RAINFALL:
        return this.props.hunger.remoteSensing.rainfall;
      case NDVI:
        return this.props.hunger.remoteSensing.ndvi;
      case ROAD:
        return this.props.hunger.logistics.road;
      case ADMIN1:
        return this.props.hunger.populationDensity.admin1;
      case ADMIN2:
        return this.props.hunger.populationDensity.admin2;
      default:
        return false;
    }
  }

  componentDidUpdate() {
    this.marketLayer.showOrHideMarkets(this.map, this.getPropValue(MARKETS));
    this.remoteSensing.showOrHideRainfall(this.map, this.getPropValue(RAINFALL));
    this.remoteSensing.showOrHideNDVI(this.map, this.getPropValue(NDVI));
    this.logisticsLayer.showOrHideRoads(this.map, this.getPropValue(ROAD));
    this.populationDensityLayer.showPopulation(this.map, this.getPropValue(ADMIN1), this.getPropValue(ADMIN2));
  }
}

const mapStateToProps = (state) => ({
  language: state.language,
  hunger: state.hunger
});

export default connect(mapStateToProps)(HungerAnalytics);
