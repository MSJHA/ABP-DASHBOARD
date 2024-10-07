const jwt = require('jsonwebtoken');
const secretKey = 'w32tt3e3e11';


const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
