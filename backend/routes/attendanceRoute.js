import { Router } from "express";
import Attendance from "../models/Attendance.js";

export const attendanceRouter = Router();

attendanceRouter.get("/", async (req, res) => {
  try {
    const { studentId, courseCode } = req.query;
    const query = {};

    if (studentId) {
      query.studentId = studentId;
    }
    if (courseCode) {
      query.courseCode = String(courseCode).trim().toUpperCase();
    }

    const records = await Attendance.find(query).sort({ date: -1, createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
});

attendanceRouter.get("/summary", async (_req, res) => {
  try {
    const records = await Attendance.find();
    const presentCount = records.filter((record) => record.status === "present").length;
    const attendanceRate = records.length ? Math.round((presentCount / records.length) * 100) : 0;
    const lateCount = records.filter((record) => record.status === "late").length;

    res.json({
      totalRecords: records.length,
      presentCount,
      lateCount,
      attendanceRate,
    });
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    res.status(500).json({ error: "Failed to fetch attendance summary" });
  }
});

attendanceRouter.post("/", async (req, res) => {
  try {
    const record = await Attendance.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    console.error("Error creating attendance record:", error);
    res.status(500).json({ error: "Failed to create attendance record" });
  }
});

attendanceRouter.put("/:id", async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ error: "Attendance record not found" });
    }
    res.json(record);
  } catch (error) {
    console.error("Error updating attendance record:", error);
    res.status(500).json({ error: "Failed to update attendance record" });
  }
});
