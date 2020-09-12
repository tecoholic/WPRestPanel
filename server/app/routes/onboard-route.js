const _ = require('lodash');
const router = require('express').Router();

const siteController = require('../controller/site-controller');

const networkUtils = require('../utils/network-utils');
const wpUtils = require('../utils/wp-utils');

async function onboard(req, res) {
  const { site_url: siteUrl } = req.body;
  if (!siteUrl) {
    return res.status(400).send({
      msg: 'Invalid site_url'
    });
  }

  const hostName = networkUtils.getHostName(siteUrl);
  const site = await siteController.getByHostName(hostName);
  if (site) {
    return res.status(200).send({
      site_url: siteUrl,
      ..._.pick(site, ['host_name', 'updated_at', 'is_wp_site'])
    });
  }

  const html = await networkUtils.getPage(siteUrl);
  const newSite = await siteController.add({
    hostName,
    isWpSite: wpUtils.isWpSite(html)
  });
  return res.status(200).send({
    site_url: siteUrl,
    ..._.pick(newSite, ['host_name', 'updated_at', 'is_wp_site'])
  });

}

router.post('/', onboard);

module.exports = router;
