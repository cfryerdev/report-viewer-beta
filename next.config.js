const isProd = process.env.ENVIRONMENT === "production";
let withImages = require("next-images");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ENABLE_ANALYZER === 'true',
});

let nextConfigurationOptions = {
  useFileSystemPublicRoutes: isProd ? false : true,
  assetPrefix: isProd ? "" : "",
  inlineImageLimit: 6384,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000 * 1000,
    pagesBufferLength: 50
  },
  future: {
    webpack5: true
  }
};

let exportsObject = withImages(nextConfigurationOptions);
if (!isProd) {
  exportsObject = withBundleAnalyzer(exportsObject);
}

module.exports = exportsObject;
