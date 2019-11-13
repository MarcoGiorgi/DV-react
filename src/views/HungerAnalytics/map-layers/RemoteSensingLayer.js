import L from 'leaflet';

import React from 'react';
import t from '../../../i18n';

import { AbstractLayer } from './AbstractLayer';

export class RemoteSensingLayer extends AbstractLayer {
  showOrHideRainfall(map, show) {
    if (!show) {
      if (this.layers.rainfall) {
        map.removeLayer(this.layers.rainfall);
        this.layers.rainfall = null;
      }
      return;
    }

    if (this.layers.rainfall) {
      return;
    }

    this.layers.rainfall = L.tileLayer
      .wms('http://rasdaman.brainsen.com/rasdaman/ows?', {
        layers: 'rainfall',
        format: 'image/png',
        transparent: true,
        opacity: 0.4,
        version: '1.3.0'
        // crs: 'EPSG:4326',
      })
      .addTo(map);
  }

  showOrHideNDVI(map, show) {
    if (!show) {
      if (this.layers.ndvi) {
        map.removeLayer(this.layers.ndvi);
        this.layers.ndvi = null;
      }
      return;
    }

    if (this.layers.ndvi) {
      return;
    }

    this.layers.ndvi = L.tileLayer
      .wms('http://rasdaman.brainsen.com/rasdaman/ows?', {
        layers: 'ndvi',
        format: 'image/png',
        transparent: true,
        opacity: 0.4,
        version: '1.3.0'
        // crs: 'EPSG:4326',
      })
      .addTo(map);
  }

  getRainfallLegendContent(show, stateManager) {
    if (show) {
      return this.createLayerContent(
        stateManager,
        t('hunger.main.map.legend.rainfall.title'),
        'rainfall',
        <span>
          <p>
            <i>
              {t('hunger.main.map.legend.rainfall.text')}
              <br />
              {t('hunger.main.map.legend.last_update')}
: 20/04/2019
            </i>
          </p>
          <img src="/_Images/MapLegend/rainfall.png" alt="rainfall" />
        </span>
      );
    }
    return null;
  }

  getNDVILegendContent(show, stateManager) {
    if (show) {
      return this.createLayerContent(
        stateManager,
        t('hunger.main.map.legend.ndvi.title'),
        'ndvi',
        <span>
          <p>
            <i>
              {t('hunger.main.map.legend.ndvi,text')}
              <br />
              {t('hunger.main.map.legend.last_update')}
: 02/06/2019
            </i>
          </p>
          <img src="/_Images/MapLegend/ndvi.png" alt="ndvi" />
        </span>
      );
    }
    return null;
  }
}
