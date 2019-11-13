import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 Modal, ModalBody, ModalFooter, ModalHeader, Button 
} from 'reactstrap';

import ACTIONS from '../../modules/action';
import DefaultLayout from '../../containers/DefaultLayout';

import t from '../../i18n';

class HungerAnalyticsLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.togglePrimary = this.togglePrimary.bind(this);
  }

  getNavConf() {
    return {
      items: [
        {
          name: t('hunger.menu.markets_and_economic'),
          url: '#',
          icon: 'fa fa-usd',
          children: [
            {
              name: t('hunger.menu.markets_and_economic.markets'),
              icon: `fa ${this.props.hunger.marketsAndEconomic.markets ? 'fa-check-circle' : 'fa-circle-o'}`, // fa-circle-o,
              attributes: {
                onClick: (e) => {
                  e.preventDefault();
                  this.props.toggleMarketsLayer();
                }
              },
              custom: true
            }
          ]
        },
        {
          name: t('hunger.menu.remote_sensing'),
          url: '#',
          icon: 'fa fa-cloud',
          children: [
            {
              name: t('hunger.menu.remote_sensing.rainfall'),
              icon: `fa ${this.props.hunger.remoteSensing.rainfall ? 'fa-check-circle' : 'fa-circle-o'}`, // fa-circle-o,
              attributes: {
                onClick: (e) => {
                  e.preventDefault();
                  this.props.toggleRainfallLayer();
                }
              },
              custom: true
            },
            {
              name: t('hunger.menu.remote_sensing.ndvi'),
              icon: `fa ${this.props.hunger.remoteSensing.ndvi ? 'fa-check-circle' : 'fa-circle-o'}`, // fa-circle-o,
              attributes: {
                onClick: (e) => {
                  e.preventDefault();
                  this.props.toggleVegetationIndexLayer();
                }
              },
              custom: true
            }
          ]
        },
        {
          name: t('hunger.menu.population_density'),
          url: '#',
          icon: 'fa fa-cloud',
          children: [
            {
              name: t('hunger.menu.population_density.admin_level1'),
              icon: `fa ${this.props.hunger.populationDensity.admin1 ? 'fa-check-circle' : 'fa-circle-o'}`, // fa-circle-o,
              attributes: {
                onClick: (e) => {
                  e.preventDefault();
                  this.props.toggleAdmin1Layer();
                }
              },
              custom: true
            },
            {
              name: t('hunger.menu.population_density.admin_level2'),
              icon: `fa ${this.props.hunger.populationDensity.admin2 ? 'fa-check-circle' : 'fa-circle-o'}`, // fa-circle-o,
              attributes: {
                onClick: (e) => {
                  e.preventDefault();
                  this.props.toggleAdmin2Layer();
                }
              },
              custom: true
            }
          ]
        },
        {
          name: t('hunger.menu.logistics'),
          url: '#',
          icon: 'fa fa-globe',
          children: [
            {
              name: t('hunger.menu.logistics.road_networks'),
              icon: `fa ${this.props.hunger.logistics.road ? 'fa-check-circle' : 'fa-circle-o'}`, // fa-circle-o,
              attributes: {
                onClick: (e) => {
                  e.preventDefault();
                  this.props.toggleRoadLayer();
                }
              },
              custom: true
            }
          ]
        },
        {
          name: t('hunger.menu.glossary'),
          url: '#',
          icon: 'fa fa-book',
          attributes: {
            onClick: (e) => {
              e.preventDefault();
              this.togglePrimary();
            }
          }
        },
        {
          name: 'Contact Us',
          icon: 'fa fa-envelope',
          url: 'mailto:wfp.dataviz@wrp.org',
          custom: 'true',
          attributes: { href: 'mailto:wfp.dataviz@wrp.org' }
        }
      ]
    };
  }

  showGlossary() {
    this.togglePrimary();
  }

  buildGlossary() {
    return (
      <Modal isOpen={this.state.primary} toggle={this.togglePrimary} className="modal-lg modal-primary">
        <ModalHeader toggle={this.togglePrimary}>Glossary</ModalHeader>
        <ModalBody>
          <h4>Alerta por aumento de precios (ALPS)</h4>
          <p>
            Las imágenes de la Alerta por Aumento de Precios (ALPS, por sus siglas en inglés) muestran el estado de los
            precios de productos en mercados, donde destacan valores a una escala de cuatro niveles:
            <b>Normal - Estrés - Crisis – Emergencia</b>
            <br />
            El supuesto es que los hogares enfrentarán los desafíos económicos para acceder a los alimentos de estos
            mercados porque los precios son demasiado altos en comparación con las tendencias históricas y temporales.
            El índice ALPS se crea utilizando los datos en la base de datos de monitoreo de precios de VAM (Mapeo y
            Análisis de la Vulnerabilidad del PMA). La metodología de ALPS y la fuente de datos se puede encontrar en la
            {' '}
            <a href="http://dataviz.vam.wfp.org/economic_explorer/price-forecasts-alerts">
              sección del Visor Macroeconimico y Precios de Alimentos
              {' '}
            </a>
            de este sitio web.
          </p>

          <h4>Precipitación</h4>
          <p>
            Las imágenes mensuales de precipitación muestran el comportamiento de la precipitación estacional acumulada
            como un porcentaje del promedio de 20 años de cada 10 días.
          </p>
          <p>
            Los valores por debajo del 100% indican condiciones más secas que el promedio, y por encima del 100% indican
            condiciones más húmedas que el promedio. Se considera que las variaciones entre el 90% y el 110% tienen un
            impacto intrascendente en las tierras de cultivo o pasto y están representados en blanco. De lo contrario,
            las zonas marrones indican áreas donde la precipitación es menor al promedio y las zonas azules indican
            áreas donde la precipitación estacional está por encima del promedio. Los usuarios pueden evaluar si la
            temporada se está volviendo más seca que el promedio (las zonas de coloración azul se vuelven más claras o
            las de color marrón cada vez más oscuras) o más húmeda que el promedio (las zonas marrones se vuelven más
            claros o las azules que se hacen más oscuras).
          </p>
          <p>
            Los datos estimados de precipitación provienen de Climate Hazards Group InfraRed Precipitation with Station
            data (CHIRPS) de la Universidad de California, Santa Barbara. Los datos son a partir de 1981 hasta la fecha.
            CHIRPS incorpora imágenes satelitales de 0.05° de resolución con datos terrestres para crear series
            estacionales de precipitación con “cuadricula” para el análisis de tendencias y monitoreo estacional de
            sequía. CHIRPS está disponible para el uso gratuito y en este enlace: f
            <a href="ftp://ftp.chg.ucsb.edu/pub/org/chg/products/CHIRPS-2.0" target="_blank" rel="noopener noreferrer">
              this link
            </a>
            .
          </p>

          <h4>NDVI</h4>
          <p>
            Las imágenes de Índice de Vegetación de Diferencia Normalizada (NDVI, por sus siglas en inglés) muestra la
            vegetación reciente en comparación al promedio. Las zonas verdes presentan las áreas donde la cobertura
            vegetal está por encima del promedio, mientras que las zonas naranjas y marrones identifican las áreas donde
            la vegetación es menor de lo normal
            <br />
            Los usuarios pueden identificar si la cobertura vegetal está volviéndose menos densa (según la tonalidad de
            verde más clara o de la naranja que se hace más oscura) o más densa (según la tonalidad del color naranja
            que se hace más clara o la verde que se hace más oscura). Los valores que van entre 90% y 110% son
            considerados dentro de una variabilidad normal. La data del NDVI proviene de los satélites MODIS: Terra y
            Aqua que brinda información global desde el 2000 (Terra) y mediados de 2002 (Aqua) con una resolución de
            aproximada de 5 km cada 8 días, a partir de datos superpuestos con una frecuencia de 16 días. Esta data NDVI
            y Cuadrícula de modelado climático (CMG, por sus siglas en inglés) proviene de:
          </p>
          <ul>
            <li>NASA EOSDIS Land Processes Distributed Active Archive Center (LP DAAC)</li>
            <li>USGS/Earth Resources Observation and Science (EROS) Center</li>
            <li>Sioux Falls, South Dakota, USA.</li>
          </ul>

          <h4>Cadre Harmonis&eacute;/IPC</h4>
          <p>
            La Clasificación Integrada de las Fases de Seguridad Alimentaria (IPC, por sus siglas en inglés) fue
            desarrollada por una alianza global, es un conjunto de herramientas y procedimientos para determinar la
            inseguridad alimentaria. Este enfoque basado en la evidencia utiliza estándares internacionales que permiten
            comparar la seguridad alimentaria entre países a lo largo del tiempo. Se basa en procesos de creación de
            consenso por parte de diferentes actores y proporciona a los responsables de la toma de decisiones un
            análisis riguroso de la inseguridad alimentaria, con objetivos generales para la respuesta humanitaria. Se
            clasifican las poblaciones en diferentes fases según la gravedad de la situación. Se puede encontrar más
            información:
            {' '}
            <a href="http://www.ipcinfo.org" target="_blank" rel="noopener noreferrer">
              http://www.ipcinfo.org
            </a>
            .
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.togglePrimary}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }

  render() {
    return (
      <div>
        <DefaultLayout customSidebar={this.getNavConf()} redirectFrom={'/Hunger-Analytics-Hub'} redirectTo={'/Hunger-Analytics-Hub/main'} {...this.props} />
        {this.buildGlossary()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hunger: state.hunger
});

const mapDispatchToProps = (dispatch) => ({
  toggleMarketsLayer: () => dispatch(ACTIONS.HUNGER.toggleMarketLayer()),
  toggleRainfallLayer: () => dispatch(ACTIONS.HUNGER.toggleRainfall()),
  toggleVegetationIndexLayer: () => dispatch(ACTIONS.HUNGER.toggleVegetationIndex()),
  toggleAdmin1Layer: () => dispatch(ACTIONS.HUNGER.toggleAdmin1()),
  toggleAdmin2Layer: () => dispatch(ACTIONS.HUNGER.toggleAdmin2()),
  toggleIPCLayer: () => dispatch(ACTIONS.HUNGER.toggleIPC()),
  toggleRoadLayer: () => dispatch(ACTIONS.HUNGER.toggleRoadNetworks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HungerAnalyticsLayout);
