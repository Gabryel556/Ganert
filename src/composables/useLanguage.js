import { ref } from 'vue';
import languages from '../data/languages.json';

const currentLang = ref(localStorage.getItem('siteLang') || 'pt');

export function useLanguage() {
  const setLanguage = (lang) => {
    currentLang.value = lang;
    localStorage.setItem('siteLang', lang);
  };

  const getText = (key) => {
    return languages[currentLang.value][key] || key;
  };

  const getData = (key) => {
    return languages[currentLang.value][key];
  };

  return {
    currentLang,
    setLanguage,
    getText,
    getData
  };
}