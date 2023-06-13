const { httpError } = require('../../helpers');
const { usersService } = require('../../service');

const setSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  console.log(subscription);
  try {
    const { email, subscription: newSubscription } = await usersService.setSubscription(
      _id,
      subscription
    );
    res.status(200).json({ user: { email, subscription: newSubscription } });
  } catch (e) {
    next(httpError(500, e.message));
  }
};

module.exports = setSubscription;