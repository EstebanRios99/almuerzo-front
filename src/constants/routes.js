/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  USERS: '/usuarios',
  USERS_ID: `/usuario/:id`,
  HOME: '/',
  ABOUT: '/acerca-de',
  ANTD: '/antd',
  PROFILE: '/perfil',
};

const privateRoutes = {
  LOGOUT: '/logout',
  PRIVATE: '/privada',
  REGISTERS: '/registros',
  REGISTER: '/registro_usuario',
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;