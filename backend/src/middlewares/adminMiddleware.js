import dotenv from 'dotenv';


export const adminValidation = async (req, res, next) =>{
    const adminUserId = process.env.ADMIN_USER_ID;

    if (req.user?.userId === adminUserId) {
        next();
      } else {
        return res.status(403).json({ message: "Access denied. Admin only." });
      }
}