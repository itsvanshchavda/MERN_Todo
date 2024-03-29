import { config } from "dotenv";
import express from "express";
import { connectDB } from "./data/data.js";
import userRoutes from "./router/userRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import taskRoutes from "./router/taskRoutes.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

// Create Express app
export const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // allow to server to accept request from different origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

config({
  path: "./data/config.env",
});

// Connect to MongoDB
connectDB();

// Mount routers
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(errorMiddleware);
