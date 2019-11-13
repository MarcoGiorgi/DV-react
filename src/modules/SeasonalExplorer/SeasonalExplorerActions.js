import axios from 'axios';

const SERVER = 'https://dataviz.vam.wfp.org';
const COUNTRY_CODE = 195;

export const Types = {
  FETCH_DATA: 'SEASONAL/FETCH_DATA',
  SAVE_DATA: 'SEASONAL/SAVE_DATA',
  VISUALIZATIONS_CHANGE_YEAR: 'SEASONAL/VISUALIZATIONS/CHANGEYEAR',
  VISUALIZATIONS_CHANGE_COVERAGEID: 'SEASONAL/VISUALIZATIONS/CHANGECOVERAGEID',
  VISUALIZATIONS_TOGGLE_MODAL: 'SEASONAL/VISUALIZATIONS/TOGGLEMODAL',
  VISUALIZATIONS_SELECT_ADMIN1: 'SEASONAL/VISUALIZATIONS/SELECTADMIN1',
  VISUALIZATIONS_SELECT_ADMIN2: 'SEASONAL/VISUALIZATIONS/SELECTADMIN2',
  VISUALIZATIONS_RESET_PAGE: 'SEASONAL/VISUALIZATIONS/RESET'
};

export const Actions = {
  fetchData: (year, coverageId) => (dispatch) => {
    axios.get(`${SERVER}API/GetAgroClimaticData?ac=${COUNTRY_CODE}&y=${year}&dc=${coverageId}`).then((response) => {
      dispatch(Actions.saveDataIntoState(response.data));
    });
  },
  saveDataIntoState: (data) => ({
    type: Types.SAVE_DATA,
    payload: data
  }),
  changeYear: (newYear) => ({
    type: Types.VISUALIZATIONS_CHANGE_YEAR,
    payload: newYear
  }),
  resetPage: () => ({
    type: Types.VISUALIZATIONS_RESET_PAGE
  }),
  changeCoverageID: (newCoverageID) => ({
    type: Types.VISUALIZATIONS_CHANGE_COVERAGEID,
    payload: newCoverageID
  }),
  selectAdmin1: (newAdmin1) =>
    // fetch the admin2s
    (dispatch) => {
      const admin2 = {};
      axios
        .get(`https://dataviz.vam.wfp.org//API/GetGeoAdmins?adm0=${COUNTRY_CODE}&admcode=${newAdmin1.code}`)
        .then((response) => {
          admin2.geodata = response.data;
          // response.data
          return axios.get(`https://dataviz.vam.wfp.org//api/getadmins?al=${2}&ac=${newAdmin1.code}`);
        })
        .then((response) => {
          admin2.admins = response.data;
          dispatch({
            type: Types.VISUALIZATIONS_SELECT_ADMIN1,
            payload: {
              admin1: newAdmin1,
              admin2
            }
          });
        });
    },
  selectAdmin2: (newAdmin2) => ({
    type: Types.VISUALIZATIONS_SELECT_ADMIN2,
    payload: newAdmin2
  }),
  toggleModal: (modalName) => ({
    type: Types.VISUALIZATIONS_TOGGLE_MODAL,
    payload: modalName
  })
};
