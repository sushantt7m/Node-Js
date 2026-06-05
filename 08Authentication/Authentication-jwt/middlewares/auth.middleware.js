import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) {
      return next();
    }

    if (!tokenHeader.startsWith("Bearer ")) {
      return res.json({
        error: "authorisation header must start with Bearer",
      });
    }

    const token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.json({ error: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    next();
  }
};

export const ensureAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "You must login first" });
  }
  next();
};

export const restrictToRole = (role) => {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res.status(401).json({
        err: "You are not authorised to access this resource",
      });
    }

    return next();
  };
};



if(!user)
  console.log("Sushant")








