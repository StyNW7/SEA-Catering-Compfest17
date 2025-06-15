Generate Session Secret Key:
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"