import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import * as moment from 'moment';
import 'moment/locale/es';

import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './modules/store';

import './App.scss';
// #### VISUALIZATIONS GRAPHS
import {
  NdviAnomalyChart,
  NdviChart,
  RainfallAndNdviAnomaliesChart,
  RainfallAndNdviChart,
  RainfallAnomalyChart,
  RainfallChart
} from './embeddable/Visualizations';

// #### ECONOMIC EXPLORER - DASHBOARD GRAPHS
import {
  EmbeddableMapChart,
  EmbeddableTrendChart,
  EmbeddableDonutChart,
  EmbeddablePieChart,
  EmbeddableBarChart,
  EmbeddableRetailPriceChart,
  EmbeddableWholesalePriceChart
} from "./embeddable/EconomicExplorer";

import {L10n, loadCldr} from "@syncfusion/ej2-base";
import * as gregorian from "cldr-data/main/es/ca-gregorian";
import t from "./i18n";

import WebFontLoader from 'webfontloader';
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

const EconomicExplorerLayout = Loadable({
  loader: () => import('./views/EconomicExplorer/EconomicExplorerLayout'),
  loading
});

const SeasonalExplorerLayout = Loadable({
  loader: () => import('./views/SeasonalExplorer/SeasonalExplorerLayout'),
  loading
});

const VulnerabilityMapLayout = Loadable({
  loader: () => import('./views/VulnerabilityMap/VulnerabilityMapLayout'),
  loading
});

// Embeddable charts
// const CurrentAccountChart = Loadable({
//   loader: () => import('./views/EconomicExplorer/MacroEconomics/current-account/CurrentAccount'),
//   loading
// });
//
// const AtAGlanceChart = Loadable({
//   loader: () => import('./views/EconomicExplorer/MacroEconomics/at-a-glance/AtAGlance'),
//   loading
// });
//
// const InflationChart = Loadable({
//   loader: () => import('./views/EconomicExplorer/MacroEconomics/inflation/Inflation'),
//   loading
// });
//
// const ExchangeRateChart = Loadable({
//   loader: () => import('./views/EconomicExplorer/MacroEconomics/exchange-rate/ExchangeRate'),
//   loading
// });
//
// const GDPChart = Loadable({
//   loader: () => import('./views/EconomicExplorer/MacroEconomics/GDP/GDP'),
//   loading
// });
//
// const PricesChart = Loadable({
//   loader: () => import('./views/EconomicExplorer/Prices/Prices'),
//   loading
// });


moment.locale('es');

loadCldr(
  require("cldr-data/main/es/numbers.json"),
  require("cldr-data/main/es/ca-gregorian.json"),
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/es/timeZoneNames.json"),
);

L10n.load({
  es: {
    dates: {
      calendars: {
        gregorian
      }
    },
    daterangepicker: {
      applyText: t('daterangepicker.applyText'),
      cancelText: t('daterangepicker.cancelText'),
      customRange: t('daterangepicker.customRange'),
      days: t('daterangepicker.days'),
      endLabel: t('daterangepicker.endLabel'),
      placeholder: t('daterangepicker.placeholder'),
      selectedDays: t('daterangepicker.selectedDays'),
      startLabel: t('daterangepicker.startLabel'),
    },
    dropdowns: {
      'noRecordsTemplate': t('dropdown.norecordfound')
    },
    grid: {
      'EmptyRecord': t('dropdown.norecordfound'),
      Excelexport: t('grid.excelexport'),
    },
  }
});


class App extends Component {

