const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const log = require("./Middlewares/log");
const authRoutes = require("./Routes/authRoutes");

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/users", log, userRoutes);
app.use("/api/auth", log, authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });