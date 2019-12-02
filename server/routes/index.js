import authRoute from './auth';

const routes = (app) => {
  app.use('/api/v1/auth', authRoute);
};
export default routes;
