export const STATE_ROOT = 'economic';

export const INITIAL_STATE = {
  [STATE_ROOT]: {
    prices: {
      wholesale: {
        loading: false,
        error: null,
        filter: {
          market: null,
          category: null
        },
      },
      retail: {
        regions: null,
        products: null,
        filter: {}
      },
      supply: {
        trendByMonth: {}
      },
      loading: []
    }
  }
};
