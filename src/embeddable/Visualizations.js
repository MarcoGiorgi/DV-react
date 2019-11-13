import Loadable from 'react-loadable';
import React from 'react';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

export const RainfallChart = Loadable({
  loader: () => import('../views/SeasonalExplorer/RainfallAndVegetations/charts/RainfallChart'),
  loading
});

export const NdviChart = Loadable({
  loader: () => import('../views/SeasonalExplorer/RainfallAndVegetations/charts/Ndvi'),
  loading
});

export const NdviAnomalyChart = Loadable({
  loader: () => import('../views/SeasonalExplorer/RainfallAndVegetations/charts/NdviAnomaly'),
  loading
});

export const RainfallAndNdviChart = Loadable({
  loader: () => import('../views/SeasonalExplorer/RainfallAndVegetations/charts/RainfallAndNDVI'),
  loading
});

export const RainfallAndNdviAnomaliesChart = Loadable({
  loader: () => import('../views/SeasonalExplorer/RainfallAndVegetations/charts/RainfallAndNDVIAnomalies'),
  loading
});

export const RainfallAnomalyChart = Loadable({
  loader: () => import('../views/SeasonalExplorer/RainfallAndVegetations/charts/RainfallAnomalyChart'),
  loading
});
