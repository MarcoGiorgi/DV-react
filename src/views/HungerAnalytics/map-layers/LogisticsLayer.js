import axios from 'axios';
import L from 'leaflet';
import React from 'react';

import { AbstractLayer } from './AbstractLayer';

import t from '../../../i18n';

const COUNTRY = 195;
const SERVER = 'https://dataviz.vam.wfp.org';

export class LogisticsLayer extends AbstractLayer {
  showOrHideRoads(map, show) {
    if (!show) {
      if (this.layers.roads) {
        map.removeLayer(this.layers.roads);
        this.layers.roads = null;
      }
      return;
    }

    if (this.layers.roads) {
      return;
    }

    const url = `${SERVER}/API/getIso?adm0=${COUNTRY}`;

    const self = this;

    axios
      .get(url)
      .then((response) => {
        const iso3 = response.data[0].iso3alpha;

        self.layers.roads = L.tileLayer
          .wms('http://ogcserver.gis.wfp.org/geoserver/ows/', {
            layers: `geonode:${iso3}_trs_roads_osm`,
            styles: 'road_func_class',
            version: '1.1.0',
            format: 'image/png',
            transparent: true,
            opacity: 1
          })
          .addTo(map);
      })
      .catch((error) => {
        console.err(error);
      });
  }

  getRoadsLegendContent(show, stateManager) {
    if (show) {
      return super.createLayerContent(
        stateManager,
        t('hunger.main.map.legend.road_networks.title'),
        'roads',
        <img src="/_Images/MapLegend/roads.png" alt="roads" />
      );
    }
    return null;
  }
}
