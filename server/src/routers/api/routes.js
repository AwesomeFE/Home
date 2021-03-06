import * as middlewares from './middlewares';
import * as UserRouters from './UserRoutes';
import * as CountryRoutes from './CountryRoutes';

export default [
  { path: '/user/signin', method: 'post', ...UserRouters.signin },
  middlewares.GetLoginUser,
  { path: '/user/signout', method: 'get', ...UserRouters.signout },
  { path: '/user/session', method: 'get', ...UserRouters.getSessionUser },
  { path: '/country', method: 'get', ...CountryRoutes.getAllCountries },
  middlewares.EnsureLogin,
  middlewares.AuthCheck,
  { path: '/country', method: 'post', ...CountryRoutes.createCountry },
  { path: '/country/:countryId', method: 'get', ...CountryRoutes.getCountryDetail },
  { path: '/country/:countryId', method: 'post', ...CountryRoutes.editCountry },
  { path: '/country/:countryId/publish', method: 'get', ...CountryRoutes.publishCountry },
  { path: '/country/:countryId/unpublish', method: 'get', ...CountryRoutes.unpublishCountry },
];
