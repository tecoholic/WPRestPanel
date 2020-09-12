const mongoose = require('mongoose');

const Site = mongoose.model('site');

class SiteController {

  static getByHostName(hostName) {
    return Site.findOne({
      host_name: hostName
    }).lean();
  }

  static add({ hostName, isWpSite }) {
    return Site.findOneAndUpdate({
      host_name: hostName
    }, {
      updated_at: new Date(),
      is_wp_site: isWpSite,
      $setOnInsert: {
        created_at: new Date()
      }
    }, {
      upsert: true
    }).lean();
  }

}

module.exports = SiteController;
