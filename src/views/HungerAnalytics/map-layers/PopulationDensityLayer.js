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

export class PopulationDensityLayer extends AbstractLayer {
  showAdmin2(popData, map) {
    const self = this;

    axios
      .get(`${this.getServerAddress()}/API/GetGeoAdmins?adm0=${this.getCountryCode()}&alladmin2=true`)
      .then((response) => {
        const geoData = response.data;

        self.layer = L.geoJSON(geoData, {
          style: defaultAdminStyle
          // onEachFeature: onEachAdmin2Feature
        }).addTo(map);

        self.layer.eachLayer((layer) => {
          let fillColor = '';
          const admCode = layer.feature.properties.Code;
          for (let i = 0; i < popData.length; i++) {
            if (popData[i].admcode === admCode) {
              fillColor = popData[i].color;
              break;
            }
          }
          layer.setStyle({
            fillOpacity: 0.8,
            fillColor
          });
          layer.on('mouseover', (e) => {
            const popup = $('<div></div>', {
              id: `popup-${layer.feature.properties.Code}`,
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
              text: `${layer.feature.properties.Name} (${self.getPopulation(
                popData,
                layer.feature.properties.Code
              )} - Average population per km2)`,
              css: { fontSize: '16px', marginBottom: '3px' }
            }).appendTo(popup);
            // Add the popup to the map
            popup.appendTo('#map');
          });
          layer.on('mouseout', (e) => {
            $(`#popup-${layer.feature.properties.Code}`).remove();
          });
        });
      });
  }

  showAdmin1(popData, map) {
    const self = this;
    axios
      .get(`${this.getServerAddress()}/GeoJSON/${this.getCountryCode()}/${this.getCountryCode()}.json`)
      .then((response) => {
        const geoData = response.data;
        this.layer = L.geoJSON(geoData, {
          style: defaultAdminStyle,
          onEachFeature: self.onEachAdmin2Feature
        }).addTo(map);

        this.layer.eachLayer((layer) => {
          let fillColor = '';
          const admCode = layer.feature.properties.Code;
          for (let i = 0; i < popData.length; i++) {
            if (popData[i].admcode === admCode) {
              fillColor = popData[i].color;
              break;
            }
          }
          layer.setStyle({
            fillOpacity: 0.8,
            fillColor
          });
          layer.on('mouseover', (e) => {
            const popup = $('<div></div>', {
              id: `popup-${layer.feature.properties.Code}`,
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
              text: `${layer.feature.properties.Name} (${self.getPopulation(
                popData,
                layer.feature.properties.Code
              )} - Average population per km2)`,
              css: { fontSize: '16px', marginBottom: '3px' }
            }).appendTo(popup);
            // Add the popup to the map
            popup.appendTo('#map');
          });
          layer.on('mouseout', (e) => {
            $(`#popup-${layer.feature.properties.Code}`).remove();
          });
        });
      });
  }

  onEachAdmin2Feature(feature, layer) {
    layer.setStyle(defaultAdminStyle);
    (function (layer, properties) {}(layer, feature.properties));
  }

  showPopulation(map, admin1, admin2) {
    if (this.layer) {
      map.removeLayer(this.layer);
      this.layer = null;
    }

    const self = this;

    if (admin1 || admin2) {
      axios
        .get(
          `${this.getServerAddress()}/API/GetPopulation?adm0=${this.getCountryCode()}&admLevel=${admin1 ? '1' : '2'}`
        )
        .then((response) => {
          const popData = response.data;
          if (admin1) {
            self.showAdmin1(popData, map);
          }
          if (admin2) {
            self.showAdmin2(popData, map);
          }
        });
    }
  }

  getPopulation(popData, admCode) {
    for (let i = 0; i < popData.length; i++) {
      if (popData[i].admcode === admCode) {
        return new Intl.NumberFormat('en-UK').format(popData[i].population);
      }
    }
  }
}
