import * as middlewares from './middlewares';
import * as UserRouters from './UserRoutes';
import * as CountryRoutes from './CountryRoutes';

export default [
  { path: '/signin', method: 'post', ...UserRouters.signin },
  middlewares.GetLoginUser,
  { path: '/signout', method: 'post', ...UserRouters.signout },
  { path: '/country', method: 'get', ...CountryRoutes.getAllCountries },
  middlewares.AuthCheck,
  { path: '/country', method: 'post', ...CountryRoutes.createCountry },
  { path: '/country/:countryId', method: 'get', ...CountryRoutes.getCountryDetail }
];