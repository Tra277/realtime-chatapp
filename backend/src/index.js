import authRoutes from './routes/auth.route.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use("/api/auth", authRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
}

);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
