import express from "express";
import { authenticate } from "../middlewares/middlewares.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Create Car Listing
router.post("/car", authenticate, async (req, res) => {
  try {
    const { make, model, year, location, pricePerDay, availability, imageUrl, description } = req.body;

    // Validation
    if (!make || !model || !year || !location || !pricePerDay || availability === undefined) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Create Car Listing
    const newCar = await prisma.car.create({
      data: {
        userId: req.user.id,
        make,
        model,
        year,
        location,
        pricePerDay,
        availability,
        imageUrl: imageUrl || null,
        description: description || null,
      },
    });

    res.status(201).json({ message: "Car listed successfully", car: newCar });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Available Cars
router.get("/cars", async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      where: { availability: true },
      include: { user: true },
    });

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get My Cars (authenticated user's listings)
router.get("/my-cars", authenticate, async (req, res) => {
  try {
    const cars = await prisma.car.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching user's cars:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Search Cars
router.get("/cars/search", async (req, res) => {
    try {
      const { location, priceRange } = req.query;
      
      // Build filters
      const filters = {
        where: {
          availability: true,
          ...(location && { location: { contains: location, mode: 'insensitive' } }),
          ...(priceRange && {
            pricePerDay: {
              lte: parseFloat(priceRange), // Price less than or equal to the given price
            },
          }),
        },
      };
  
      const cars = await prisma.car.findMany(filters);
  
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  
export default router;
