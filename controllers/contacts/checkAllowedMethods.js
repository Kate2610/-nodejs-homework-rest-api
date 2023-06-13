const checkAllowedMethods = async (req, res, next) => {
    const allowedMethods = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'];
    const { method } = req;
    if (!allowedMethods.includes(method.toUpperCase())) {
      return res.status(400).json({ message: `method ${method} is not allowed` });
    }
    next();
  };
  
  module.exports = checkAllowedMethods;