const jwt = require("jsonwebtoken");
const verifyToken = {
  verifyTokenManager: (req, res, next) => {
    const tokenAuths = req.headers[`tokenauth`];
    
    if (tokenAuths) {
      const accessToken = tokenAuths.split(" ")[1];
      jwt.verify(accessToken,"T52Project859708", (err, manager) => {
        if (err) {
          res.status(403).json("Token auth không đúng");
          return
        }
        req.manager = manager;
        next();
      });
    } else {
      res.status(401).json("Bạn chưa xác thực bằng tokenAuth");
    }
  },
  verifyTokenAdmin: (req, res, next) => {
    verifyToken.verifyTokenManager(req, res, () => {
      if (req.manager.id == req.params.id || req.manager.admin) {
        next();
      } else {
        res.status(403).json("Bạn không phải là Admin");
      }
    });
  },
  verifyTokenAPI: (req, res, next) => {
    const token = req.headers.token;
    
    if (token) {
      const accessToken = token.split(" ")[1];
      if (accessToken == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzNhZDQ3ZjA4YWI1MGIzMGNhM2EwMSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjY0MzUyOTg4LCJleHAiOjE2NjY5NDQ5ODh9.3uw9T_ew9cmoMTYbixwMQFS8jPK74Ct8vPQVRBVLv_kds4324g') {
        next();
      } else {
        res.status(403).json("Token không đúng");
        return
      }
    } else {
      res.status(401).json("Bạn chưa xác thực bằng token");
    }
  },
};
module.exports = verifyToken;
