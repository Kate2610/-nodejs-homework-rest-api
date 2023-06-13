const UserModel = require('./schemas/users');

/***
 * function register
 * Add user and return new user
 *
 * @param body {
 * {email} required - user email,
 * {password} required - contact phone,
 * }
 *
 * @return user = {_id,email,subscription,password,token}
 */
const register = async body => {
  try {
    const newUser = await UserModel.create(body);

    return newUser;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function getUserByEmail
 * Get user by email
 *
 * @param
 * {email} required - user email,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const getUserByEmail = async email => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function getUserById
 * Get user by id
 *
 * @param
 * {id} required - user _id,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const getUserById = async id => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function setToken
 * set user token
 *
 * @param
 * {id} required - user _id,
 * {token} required - user _id,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const setToken = async (id, token) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { token }, { new: true });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

/***
 * function setSubscription
 * set user subscription
 *
 * @param
 * {id} required - user _id,
 * {sybscription} required - user subscriptiongit co,
 *
 * @return user = {_id,email,subscription,password,token}
 */
const setSubscription = async (id, subscription) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, { subscription }, { new: true });
    return user;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

const usersService = {
  getUserByEmail,
  register,
  getUserById,
  setToken,
  setSubscription,
};

module.exports = usersService;