const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`.cyan);
    next();
};

module.exports = logger;