  constructor(props) {
    super(props);
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  // { path: '/embed/economic-explorer/macro-economics/current-account', name: t('breadcrumb.current_account'), component: CurrentAccount, exact: true },
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div>
          <HashRouter>
            <Switch>
              {/* <Route path="/embed/hunger-analytics/:layer" name="Hunger Analytics" component={HungerAnalytics}/> */}

              {/* <Route path="/embed/economic-explorer/prices" name="Exchange Rate" component={PricesChart}/> */}
              {/* <Route path="/embed/economic-explorer/macro-economics/current-account" name="Current Account" */}
              {/* component={CurrentAccountChart}/> */}
              {/* <Route path="/embed/economic-explorer/macro-economics/at-a-glance" name="At-A-Glance" */}
              {/* component={AtAGlanceChart}/> */}
              {/* <Route path="/embed/economic-explorer/macro-economics/inflation" name="Inflation" */}
              {/* component={InflationChart}/> */}
              {/* <Route path="/embed/economic-explorer/macro-economics/exchange-rate" name="Exchange Rate" */}
              {/* component={ExchangeRateChart}/> */}
              {/* <Route path="/embed/economic-explorer/macro-economics/gdp" name="Exchange Rate" component={GDPChart}/> */}

              <Route
                path="/embed/rev/visualizations/rainfall/:year/:coverageID"
                name="Rainfall"
                component={RainfallChart}
              />
              <Route
                path="/embed/rev/visualizations/rainfall-anomaly/:year/:coverageID"
                name="Rainfall"
                component={RainfallAnomalyChart}
              />
              <Route path="/embed/rev/visualizations/ndvi/:year/:coverageID" name="Rainfall" component={NdviChart} />
              <Route
                path="/embed/rev/visualizations/ndvi-anomaly/:year/:coverageID"
                name="Rainfall"
                component={NdviAnomalyChart}
              />
              <Route
                path="/embed/rev/visualizations/rainfall-ndvi/:year/:coverageID"
                name="Rainfall"
                component={RainfallAndNdviChart}
              />
              <Route
                path="/embed/rev/visualizations/rainfall-ndvi-anomaly/:year/:coverageID"
                name="Rainfall"
                component={RainfallAndNdviAnomaliesChart}
              />

              { /* ECONOMIC EXPLORER EMBEDDABLE */ }
              <Route
                path="/embed/economic-explorer/dashboard/mapchart/:categoryCode/:categoryName/:startDate/:width?/:height?"
                name="Economic Explorer"
                component={EmbeddableMapChart}
              />

              <Route
                path="/embed/economic-explorer/dashboard/trendchart/:categoryCode/:categoryName/:startDate/:width?"
                name="Economic Explorer"
                component={EmbeddableTrendChart}
              />

              <Route
                path="/embed/economic-explorer/dashboard/donut/:categoryCode/:categoryName/:startDate"
                name="Economic Explorer"
                component={EmbeddableDonutChart}
              />

              <Route
                path="/embed/economic-explorer/dashboard/pie/:categoryCode/:categoryName/:startDate"
                name="Economic Explorer"
                component={EmbeddablePieChart}
              />
              <Route
                path="/embed/economic-explorer/dashboard/barchart/:categoryCode/:categoryName/:startDate/:width?/:height?"
                name="Economic Explorer"
                component={EmbeddableBarChart}
              />

              <Route
                path="/embed/economic-explorer/food-prices/retail-markets/:regionCode/:startDate/:endDate/:products"
                name="Economic Explorer"
                component={EmbeddableRetailPriceChart}
              />

              <Route
                path="/embed/economic-explorer/food-prices/wholesale-markets/:market/:startDate/:endDate/:products"
                name="Economic Explorer"
                component={EmbeddableWholesalePriceChart}
              />

              <Route path="/economic-explorer" name="Economic Explorer" component={EconomicExplorerLayout} />
              <Route path="/Hunger-Analytics-Hub" name="Hunger" component={VulnerabilityMapLayout} />
              <Route path="/seasonal-explorer" name="Seasonal Explorer" component={SeasonalExplorerLayout} />
              <Route path="/vulnerability-map" name="Vulnerability Map" component={VulnerabilityMapLayout} />
              <Route path="/" name="Home" component={DefaultLayout} />

            </Switch>
          </HashRouter>
        </div>
      </ReduxProvider>
    );
  }
}

export default App;
