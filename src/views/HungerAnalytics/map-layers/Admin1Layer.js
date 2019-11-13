import axios from 'axios';
import L from 'leaflet';
import $ from 'jquery';
import { AbstractLayer } from './AbstractLayer';

const defaultAdminStyle = {
  color: '#2262CC',
  weight: 1,
  opacity: 1,
  fillOpacity: 0,
  fillColor: '#2262CC',
  zIndex: 2000
};

const highlightAdminStyle = {
  color: '#1F6EBC',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.13,
  fillColor: '#2262CC'
};

export class Admin1Layer extends AbstractLayer {
  showAdmin1(map) {
    const url = `${this.getServerAddress()}/GeoJSON/${this.getCountryCode()}/${this.getCountryCode()}.json`;

    const self = this;

    axios
      .get(url)
      .then((response) => {
        self.layers.admin1 = L.geoJSON(response.data, {
          style: defaultAdminStyle,
          onEachFeature: self.onEachAdminFeature
        }).addTo(map);
        // mapLayers.labels.bringToFront();
        const latlngbounds = new L.latLngBounds(self.layers.admin1.getBounds());

        map.setMaxBounds(latlngbounds.pad(Math.sqrt(2) / 3));
        setTimeout(() => {
          map.fitBounds(latlngbounds.pad(Math.sqrt(2) / 100));
        }, 500);
      })
      .catch((error) => {
        console.err(error);
      });
  }

  onEachAdminFeature(feature, layer) {
    layer.setStyle(defaultAdminStyle);
    ((layer, properties) => {
      layer.on('mouseover', (e) => {
        // if (self.isLayerVisibile('ipc'))
        //   return;
        if (e.target.feature.id !== 0) {
          layer.setStyle(highlightAdminStyle);
        }
        const popup = $('<div></div>', {
          id: `popup-${properties.Code}`,
          css: {
            position: 'absolute',
            bottom: '25px',
            left: '25px',
            zIndex: 1002,
            backgroundColor: 'white',
            padding: '8px',
            border: '1px solid #ccc',
            fontSize: '12px',
            pointerEvents: 'none'
          }
        });
        $('<div></div>', {
          text: properties.Name,
          css: { fontSize: '16px', marginBottom: '3px' }
        }).appendTo(popup);
        // Add the popup to the map
        popup.appendTo('#map');
      });
      layer.on('mouseout', (e) => {
        // if (self.isLayerVisibile('ipc'))
        //   return;
        if (e.target.feature.id !== 0) {
          layer.setStyle(defaultAdminStyle);
        }
        $(`#popup-${properties.Code}`).remove();
      });
    })(layer, feature.properties);
  }
}
