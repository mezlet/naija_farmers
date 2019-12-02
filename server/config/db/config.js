import 'dotenv/config';

export default (nodeEnv) => {
  switch (nodeEnv) {
    case 'development': {
      return {
        databaseUrl: process.env.DATABASE_URL_DEV,
      };
    }
    case 'test': {
      return {
        databseUrl: process.env.DATABASE_URL_TEST,
      };
    }
    default: {
      return {
        databaseUrl: process.env.DATABASE_URL_PROD,
      };
    }
  }
};