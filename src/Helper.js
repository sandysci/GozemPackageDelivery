'use strict';

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
/***
 * the success response in json format
 * @param res
 * @param data
 * @param code
 * @returns {*}
 */
global.successResponse = (res, data, code = 200) => {
    return res.status(code).send({data});
};
/***
 * returns the success response in text format
 * @param res
 * @param data
 * @param code
 * @returns {*}
 */
global.successResponseText = (res, data, code = 200) => {
    return res.set('content-type', 'text/plain').status(code).send(data);
};

/***
 * return the error response in json format
 * @param res
 * @param data
 * @param code
 * @returns {*}
 */

global.errorResponse = (res, error = "Oops. An Error Occurred", code = 500) => {
    return res.status(code).send({
        error: error
    });
};

global.setCache = (key, val ,ttl = 40000000) => {
   return  myCache.set( key, val,  ttl  )

};

global.getCache = (key) => {
   return myCache.get( key )

};


