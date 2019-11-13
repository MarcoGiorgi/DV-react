import axios from 'axios';
import _ from 'lodash';
import dateformat from 'dateformat';
import * as moment from 'moment';

import { INITIAL_STATE, STATE_ROOT } from './consts';
import configuration, { DEVELOPMENT } from "../../config";
import { resetState } from '../SitewideReducer/SiteWideActions';

import { GraphColors } from './GraphColors';
import { capitalize } from '../../utils/stringutils';
import { throttleAction } from "../utils";

const SERVER = configuration.getInstance().getApiServer();

// SHARED
const FETCH_REQUEST = 'ECONOMIC/FETCH/REQUEST';
const FETCH_ERROR = 'ECONOMIC/FETCH/ERROR';
// WHOLESALE
const FETCH_WHOLESALE_MARKETS_SUCCESS = 'ECONOMIC/FETCH_WHOLESALE_MARKETS/SUCCESS';
const FETCH_WHOLESALE_PRODUCTS_SUCCESS = 'ECONOMIC/FETCH_WHOLESALE_PRODUCTS/SUCCESS';
const FETCH_WHOLESALE_PRICES_SUCCESS = 'ECONOMIC/FETCH_WHOLESALE_PRICES/SUCCESS';
const FETCH_WHOLESALE_PRICES_TABULAR_SUCCESS = 'ECONOMIC/FETCH_WHOLESALE_PRICES_TABULAR/SUCCESS';

// RETAIL
const FETCH_RETAIL_REGIONS_SUCCESS = 'ECONOMIC/FETCH_RETAIL_REGIONS/SUCCESS';
const FETCH_RETAIL_PRODUCTS_SUCCESS = 'ECONOMIC/FETCH_RETAIL_PRODUCTS/SUCCESS';
const FETCH_RETAIL_PRICES_SUCCESS = 'ECONOMIC/FETCH_RETAIL_PRICES/SUCCESS';
const FETCH_RETAIL_PRICES_TABULAR_SUCCESS = 'ECONOMIC/FETCH_RETAIL_PRICES_TABULAR/SUCCESS';

