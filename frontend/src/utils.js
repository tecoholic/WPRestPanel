/**
 * Normalize the input URL. Strip everything except protocol and hostname.
 * Add protocol if not present
 *  
 * @param {string} url url that needs to be normalized
 */
export function normalizeURL(url) {
  const httpReg = new RegExp(/https?:\/\/.+..+/);
  let uri = new URL(url.match(httpReg) ? url : 'https://'+url);
  return `${uri.protocol}//${uri.hostname}`;
}