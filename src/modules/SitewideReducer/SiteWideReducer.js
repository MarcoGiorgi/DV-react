import {CHANGE_LANG, RESET_STATE} from './SiteWideActions';
import config from '../../config';
import * as moment from "moment";

export class SiteWideReducer {
  reduce(state, action) {
    switch (action.type) {
      case RESET_STATE: {
        state = { ...state, ...action.payload.initialState };
        break;
      }
      case CHANGE_LANG: {
        state.language = action.payload;
        config.getInstance().setLang(action.payload);
        moment.locale(action.payload);
        break;
      }
      default:
        return null;
    }

    return state;
  }
}
