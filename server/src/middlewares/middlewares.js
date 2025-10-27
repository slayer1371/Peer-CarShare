import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to check if the user is authenticated
export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Support both old and new token formats
    const userId = decoded.userId || decoded.id;
    
    if (!userId) {
      return res.status(401).json({ error: "Invalid token format." });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user; // Attach user data to the request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};
