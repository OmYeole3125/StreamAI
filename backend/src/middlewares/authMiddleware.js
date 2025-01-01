import jwt from 'jsonwebtoken';


export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>" format

  if (!token) {
    return res.status(403).json({ message: "No token provided or incorrect format" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request
    req.user = { userId: decoded.userId }; // Assuming the token has the userId
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
