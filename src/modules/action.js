import { Actions as HungerAnalyticsActions } from './HungerAnalytics/HungerAnalyticsActions';
import { Actions as EconomicExplorerActions } from './EconomicExplorer/EconomicExplorerActions';
import { Actions as SeasonalExplorerActions } from './SeasonalExplorer/SeasonalExplorerActions';
import { Actions as VulnerabilityMapActions } from './VulnerabilityMap/VulnerabilityMapActions';
import { Actions as SiteWideActions } from './SitewideReducer/SiteWideActions';

export default {
  SITEWIDE: SiteWideActions,
  HUNGER: HungerAnalyticsActions,
  ECONOMICEXPLORER: EconomicExplorerActions,
  SEASONALEXPLORER: SeasonalExplorerActions,
  VULNERABILITY: VulnerabilityMapActions
};
