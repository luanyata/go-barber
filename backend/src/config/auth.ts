export default {
  jwt: {
    secret: process.env.APP_SECRET || 'ofjsdflkjsdflsdkfjsdlfkj',
    expiresIn: '1d',
  },
};
