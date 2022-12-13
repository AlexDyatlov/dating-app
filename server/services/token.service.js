const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: '1h'
    });

    const refreshToken = jwt.sign(payload, refreshSecret);

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600
    };
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user });

    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = await Token.create({ user, refreshToken });
    return token;
  }
}

module.exports = new TokenService();