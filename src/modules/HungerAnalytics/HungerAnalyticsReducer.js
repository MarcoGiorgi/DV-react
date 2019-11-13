import { Types } from './HungerAnalyticsActions';

export class HungerAnalyticsReducer {
  reduce(state, action) {
    switch (action.type) {
      // MARKETS
      case Types.HUNGER_TOGGLE_MARKETS_AND_ECONOMIC: {
        state.hunger.marketsAndEconomic.open = !state.hunger.marketsAndEconomic.open;
        break;
      }

      case Types.HUNGER_TOGGLE_MARKET_LAYER: {
        state.hunger.marketsAndEconomic.markets = !state.hunger.marketsAndEconomic.markets;
        break;
      }

      // REMOTE SENSING
      case Types.HUNGER_TOGGLE_REMOTE_SENSING: {
        state.hunger.remoteSensing.open = !state.hunger.remoteSensing.open;
        break;
      }

      case Types.HUNGER_TOGGLE_RAINFALL: {
        state.hunger.remoteSensing.rainfall = !state.hunger.remoteSensing.rainfall;

        if (state.hunger.remoteSensing.rainfall) {
          state.hunger.remoteSensing.ndvi = false;
        }

        break;
      }

      case Types.HUNGER_TOGGLE_VEGETATION_INDEX: {
        state.hunger.remoteSensing.ndvi = !state.hunger.remoteSensing.ndvi;

        if (state.hunger.remoteSensing.ndvi) {
          state.hunger.remoteSensing.rainfall = false;
        }
        break;
      }

      // POPULATION DENSITY
      case Types.HUNGER_TOGGLE_POPULATION_DENSITY: {
        state.hunger.populationDensity.open = !state.hunger.populationDensity.open;
        break;
      }

      case Types.HUNGER_TOGGLE_ADMIN1: {
        state.hunger.populationDensity.admin1 = !state.hunger.populationDensity.admin1;
        if (state.hunger.populationDensity.admin1) {
          state.hunger.populationDensity.admin2 = false;
        }
        break;
      }

      case Types.HUNGER_TOGGLE_ADMIN2: {
        state.hunger.populationDensity.admin2 = !state.hunger.populationDensity.admin2;
        if (state.hunger.populationDensity.admin2) {
          state.hunger.populationDensity.admin1 = false;
        }

        break;
      }

      // FOOD SECURITY
      case Types.HUNGER_TOGGLE_FOOD_SECURITY: {
        state.hunger.foodSecurity.open = !state.hunger.foodSecurity.open;
        break;
      }

      case Types.HUNGER_TOGGLE_IPC: {
        state.hunger.foodSecurity.ipc = !state.hunger.foodSecurity.ipc;
        break;
      }

      // LOGISTICS
      case Types.HUNGER_TOGGLE_LOGISTICS: {
        state.hunger.logistics.open = !state.hunger.logistics.open;
        break;
      }

      case Types.HUNGER_TOGGLE_ROAD: {
        state.hunger.logistics.road = !state.hunger.logistics.road;
        break;
      }

      default:
        return null;
    }

    return state;
  }
}
