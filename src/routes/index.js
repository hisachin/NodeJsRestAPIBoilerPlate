const apiRoute = require('./version');

import {
    globalErrorHandler,
    notFoundErrorHandler
}
from 'utils';

const init = (server) => {
    //route all the request to /api 
    server.get('*', (req, res, next) => {
        return next();
    });

    //router all the request
    server.use('/api',apiRoute);

    //manage global not found error handling
    server.use(notFoundErrorHandler);

    //manage global error handling
    server.use(globalErrorHandler);

}
module.exports = {
    init: init
};