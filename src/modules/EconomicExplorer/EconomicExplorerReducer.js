import { Types } from './EconomicExplorerActions';

export { INITIAL_STATE } from './consts';

export class EconomicExplorerReducer {
  reduce(state, action) {
    switch (action.type) {
      // GENERIC
      case Types.FETCH_REQUEST: {
        state.economic.prices.loading.push(true);
        break;
      }
      case Types.FETCH_ERROR: {
        state.economic.prices.loading.pop();
        state.economic.prices.error = action.payload;
        break;
      }

      // SUPPLY
      case Types.SUPPLY.FETCH_PRODUCTS_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.supply.products = action.payload.products;
        break;
      }

      case Types.SUPPLY.FETCH_TREND_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.supply.trend = action.payload.trend;
        break;
      }

      case Types.SUPPLY.FETCH_VARIETIES_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.supply.varieties = action.payload.varieties;
        break;
      }

      case Types.SUPPLY.FETCH_SUPPLYBYREGION_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.supply.byRegion = {
          data: action.payload.supply,
          filter: action.payload.filter
        };
        break;
      }

      case Types.SUPPLY.FETCH_TREND_BYMONTH_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.supply.trendByMonth = action.payload.trendByMonth;
        break;
      }

      // RETAIL
      case Types.RETAIL.FETCH_REGIONS_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.retail.regions = action.payload;
        break;
      }
      case Types.RETAIL.FETCH_PRODUCTS_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.retail.prices = null;
        state.economic.prices.retail.products = action.payload.products;
        state.economic.prices.retail.filter = {
          region: action.payload.region,
          category: null,
          products: null
        };
        break;
      }
      case Types.RETAIL.FETCH_PRICES_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.retail.prices = action.payload.prices;
        state.economic.prices.retail.colors = action.payload.colors;

        state.economic.prices.retail.filter = {
          region: action.payload.region,
          category: action.payload.category,
          products: action.payload.products,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate
        };
        break;
      }
      case Types.RETAIL.FETCH_PRICES_TABULAR_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.retail.table = {
          columns: action.payload.table_columns,
          data: action.payload.table_data
        };
        break;
      }

      // WHOLESALE
      case Types.WHOLESALE.FETCH_MARKETS_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.wholesale.prices = null;
        state.economic.prices.wholesale.markets = action.payload;
        state.economic.prices.wholesale.filter = {
          market: null,
          category: null,
          products: null
        };

        break;
      }
      case Types.WHOLESALE.FETCH_PRODUCTS_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.wholesale.prices = null;
        state.economic.prices.wholesale.products = action.payload.products;
        state.economic.prices.wholesale.filter = {
          market: action.payload.market,
          category: null,
          products: null
        };
        break;
      }
      case Types.WHOLESALE.FETCH_PRICES_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.wholesale.prices = action.payload.prices;
        state.economic.prices.wholesale.colors = action.payload.colors;

        state.economic.prices.wholesale.filter = {
          market: action.payload.market,
          category: action.payload.category,
          products: action.payload.products,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate
        };
        break;
      }
      case Types.WHOLESALE.FETCH_PRICES_TABULAR_SUCCESS: {
        state.economic.prices.loading.pop();
        state.economic.prices.wholesale.table = {
          columns: action.payload.table_columns,
          data: action.payload.table_data
        };
        break;
      }

      default:
        return null;
    }

    return state;
  }
}
