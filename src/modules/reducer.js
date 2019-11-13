import _ from 'lodash';
import config from '../config';

import { SiteWideReducer } from './SitewideReducer/SiteWideReducer';
import { HungerAnalyticsReducer } from './HungerAnalytics/HungerAnalyticsReducer';
import {
  EconomicExplorerReducer,
  INITIAL_STATE as EconomicExplorerInitialState
} from './EconomicExplorer/EconomicExplorerReducer';
import {
  SeasonalExplorerReducer,
  INITIAL_STATE as SeasonalExplorerInitialState
} from './SeasonalExplorer/SeasonalExplorerReducer';
import {
  VulnerabilityMapReducer,
  INITIAL_STATE as VulnerabilityMapInitialState
} from './VulnerabilityMap/VulnerabilityMapReducer';

const defaultState = {
  language: config.getInstance().getLang(),
  hunger: {
    marketsAndEconomic: {},
    populationDensity: {},
    foodSecurity: {},
    logistics: {},
    remoteSensing: {}
  },
  seasonal: _.cloneDeep(SeasonalExplorerInitialState),
  vulnerability: _.cloneDeep(VulnerabilityMapInitialState),
  ..._.cloneDeep(EconomicExplorerInitialState)
};

const reducers = [
  new SiteWideReducer(),
  new HungerAnalyticsReducer(),
  new EconomicExplorerReducer(),
  new SeasonalExplorerReducer(),
  new VulnerabilityMapReducer()
];

const dataVizReducer = (state = defaultState, action) => {
  const newState = _.cloneDeep(state);

  return reducers.reduce((result, reducer) => result || reducer.reduce(newState, action), null) || state;
};

export default dataVizReducer;