// SUPPLY
const FETCH_SUPPLY_PRODUCTS_SUCCESS = 'ECONOMIC/FETCH_SUPPLY_PRODUCTS/SUCCESS';
const FETCH_SUPPLY_TREND_SUCCESS = 'ECONOMIC/FETCH_SUPPLY_TREND/SUCCESS';
const FETCH_SUPPLY_TREND_BYMONTH_SUCCESS = 'ECONOMIC/FETCH_SUPPLY_TREND_BYMONTH/SUCCESS';
const FETCH_VARIETIES_SUCCESS = 'ECONOMIC/FETCH_VARIETIES/SUCCESS';
const FETCH_SUPPLYBYREGION_SUCCESS = 'ECONOMIC/FETCH_SUPPLYBYREGION/SUCCESS';
export const Types = {
  FETCH_REQUEST,
  FETCH_ERROR,

  WHOLESALE: {
    FETCH_MARKETS_SUCCESS: FETCH_WHOLESALE_MARKETS_SUCCESS,
    FETCH_MARKETS: [FETCH_REQUEST, FETCH_WHOLESALE_MARKETS_SUCCESS, FETCH_ERROR],

    FETCH_PRODUCTS_SUCCESS: FETCH_WHOLESALE_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS: [FETCH_REQUEST, FETCH_WHOLESALE_PRODUCTS_SUCCESS, FETCH_ERROR],

    FETCH_PRICES_SUCCESS: FETCH_WHOLESALE_PRICES_SUCCESS,
    FETCH_PRICES: [FETCH_REQUEST, FETCH_WHOLESALE_PRICES_SUCCESS, FETCH_ERROR],

    FETCH_PRICES_TABULAR_SUCCESS: FETCH_WHOLESALE_PRICES_TABULAR_SUCCESS,
    FETCH_PRICES_TABULAR: [FETCH_REQUEST, FETCH_WHOLESALE_PRICES_TABULAR_SUCCESS, FETCH_ERROR]
  },
  RETAIL: {
    FETCH_REGIONS_SUCCESS: FETCH_RETAIL_REGIONS_SUCCESS,
    FETCH_REGIONS: [FETCH_REQUEST, FETCH_RETAIL_REGIONS_SUCCESS, FETCH_ERROR],

    FETCH_PRODUCTS_SUCCESS: FETCH_RETAIL_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS: [FETCH_REQUEST, FETCH_RETAIL_PRODUCTS_SUCCESS, FETCH_ERROR],

    FETCH_PRICES_SUCCESS: FETCH_RETAIL_PRICES_SUCCESS,
    FETCH_PRICES: [FETCH_REQUEST, FETCH_RETAIL_PRICES_SUCCESS, FETCH_ERROR],

    FETCH_PRICES_TABULAR_SUCCESS: FETCH_RETAIL_PRICES_TABULAR_SUCCESS,
    FETCH_PRICES_TABULAR: [FETCH_REQUEST, FETCH_RETAIL_PRICES_TABULAR_SUCCESS, FETCH_ERROR]
  },
  SUPPLY: {
    FETCH_PRODUCTS_SUCCESS: FETCH_SUPPLY_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS: [FETCH_REQUEST, FETCH_SUPPLY_PRODUCTS_SUCCESS, FETCH_ERROR],

    FETCH_TREND_SUCCESS: FETCH_SUPPLY_TREND_SUCCESS,
    FETCH_TREND: [FETCH_REQUEST, FETCH_SUPPLY_TREND_SUCCESS, FETCH_ERROR],

    FETCH_VARIETIES_SUCCESS,
    FETCH_VARIETIES: [FETCH_REQUEST, FETCH_VARIETIES_SUCCESS, FETCH_ERROR],

    FETCH_SUPPLYBYREGION_SUCCESS,
    FETCH_SUPPLYBYREGION: [FETCH_REQUEST, FETCH_SUPPLYBYREGION_SUCCESS, FETCH_ERROR],

    FETCH_TREND_BYMONTH_SUCCESS: FETCH_SUPPLY_TREND_BYMONTH_SUCCESS,
    FETCH_TREND_BYMONTH: [FETCH_REQUEST, FETCH_SUPPLY_TREND_BYMONTH_SUCCESS, FETCH_ERROR]
  }
};

function fetchRequest(type, payload) {
  return { type, payload };
}

function fetchSuccess(type, payload) {
  return { type, payload };
}

function fetchError(type, payload) {
  return { type, payload };
}

function fetch(dispatch, reqsucerr, promise, payload) {
  dispatch(fetchRequest(reqsucerr[0], payload));
  promise
    .then((response) => dispatch(fetchSuccess(reqsucerr[1], response)))
    .catch((error) => dispatch(fetchError(reqsucerr[2], error)));
}

function joinPrices(prices) {
  let tmpMap = {
    keys: [],
    uom: []
  };

  for (let i = 0; i < prices.length; i++) {
    const priceData = prices[i];
    priceData.product_Name = capitalize(priceData.product_Name.toLowerCase());
    const key = priceData.product_Name;
    const uom = capitalize(priceData.product_Unit);
    if (!tmpMap.uom.includes(uom)) {
      tmpMap.uom.push(uom);
    }
    tmpMap.keys.push(key);
    tmpMap = priceData.prices.reduce((mergedData, priceObject) => {
      const curVal = mergedData[priceObject.date] || {};
      curVal[key] = priceObject.value;
      mergedData[priceObject.date] = curVal;
      return mergedData;
    }, tmpMap);
  }

  const res = _.reduce(
    tmpMap,
    (result, value, key) => {
      if (key === 'keys') {
        result.keys = value;
        return result;
      }
      if (key === 'uom') {
        result.uom = value;
        return result;
      }
      result.values.push({ ...value, date: key });
      return result;
    },
    { values: [] }
  );

  res.values.sort((a, b) => moment(a.date, 'YYYY/MM/DD').toDate() - moment(b.date, 'YYYY/MM/DD').toDate());
  return res;
}

