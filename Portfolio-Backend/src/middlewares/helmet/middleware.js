const helmet = require('helmet');
const middleware = require('express')();

middleware.use(helmet());

middleware.use(helmet.xssFilter());

middleware.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-cdn.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    }
    
}));

module.exports = middleware;