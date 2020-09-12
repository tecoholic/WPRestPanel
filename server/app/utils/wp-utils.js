function isWpSite(html) {
  if (!html) {
    return false;
  }

  return html.includes('wp-admin') || html.includes('wp-content');
}

module.exports = {
  isWpSite
};
