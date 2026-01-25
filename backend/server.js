import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";
import cors from "cors";

import { coursesRouter, } from "./routes/coursesRoute.js";
import { facultyRouter, } from "./routes/facultyRoute.js";
import { roomsRouter, } from "./routes/roomsRoute.js";
import { timetablesRouter, } from "./routes/timetableRoute.js";
import { aiRouter, } from "./routes/aiRoute.js";
import { notificationsRouter, } from "./routes/notificationsRoute.js";

dotenv.config({ quiet: true });

const app = express();

// Task 3: Backend CORS & Preflight
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
app.use(express.json());

// Task 5: Health Check
app.get("/", (req, res) => {
  res.status(200).json({ status: "Backend running" });
});

app.use("/api/courses", coursesRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/timetables", timetablesRouter);
app.use("/api/ai", aiRouter);
app.use("/api/notifications", notificationsRouter);

// Global Error Handler to catch 500 errors
app.use((err, req, res, next) => {
  console.error("Backend Error:", err.message, err.stack);
  res.status(500).json({ 
    message: "Internal Server Error",
    error: err.message
  });
});

const startServer = async () => {
  await dbConnect();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
