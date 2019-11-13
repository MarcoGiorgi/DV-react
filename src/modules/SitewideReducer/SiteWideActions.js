export const RESET_STATE = 'RESET_STATE';
export const CHANGE_LANG = 'CHANGE_LANG';

export const resetState = (key, initialState) => ({ type: RESET_STATE, payload: { key, initialState } });
export const changeLang = newLang => ( { type: CHANGE_LANG, payload: newLang } );

export const Actions = {
  resetState,
  changeLang
};