
// const jwt = require('jsonwebtoken');
// const secretKey = 'w32tt3e3e11';


// function auth(req, res, next) {
  
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
  
//   if (token == null) {
//     return res.status(401).json({message: "Unauthorized user "});
//   }

//   jwt.verify(token, secretKey, (err, user) => {
    
//     if (err) {
//     return res.status(403).json({message: "Forbidden Path "});
//     }
    
//     req.user = user;
//     next();
//   });
// }

// module.exports.auth= auth;