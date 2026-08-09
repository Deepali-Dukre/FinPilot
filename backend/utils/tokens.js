const jwt = require('jsonwebtoken');

const signAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  });

const signRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  });

const baseCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};

const accessCookieOptions = { ...baseCookieOptions, maxAge: 15 * 60 * 1000 };
const refreshCookieOptions = { ...baseCookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 };

module.exports = {
  signAccessToken,
  signRefreshToken,
  accessCookieOptions,
  refreshCookieOptions,
};
