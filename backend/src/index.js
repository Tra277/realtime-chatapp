import authRoutes from './routes/auth.route.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
}

);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB().then(() => {
    console.log("Database connection established");
  }).catch((error) => {
    console.error("Database connection error:", error);
  });
});
