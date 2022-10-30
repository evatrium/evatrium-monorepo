/**
 * converts an object into url search params
 * @param obj
 */
export const stringifyParams = (obj: Record<string, any>) => {
	// const params = new URLSearchParams({});
	// for (let key in obj) params.append(key, encodeURIComponent(obj[key]));
	// return params.toString();
	return new URLSearchParams(obj).toString();
};

/* // old version
export const stringifyParams = (obj) => {
  var enc = encodeURIComponent, k, i, tmp, str = "";
  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += "&");
          str += enc(k) + "=" + enc(tmp[i]);
        }
      } else {
        str && (str += "&");
        str += enc(k) + "=" + enc(tmp);
      }
    }
  }
  return str;
};
*/