String.prototype.hashCode = function () {
  let hash = 0;
  let i;
  let chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const GRAPHCOLOURS = new GraphColors();

const Actions = {
  SUPPLY: {
    fetchTrendByMonth: throttleAction((categoryCode, startDate) => (dispatch) => {
      fetch(
        dispatch,
        Types.SUPPLY.FETCH_TREND_BYMONTH,
        axios.get(`${SERVER}/api/FoodSupplies/AggregatedMonthlyTrend?categoryCode=${categoryCode}&startDate=${dateformat(startDate,'yyyy/mm/dd')}`).then((response) => {
          const graphColors = new GraphColors();

          const trendByMonth = response.data.results.reduce( (res, item) => {
            // populate seriesKeys array
            if (!_.find(res.seriesKeys, o => o.key === item.cod_anio)) {
              res.seriesKeys.push( { key: item.cod_anio, color: graphColors.next() } );
            }

            let curSerieValue = _.find(res.series, o => o.month === item.cod_mes);
            if (!curSerieValue) {
              res.series.push({ month: item.cod_mes, [item.cod_anio]: item.volume });
            } else {
              curSerieValue[item.cod_anio] = item.volume;
            }
            return res;
          }, { seriesKeys: [], series: [] } );

          return { trendByMonth };
        })
      );
    },500, {trailing: false}),
    fetchSupplyByRegion: throttleAction((categoryCode, startDate) => (dispatch, getState) => {
      const oldCategory = _.get(getState(), 'economic.prices.supply.byRegion.filter.category');
      const oldDate = _.get(getState(), 'economic.prices.supply.byRegion.filter.startDate');

      console.log('FETCH', getState(), {categoryCode, startDate}, {oldCategory, oldDate });

      if (_.get(getState(), 'economic.prices.supply.byRegion.filter.category') === categoryCode
      && _.get(getState(), 'economic.prices.supply.byRegion.filter.startDate') === startDate) {
        console.log('FETCH: NOTHING TO BE DONE');
        return;
      }
      fetch(
        dispatch,
        Types.SUPPLY.FETCH_SUPPLYBYREGION,
        axios.get(`${SERVER}/api/FoodSupplies/VolumeByProductCategory?categoryCode=${categoryCode}&startDate=${dateformat(startDate,'yyyy/mm/dd')}`).then((response) => ({
          supply: response.data.results.map(o => { o.color = GRAPHCOLOURS.next(o.dsc_ubigeo); return o; }),
          filter: {category: categoryCode, startDate: startDate}
        }))
      );
    }, 500, {trailing: false}),
    fetchProducts: throttleAction(() => (dispatch) => {
      fetch(
        dispatch,
        Types.SUPPLY.FETCH_PRODUCTS,
        axios.get(`${SERVER}/api/FoodSupplies/AvailableProducts`).then((response) => ({
          products: response.data.results.map(product => {
            product.product_name = capitalize(product.product_name.toLowerCase());
            product.category_name = capitalize(product.category_name.toLowerCase());
            return product
          })
        }))
      );
    },500, {trailing: false}),
    fetchVarieties: throttleAction((categoryCode, startDate) => (dispatch) => {
      const graphColors = new GraphColors();
      fetch(
        dispatch,
        Types.SUPPLY.FETCH_VARIETIES,
        axios
          .get(
            `${SERVER}/api/FoodSupplies/ByVarieties?categoryCode=${categoryCode}&startDate=${dateformat(
              startDate,
              'yyyy/mm/dd'
            )}`
          )
          .then((response) => ({
            varieties: response.data.results.reduce((res, item) => {
              const variety = _.find(res, (o) => o.name === item.txt_dscvariedad);
              if (!variety) {
                res.push({ name: item.txt_dscvariedad, volume: item.volume, color: graphColors.next() });
              } else {
                variety.volume += item.volume;
              }
              return res;
            }, [])
          }))
      );
    },500, {trailing: false}),
    fetchTrend: throttleAction((productCode, startDate) => (dispatch) => {
      fetch(
        dispatch,
        Types.SUPPLY.FETCH_TREND,
        axios
          .get(
            `${SERVER}/api/FoodSupplies/TrendByProductCategory?productCode=${productCode}&startDate=${dateformat(
              startDate,
              'yyyy/mm/dd'
            )}`
          )
          .then((response) => ({
            trend: response.data.results.reduce((res, item) => {
              // const serie = res[item.dsc_ubigeo] || { data:[] };
              let serie = _.find(res, (o) => o.name === item.dsc_ubigeo);
              if (!serie) {
                serie = { name: item.dsc_ubigeo, data: [], color: GRAPHCOLOURS.next(item.dsc_ubigeo) };
                res.push(serie);
              }
              item.date = moment()
                .year(item.cod_anio)
                .month(item.cod_mes - 1)
                .date(1)
                .millisecond(0)
                .format('x');
              serie.data.push(item);
              return res;
            }, [])
          }))
      );
    },500, {trailing: false}),
  },
  RETAIL: {
    resetState: () => resetState(STATE_ROOT, INITIAL_STATE),
    fetchRegions: () => (dispatch) =>
      fetch(
        dispatch,
        Types.RETAIL.FETCH_REGIONS,
        axios.get(`${SERVER}/api/Regions/GetAdmin1`).then((response) => response.data.map(region => { region.dsc_ubigeo = capitalize(region.dsc_ubigeo.toLowerCase()); return region;}))
      ),
    fetchProducts: (regionCode) => (dispatch) => {
      fetch(
        dispatch,
        Types.RETAIL.FETCH_PRODUCTS,
        axios.get(`${SERVER}/api/Products/ByRegions?regionCodes=${regionCode}`).then((response) => ({
          region: regionCode,
          products: response.data.results.map((product) => {
            product.region_code = regionCode;
            product.product_name = capitalize(product.product_name.toLowerCase());
            return product;
          })
        }))
      );
    },
    fetchPrices: (regionCode, productCodes, startDate, endDate) => (
      dispatch,
      getState
    ) => {
      const graphColors = new GraphColors();

      fetch(
        dispatch,
        Types.RETAIL.FETCH_PRICES,
        axios
          .get(
            `${SERVER}/api/Prices/ByRegionsAndProducts?regionCodes=${regionCode}&productCodes=${productCodes.join()}&startDate=${dateformat(
              startDate,
              'yyyy/mm/dd'
            )}&endDate=${dateformat(endDate, 'yyyy/mm/dd')}`
          )
          .then((response) => {
            const prices = joinPrices(response.data.results);

            const line_colors = prices.keys
              && prices.keys.reduce((colors, productName) => {
                colors[productName.hashCode()] = graphColors.next();
                return colors;
              }, {});
            return {
              region: regionCode,
              products: productCodes,
              //category: { category_code, category_name, group_code },
              startDate,
              endDate,
              prices,
              colors: line_colors
            };
          })
      );
    },
    fetchPricesTable: (regionCode, productsCodes, startDate, endDate) => (dispatch, getState) => {
      fetch(
        dispatch,
        Types.RETAIL.FETCH_PRICES_TABULAR,
        axios
          .get(
            `${SERVER}/api/Prices/ByRegionsAndProducts?regionCodes=${regionCode}&productCodes=${productsCodes.join()}&startDate=${dateformat(
              startDate,
              'yyyy/mm/dd'
            )}&endDate=${dateformat(endDate, 'yyyy/mm/dd')}`
          )
          .then((response) => {
            const products = response.data.results;
            let columns = [];
            const table_data = products.map((product) => {
              const table_data_row = product.prices.reduce((result, data) => {
                result[data.date] = Number(data.value).toFixed(2);
                columns.push(data.date);
                return result;
              }, {});
              table_data_row.product_name = capitalize(product.product_Name.toLowerCase());
              return table_data_row;
            });

            columns.sort((a, b) => moment(a, 'YYYY/MM/DD').toDate() - moment(b, 'YYYY/MM/DD').toDate());
            columns = ['product_name', ...new Set(columns)];

            return {
              table_data,
              table_columns: columns
            };
          })
      );
    }
  },

  WHOLESALES: {
    resetState: () => resetState(STATE_ROOT, INITIAL_STATE),
    fetchMarkets: () => (dispatch) => {
      fetch(
        dispatch,
        Types.WHOLESALE.FETCH_MARKETS,
        axios.get(`${SERVER}/api/Markets/Wholesale`).then((response) => response.data.map(item => { item.market_name = capitalize(item.market_name.toLowerCase(), true, true, word=>word.length>3); return item;}))
      );
    },
    fetchProducts: (marketCode) => (dispatch) => {
      fetch(
        dispatch,
        Types.WHOLESALE.FETCH_PRODUCTS,
        axios.get(`${SERVER}/api/Products/ByMarkets?marketCodes=${marketCode}`).then((response) => ({
          market: marketCode,
          products: response.data.results.map((product) => {
            product.market_code = marketCode;
            product.product_name = capitalize(product.product_name.toLowerCase());
            return product;
          })
        }))
      );
    },
    fetchPrices2: throttleAction((market_code, products_codes, startDate, endDate) => (dispatch, getState) => {
      const graphColors = new GraphColors();

      const url = configuration.is(DEVELOPMENT)
        ? `${SERVER}/api/Prices/ByMarketsAndProducts?marketCodes=15013406&productCodes=040102,040103&startDate=${dateformat(startDate, 'yyyy/mm/dd')}&endDate=${dateformat(endDate, 'yyyy/mm/dd')}`
        : `${SERVER}/api/Prices/ByMarketsAndProducts?marketCodes=${market_code}&productCodes=${products_codes.join()}&startDate=${dateformat(startDate, 'yyyy/mm/dd')}&endDate=${dateformat(endDate, 'yyyy/mm/dd')}`;

      // FIXME: delete the below line and uncomment the other one when the real data will be available
      fetch(
        dispatch,
        Types.WHOLESALE.FETCH_PRICES,
        axios
          .get(url)
          .then((response) => {
            const prices = joinPrices(response.data.results);

            const line_colors = prices.keys
              && prices.keys.reduce((colors, productName) => {
                colors[productName.hashCode()] = graphColors.next();
                return colors;
              }, {});
            return {
              market: market_code,
              products: products_codes,
              //category: { category_code, group_code },
              prices,
              colors: line_colors
            };
          })
      );
    }, 500, {trailing: false}),
    fetchPricesTable2: (marketCode, productsCodes, startDate, endDate) => (dispatch, getState) => {
      const url = configuration.is(DEVELOPMENT)
        ? `${SERVER}/api/Prices/ByMarketsAndProducts?marketCodes=15013406&productCodes=040102,040103&startDate=${dateformat(startDate, 'yyyy/mm/dd')}&endDate=${dateformat(endDate, 'yyyy/mm/dd')}`
        : `${SERVER}/api/Prices/ByMarketsAndProducts?marketCodes=${marketCode}&productCodes=${productsCodes.join()}&startDate=${dateformat(startDate, 'yyyy/mm/dd')}&endDate=${dateformat(endDate, 'yyyy/mm/dd')}`;
      fetch(
        dispatch,
        Types.WHOLESALE.FETCH_PRICES_TABULAR,
        axios
          .get(url)
          .then((response) => {
            const products = response.data.results;
            let columns = [];
            const table_data = products.map((product) => {
              const table_data_row = product.prices.reduce((result, data) => {
                result[data.date] = Number(data.value).toFixed(2);
                columns.push(data.date);
                return result;
              }, {});
              table_data_row.product_name = capitalize(product.product_Name.toLowerCase());
              return table_data_row;
            });

            columns.sort((a, b) => moment(a, 'YYYY/MM/DD').toDate() - moment(b, 'YYYY/MM/DD').toDate());
            columns = ['product_name', ...new Set(columns)];

            return {
              table_data,
              table_columns: columns
            };
          })
      );
    },
  }
};

export { Actions };