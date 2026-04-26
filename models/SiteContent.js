const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // 'hero', 'services', 'dental', 'skincare', 'about', 'contactinfo'

  // Hero
  heroTitleBn: { type: String },
  heroTitleEn: { type: String },
  heroDescBn: { type: String },
  heroDescEn: { type: String },
  heroImage1: { type: String },
  heroImage2: { type: String },

  // Services
  dentalServicesBn: [{ name: String, icon: String }],
  dentalServicesEn: [{ name: String, icon: String }],
  skinServicesBn:   [{ name: String, icon: String }],
  skinServicesEn:   [{ name: String, icon: String }],
  servicesImage1: { type: String },
  servicesImage2: { type: String },

  // Dental Care
  dentalTitleBn: { type: String },
  dentalTitleEn: { type: String },
  dentalDescBn:  { type: String },
  dentalDescEn:  { type: String },
  dentalImage:   { type: String },
  dentalFeaturesBn: [{ icon: String, text: String }],
  dentalFeaturesEn: [{ icon: String, text: String }],

  // Skin Care
  skinTitleBn: { type: String },
  skinTitleEn: { type: String },
  skinDescBn:  { type: String },
  skinDescEn:  { type: String },
  skinImage:   { type: String },
  skinFeaturesBn: [{ icon: String, text: String }],
  skinFeaturesEn: [{ icon: String, text: String }],

  // About
  aboutTitleBn: { type: String },
  aboutTitleEn: { type: String },
  aboutDescBn:  { type: String },
  aboutDescEn:  { type: String },
  aboutImage:   { type: String },
  aboutStat1Label: { type: String },
  aboutStat1Value: { type: String },
  aboutStat2Label: { type: String },
  aboutStat2Value: { type: String },
  aboutStat3Label: { type: String },
  aboutStat3Value: { type: String },

  // Contact Info
  phone:    { type: String },
  address:  { type: String },
  whatsapp: { type: String },
  mapLink:  { type: String },

}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);