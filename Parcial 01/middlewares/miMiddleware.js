const miMiddleware = ( req, red, next ) => {
    console.log('Hola desde el middlware');
    next();
}

export default miMiddleware;