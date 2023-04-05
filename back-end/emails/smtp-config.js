const config = require('../config')

module.exports = {
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: false,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2"
    }
};
