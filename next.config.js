module.exports = {
  env: {
    API_URL: process.env.API_URL
  },
  images: {
    domains: ['deploy.cloud.run', 'vercel.com', 'www.herokucdn.com']
  },
  experimental: {
    concurrentFeatures: true
  }
};
