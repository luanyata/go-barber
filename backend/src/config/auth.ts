export default {
  jwt: {
    secret: process.env.APP_SECRET || 'defualt',
    expiresIn: '1d',
  },
};
