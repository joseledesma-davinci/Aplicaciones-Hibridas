import userRouter from './userRouter.js'
import subjectRouter from './subjectRouter.js'

const routerAPI = ( app ) => {
    app.use('/api/users', userRouter);
    app.use('/api/subjects', subjectRouter);
}

export default routerAPI;