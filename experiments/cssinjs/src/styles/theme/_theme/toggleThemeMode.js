import {DARK_THEME_ATTRIBUTE} from "../globalStyles";

export const toggleThemeMode = () => {
    document.querySelector('html').toggleAttribute(DARK_THEME_ATTRIBUTE)
}