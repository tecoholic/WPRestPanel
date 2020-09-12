const router = require('express').Router();

const networkUtils = require('../utils/network-utils');
const wpUtils = require('../utils/wp-utils');

async function onboard(req, res) {
  const { site_url: siteUrl } = req.body;
  if (!siteUrl) {
    return res.status(400).send({
      msg: 'Invalid site_url'
    });
  }

  const html = await networkUtils.getPage(siteUrl);

  return res.status(200).send({
    is_wp_site: wpUtils.isWpSite(html)
  });

}

router.post('/', onboard);

module.exports = router;
