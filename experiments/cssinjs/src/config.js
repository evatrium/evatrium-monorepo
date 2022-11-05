export const BUILD_IS_PRERENDERING = navigator.userAgent === "ReactSnap";
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = process.env.NODE_ENV === 'development';