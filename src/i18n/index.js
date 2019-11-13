import en from './en';
import es from './es';
import config from '../config';


const DEVELOPMENT = true;

function strings(lang = config.getInstance().getLang()) {
  const userLang = lang;

  if (es.is(userLang)) {
    return es;
  }
  return en;
}

function t(key, { defaultValue, lang } = {}) {

  let val = strings(lang)[key];

  if (val) {
    console.info('I18N', {key, lang, val});
    return val;
  }

  if (!val) {
    val = en[key];
  }

  return `${val || (defaultValue || key)} ${DEVELOPMENT ? '(!)' : ''}`;
}

export default t;
