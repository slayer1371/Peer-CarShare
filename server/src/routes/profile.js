import express from "express";
import { authenticate } from "./middlewares.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create or Update Profile
router.post("/profile", authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, licenseNumber } = req.body;
    
    // Validation
    if (!firstName || !lastName || !phoneNumber || !licenseNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if profile exists
    let profile = await prisma.profile.findUnique({ where: { userId: req.user.id } });

    if (profile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { userId: req.user.id },
        data: {
          firstName,
          lastName,
          phoneNumber,
          licenseNumber,
        },
      });
      return res.status(200).json({ message: "Profile updated successfully", profile });
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          userId: req.user.id,
          firstName,
          lastName,
          phoneNumber,
          licenseNumber,
        },
      });
      return res.status(201).json({ message: "Profile created successfully", profile });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
