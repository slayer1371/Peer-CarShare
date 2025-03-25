import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./src/routes/auth.js"; // Import without require()
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // Exact frontend origin
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Access-Control-Allow-Credentials'
  ]
};

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // Use the imported auth routes

app.get("/", (req, res) => {
  res.send("Car Sharing Platform API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
