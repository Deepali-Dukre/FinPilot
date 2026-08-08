const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();   // ← this MUST come before connectDB()
connectDB();        // ← this reads process.env, so env must already be loaded

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
