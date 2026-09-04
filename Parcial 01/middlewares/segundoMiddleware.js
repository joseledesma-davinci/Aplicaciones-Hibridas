const segundoMiddleware = ( req, red, next ) => {
    console.log('Hola soy  el segundo');
    next();
}

export default segundoMiddleware;