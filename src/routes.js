import React from 'react';
import t from './i18n';
import DefaultLayout from './containers/DefaultLayout';
import EconomicExplorerLayout from './views/EconomicExplorer/EconomicExplorerLayout';
import HungerAnalyticsLayout from './views/HungerAnalytics/HungerAnalyticsLayout';
import SeasonalExplorerLayout from './views/SeasonalExplorer/SeasonalExplorerLayout';
import VulnerabilityMapLayout from './views/VulnerabilityMap/VulnerabilityMapLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const hungerAnalytics = React.lazy(() => import('./views/HungerAnalytics/HungerAnalytics'));

const Visualizations = React.lazy(() => import('./views/SeasonalExplorer/RainfallAndVegetations/Visualizations'));
const HowItWorks = React.lazy(() => import('./views/SeasonalExplorer/RainfallAndVegetations/HowItWorks'));

const VulnerabilityMap = React.lazy(() => import('./views/VulnerabilityMap/VulnerabilityMap'));

// ECONOMIC EXPLORER
const EconomicDashboard = React.lazy(() => import('./views/EconomicExplorer/dashboard/dashboard'));
const WholeSaleMarket = React.lazy(() => import('./views/EconomicExplorer/food-prices/WholesaleMarkets'));
const RetailMarket = React.lazy(() => import('./views/EconomicExplorer/retail-prices/RetailMarkets'));

export const routes = (lang) => [
  // embeddable links
  {
    path: '/Hunger-Analytics-Hub',
    name: t('breadcrumb.hunger', { lang }),
    component: HungerAnalyticsLayout,
    exact: true
  },

  { path: '/Hunger-Analytics-Hub/main', name: '', component: VulnerabilityMap },



  { path: '/dashboard', name: t('breadcrumb.dashboard', { lang }), component: Dashboard },
  { path: '/hungerAnalytics', name: t('breadcrumb.hunger', { lang }), component: hungerAnalytics },

  // VULNERABILITY MAP
  {
    path: '/vulnerability-map',
    name: t('breadcrumb.vulnerability_map', { lang }),
    component: VulnerabilityMapLayout,
    exact: true
  },
  {
    path: '/vulnerability-map/main',
    name: '',
    component: VulnerabilityMap
  },

  // SEASONAL EXPLORER
  {
    path: '/seasonal-explorer',
    name: t('breadcrumb.seasonal_explorer', { lang }),
    component: SeasonalExplorerLayout,
    exact: true
  },
  {
    path: '/seasonal-explorer/rainfall-and-vegetation/visualizations',
    name: t('breadcrump.visualizations', { lang }),
    component: Visualizations
  },
  {
    path: '/seasonal-explorer/rainfall-and-vegetation/how-it-works',
    name: 'How it works',
    component: HowItWorks
  },

  // ECONOMIC EXPLORER
  {
    path: '/economic-explorer/',
    name: t('breadcrumb.economic_explorer', { lang }),
    component: EconomicExplorerLayout,
    exact: true
  },
  {
    path: '/economic-explorer/food-supply/dashboard',
    name: t('breadcrumb.food_prices.dashboard', { lang }),
    component: EconomicDashboard
  },
  {
    path: '/economic-explorer/food-prices/wholesale-markets',
    name: t('breadcrumb.food_prices.wholesale', { lang }),
    component: WholeSaleMarket
  },
  {
    path: '/economic-explorer/food-prices/retail-markets',
    name: t('breadcrumb.food_prices.retails', { lang }),
    component: RetailMarket
  },

  // HOME
  {
    path: '/',
    name: t('breadcrumb.home', { lang }),
    component: DefaultLayout,
    exact: true
  },

];

export default routes;
