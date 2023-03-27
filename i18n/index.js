const en = require('./en');
const ptBR = require('./pt-BR');
const _get = require('lodash/get');
 

/**
 * Object with the languages available.
 */
const languages = {
  en: en,
  'pt-BR': ptBR,
 
};

/**
 * Replaces the parameters of a message with the args.
 */
function format(message, args) {
  if (!message) {
    return null;
  }

  return message.replace(
    /{(\d+)}/g,
    function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    },
  );
}

/**
 * Checks if the key exists on the language.
 */
const i18nExists = (languageCode, key) => {
  const dictionary =
    languages[languageCode] || languages['en'];
  const message = _get(dictionary, key);
  return Boolean(message);
};

/**
 * Returns the translation based on the key.
 */
const i18n = (languageCode, key, ...args) => {
  const dictionary =
    languages[languageCode] || languages['en'];
  const message = _get(dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
};

module.exports = {
  i18nExists,
  i18n
}