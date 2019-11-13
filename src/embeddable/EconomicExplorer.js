import Loadable from 'react-loadable';
import React from 'react';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

export const EmbeddableMapChart = Loadable({
  loader: () => import('../views/EconomicExplorer/dashboard/EmbeddableMapChart'),
  loading
});

export const EmbeddableTrendChart = Loadable({
  loader: () => import('../views/EconomicExplorer/dashboard/EmbeddableTrendChart'),
  loading
});

export const EmbeddableDonutChart = Loadable({
  loader: () => import('../views/EconomicExplorer/dashboard/EmbeddableDonutChart'),
  loading
});

export const EmbeddablePieChart = Loadable({
  loader: () => import('../views/EconomicExplorer/dashboard/EmbeddablePieChart'),
  loading
});

export const EmbeddableBarChart = Loadable({
  loader: () => import('../views/EconomicExplorer/dashboard/EmbeddableBarChart'),
  loading
});

export const EmbeddableRetailPriceChart = Loadable({
  loader: () => import('./economic-explorer/EmbeddableRetailPriceChart'),
  loading
});

export const EmbeddableWholesalePriceChart = Loadable({
  loader: () => import('./economic-explorer/EmbeddableWholesalePriceChart'),
  loading
});
