import axios from "axios";

const locales = {
  es: {
    short: "es",
    long: "es-ES",
    label: "Spanish",
  }, 
  sv: {
    short: "sv",
    long: "sv-SE",
    label: "Swedish",
  }, 
  ja: {
    short: "ja",
    long: "ja-JP",
    label: "Japanese",
  }, 
  en: {
    short: "en",
    long: "en-US",
    label: "English",
  },
  de: {
    short: "de",
    long: "de-DE",
    label: "German",
  }, 
  fr: {
    short: "fr",
    long: "fr-FR",
    label: "French",
  },
  it: {
    short: "it",
    long: "it-IT",
    label: "Italian",
  }, 
  nl: {
    short: "nl",
    long: "nl-NL",
    label: "Dutch",
  }, 
  pt: {
    short: "pt",
    long: "pt-BR",
    label: "Brazilian Portuguese",
  }, 
  ru: {
    short: "ru",
    long: "ru-RU",
    label: "Russian",
  }, 
  "zh-CN": {
    short: "zh-CN",
    long: "zh-CN",
    label: "Simplified Chinese",
  }, 
  "zh-TW": {
    short: "zh-TW",
    long: "zh-TW",
    label: "Traditional Chinese",
  },
  pl: {
    short: "pl",
    long: "pl-PL",
    label: "Polish",
    translatedLabel: "Common.Polish"
  }, 
  tr: {
    short: "tr",
    long: "tr-TR",
    label: "Turkish",
  }, 
  ko: {
    short: "ko",
    long: "ko-KR",
    label: "Korean",
  }
};

async function qlikTranslationLoad(lang, context, staticResourcePath) {
  const loc = locales[lang];
  const l = (loc && loc.long) || "en-US";
  //const url = window.requirejs.toUrl(`translations/${context}/${l}.json`);
  const url = `${staticResourcePath}translations/${context}/${l}.json`;
  const resp  = await axios.get(url, {
    responseType: 'json',
    withCredentials: true,
  });

  return resp.data;
}

export default async function loadQlikTranslations(lang, staticResourcePath) {
  let client;
  let common;
  let translations = {};

  try {
    if (Promise.all) {
      let [data1, data2] = await Promise.all([qlikTranslationLoad(lang, 'client', staticResourcePath), qlikTranslationLoad(lang, 'common', staticResourcePath)]);
      client = data1;
      common = data2;
    } else {
      client = await qlikTranslationLoad(lang, 'client', staticResourcePath);
      common = await qlikTranslationLoad(lang, 'common', staticResourcePath);  
    }

    translations.client = client;
    translations.common = common;
  } catch(e) {
    console.error(e);
  } 

  return {
    get: (context, id) => {
      return (translations[context] || {})[id];
    }
  }
}