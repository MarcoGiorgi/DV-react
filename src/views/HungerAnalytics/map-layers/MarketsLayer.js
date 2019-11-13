import L from 'leaflet';
import axios from 'axios';
import React from 'react';

import { AbstractLayer } from './AbstractLayer';

export class MarketsLayer extends AbstractLayer {
  showOrHideMarkets(map, show) {
    if (!show) {
      if (this.layers.markets) {
        map.removeLayer(this.layers.markets);
        this.layers.markets = null;
      }
      return;
    }
    const marketIcon = L.Icon.extend({
      options: {
        shadowUrl: '/_images/leaflet/markers/market-shadow.png',
        iconSize: [26, 39],
        shadowSize: [30, 28],
        iconAnchor: [13, 38],
        shadowAnchor: [0, 26],
        popupAnchor: [-1, -38]
      }
    });
    const marketNormalIcon = new marketIcon({ iconUrl: '/_images/leaflet/markers/market-normal.png' });
    const marketStressIcon = new marketIcon({ iconUrl: '/_images/leaflet/markers/market-stress.png' });
    const marketAlertIcon = new marketIcon({ iconUrl: '/_images/leaflet/markers/market-alert.png' });
    const marketCrisisIcon = new marketIcon({ iconUrl: '/_images/leaflet/markers/market-crisis.png' });

    const url = `${this.getServerAddress()}/API/GetMarketsWithStatus?ac=${this.getCountryCode()}`;

    const self = this;

    axios
      .get(url)
      .then((response) => {
        const geoData = response.data;

        self.layers.markets = L.geoJSON(geoData, {
          pointToLayer: (feature, latlng) => {
            switch (feature.properties.status) {
              case 'Stress':
                return L.marker(latlng, { icon: marketStressIcon });
              case 'Alert':
                return L.marker(latlng, { icon: marketAlertIcon });
              case 'Crisis':
                return L.marker(latlng, { icon: marketCrisisIcon });
              default:
                return L.marker(latlng, { icon: marketNormalIcon });
            }
          },
          // pane: pane,
          // style: cstyle
          onEachFeature: self.onEachMarketFeature // ,
        }).addTo(map);
      })
      .catch((error) => {
        console.err(error);
      });
  }

  onEachMarketFeature(feature, layer) {}

  getMarketsLegendContent(show, stateManager) {
    if (show) {
      return this.createLayerContent(
        stateManager,
        'Markets',
        'markets',
        <span>
          <h3>ALPS statuses</h3>
          <p>
            <i>Severity of the price alert</i>
          </p>
          <img src="/_Images/MapLegend/alps.png" alt="" />
        </span>
      );
    }
    return null;
  }
}
