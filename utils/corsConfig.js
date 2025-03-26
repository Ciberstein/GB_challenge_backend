const corsConfig = {
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie']
};

module.exports = { corsConfig };