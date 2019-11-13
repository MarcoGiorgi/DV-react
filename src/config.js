export const DEVELOPMENT = 'DEVELOPMENT';
export const PRODUCTION = 'PRODUCTION';
const environment = PRODUCTION;

const config = {
  [DEVELOPMENT]: {
        API_SERVER: 'http://winappdes.minagri.gob.pe/SISAP_API', /* example: https://api-sisap.brains.engineering */
        //API_SERVER: 'https://api-sisap.brains.engineering',
    WFP_SERVER: 'https://dataviz.vam.wfp.org'
  },
  [PRODUCTION]: {
      API_SERVER: 'http://winappdes.minagri.gob.pe/SISAP_API',
      //API_SERVER: 'https://api-sisap.brains.engineering',
    WFP_SERVER: 'https://dataviz.vam.wfp.org'
  },
  'shared': {
    LANG: 'es',
    LINE_CHART: {
      AXIS: {
        Y: {
          TICK_COUNT: 6
        }
      }
    }
  }
};

export const is = (env) => env === environment;
export const getInstance = () => ({ ...config.shared ,...config[environment], getApiServer, getWfpServer, getLang, setLang });
export const getApiServer = () => getInstance().API_SERVER;
export const getWfpServer = () => getInstance().WFP_SERVER;
export const getLang = () => getInstance().LANG;
export const setLang = (newLang) => { getInstance().LANG = newLang; }

export default ({ is, getInstance });