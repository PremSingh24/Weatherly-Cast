import jwt from "jsonwebtoken";

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, String(process.env.SECRET_KEY), (err, user) => {
      if (err) {
        return res.status(403).end();
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401).end();
  }
};

export default authenticateJwt;
