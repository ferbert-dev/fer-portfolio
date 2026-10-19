export type ThemeMode = 'auto' | 'light' | 'dark';
export const THEME_KEY = 'ferbert-theme';

/** Runs in <head> before first paint so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:'auto')}catch(e){document.documentElement.setAttribute('data-theme','auto')}})()`;
