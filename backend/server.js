import express from "express";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";
import cors from "cors";

import { coursesRouter } from "./routes/coursesRoute.js";
import { facultyRouter } from "./routes/facultyRoute.js";
import { roomsRouter } from "./routes/roomsRoute.js";
import { timetablesRouter } from "./routes/timetableRoute.js";
import { aiRouter } from "./routes/aiRoute.js";
import { notificationsRouter } from "./routes/notificationsRoute.js";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://adorable-beijinho-dbdb8f.netlify.app",
    ],
    credentials: true,
  }),
);

app.use("/api/courses", coursesRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/timetables", timetablesRouter);
app.use("/api/ai", aiRouter);
app.use("/api/notifications", notificationsRouter);

// Global Error Handler to catch 500 errors
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Server Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong on the server.",
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
