const login = require('./login');
const register = require('./register');
const logout = require('./logout');
const current = require('./current');
const setSubscription = require('./setSubscription');
const setAvatar = require('./setAvatar');
const sendVerificationEmail = require('./sendVerificationEmail');

module.exports = { login, register, logout, current, setSubscription, setAvatar, sendVerificationEmail};