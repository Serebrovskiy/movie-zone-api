const {
  JWT_SECRET = 'JWT_SECRET',
  NODE_ENV,
  MONGODB = 'mongodb://localhost:27017/movie-zone-db',
} = process.env;

module.exports = {
  JWT_SECRET, NODE_ENV, MONGODB,
};
