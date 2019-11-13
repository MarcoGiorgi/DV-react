import _ from 'lodash';
import { Types } from './SeasonalExplorerActions';

const STATE = {
  rav: {
    visualizations: {
      modals: {},
      year: new Date().getFullYear(),
      coverageID: 1
    }
  }
};

export class SeasonalExplorerReducer {
  reduce(state, action) {
    switch (action.type) {
      case Types.SAVE_DATA: {
        const data = (state.seasonal.rav.data = { rfhSeries: {} });
        action.payload.rfhSeries.map((value) => (data.rfhSeries[value.name] = value));
        break;
      }
      case Types.VISUALIZATIONS_CHANGE_YEAR:
        state.seasonal.rav.visualizations.year = action.payload;
        break;
      case Types.VISUALIZATIONS_CHANGE_COVERAGEID:
        state.seasonal.rav.visualizations.coverageID = action.payload;
        break;
      case Types.VISUALIZATIONS_TOGGLE_MODAL:
        state.seasonal.rav.visualizations.modals[action.payload] = !state.seasonal.rav.visualizations.modals[
          action.payload
        ];
        break;
      case Types.VISUALIZATIONS_RESET_PAGE:
        state.seasonal = _.cloneDeep(INITIAL_STATE);
        break;
      case Types.VISUALIZATIONS_SELECT_ADMIN1:
        state.seasonal.rav.visualizations.selectedAdmin1 = action.payload.admin1;
        state.seasonal.rav.visualizations.admin2 = action.payload.admin2;
        if (state.seasonal.rav.visualizations.selectedAdmin2) {
          delete state.seasonal.rav.visualizations.selectedAdmin2;
        }
        break;
      case Types.VISUALIZATIONS_SELECT_ADMIN2:
        state.seasonal.rav.visualizations.selectedAdmin2 = action.payload;
        break;
      default:
        return null;
    }

    return state;
  }
}

export let INITIAL_STATE = _.cloneDeep(STATE);
