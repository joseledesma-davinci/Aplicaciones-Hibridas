import usuarioRouter from './usuarioRouter.js'
import refugioRouter from './refugioRouter.js'
// import mascotaRouter from './mascotaRouter.js'

const routerAPI = ( app ) => {
    app.use('/api/usuarios', usuarioRouter);
    app.use('/api/refugios', refugioRouter);
    // app.use('/api/mascotas', mascotaRouter);
}

export default routerAPI;