const publicRoutes = {
    LOGIN: '/ingreso',
    HOME: '/',
};

const privateRoutes = {
    LOGOUT: '/logout',
    REGISTERS: '/registros',
    REGISTER_EMPLOY: '/registros/:identification'
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes
};

export default Routes;