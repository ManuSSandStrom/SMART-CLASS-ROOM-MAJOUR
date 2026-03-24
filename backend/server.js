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
import { usersRouter } from "./routes/usersRoute.js";
import { attendanceRouter } from "./routes/attendanceRoute.js";
import { issuesRouter } from "./routes/issuesRoute.js";
import { feedbackRouter } from "./routes/feedbackRoute.js";
import { dashboardRouter } from "./routes/dashboardRoute.js";

dotenv.config({ quiet: true });

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://smartindiatrendbuild.netlify.app",
  process.env.FRONTEND_URL,
  process.env.NETLIFY_URL,
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));
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
app.use("/api/users", usersRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/issues", issuesRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/dashboard", dashboardRouter);

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
