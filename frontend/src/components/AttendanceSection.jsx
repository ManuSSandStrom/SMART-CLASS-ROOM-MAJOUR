import { InputField, SectionCard, SelectField } from "./PortalUI";

export function AttendanceSection({ attendanceForm, setAttendanceForm, attendance, submitRecord, emptyAttendanceForm }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <SectionCard title="Attendance manager" description="Record participation quickly and keep the status flow clean for students and lecturers.">
        <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); submitRecord("attendance", "/attendance", { ...attendanceForm, date: new Date().toISOString() }, () => setAttendanceForm(emptyAttendanceForm)); }}>
          <InputField label="Student name" value={attendanceForm.studentName} onChange={(value) => setAttendanceForm({ ...attendanceForm, studentName: value })} />
          <div className="grid gap-3 md:grid-cols-2">
            <InputField label="College ID" value={attendanceForm.collegeId} onChange={(value) => setAttendanceForm({ ...attendanceForm, collegeId: value.toUpperCase() })} />
            <InputField label="Faculty" value={attendanceForm.facultyName} onChange={(value) => setAttendanceForm({ ...attendanceForm, facultyName: value })} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <InputField label="Course code" value={attendanceForm.courseCode} onChange={(value) => setAttendanceForm({ ...attendanceForm, courseCode: value.toUpperCase() })} />
            <InputField label="Course name" value={attendanceForm.courseName} onChange={(value) => setAttendanceForm({ ...attendanceForm, courseName: value })} />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <InputField label="Time slot" value={attendanceForm.slotLabel} onChange={(value) => setAttendanceForm({ ...attendanceForm, slotLabel: value })} />
            <SelectField label="Type" value={attendanceForm.sessionType} onChange={(value) => setAttendanceForm({ ...attendanceForm, sessionType: value })} options={[{ label: "Lecture", value: "lecture" }, { label: "Lab", value: "lab" }, { label: "Tutorial", value: "tutorial" }, { label: "Special", value: "special" }]} />
            <SelectField label="Status" value={attendanceForm.status} onChange={(value) => setAttendanceForm({ ...attendanceForm, status: value })} options={[{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }, { label: "Late", value: "late" }, { label: "Excused", value: "excused" }]} />
          </div>
          <button type="submit" className="primary-button justify-center">Save attendance</button>
        </form>
      </SectionCard>

      <SectionCard title="Attendance activity" description="Recent classroom records with status visibility for follow-up.">
        <div className="space-y-3">
          {attendance.slice(0, 8).map((record) => (
            <div key={record._id} className="list-row">
              <div>
                <p className="font-semibold text-slate-950">{record.studentName}</p>
                <p className="text-sm text-slate-500">{record.courseCode} • {record.slotLabel || "Scheduled session"}</p>
              </div>
              <div className="text-right">
                <span className={`pill ${record.status === "present" ? "pill-success" : "pill-warning"}`}>{record.status}</span>
                <p className="mt-2 text-xs text-slate-500">{new Date(record.date || record.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
