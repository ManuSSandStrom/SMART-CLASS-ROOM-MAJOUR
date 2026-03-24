import { InputField, MiniPanel, SectionCard } from "./PortalUI";

export function AdminSection({
  lecturerForm,
  setLecturerForm,
  faculty,
  users,
  issues,
  feedback,
  attendance,
  dashboard,
  submitRecord,
  emptyLecturerForm,
  handleFeedbackStatusChange,
}) {
  const presentCount = attendance.filter((item) => item.status === "present").length;
  const attendanceRate = attendance.length ? Math.round((presentCount / attendance.length) * 100) : 0;

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Lecturer management" description="Add lecturers from the admin panel and keep specialization data ready for scheduling.">
          <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); submitRecord("faculty", "/faculty", { ...lecturerForm, employeeId: lecturerForm.employeeId.toUpperCase(), specialization: lecturerForm.specialization.split(",").map((item) => item.trim()).filter(Boolean) }, () => setLecturerForm(emptyLecturerForm)); }}>
            <InputField label="Lecturer name" value={lecturerForm.name} onChange={(value) => setLecturerForm({ ...lecturerForm, name: value })} />
            <div className="grid gap-3 md:grid-cols-2">
              <InputField label="Email" type="email" value={lecturerForm.email} onChange={(value) => setLecturerForm({ ...lecturerForm, email: value })} />
              <InputField label="Employee ID" value={lecturerForm.employeeId} onChange={(value) => setLecturerForm({ ...lecturerForm, employeeId: value })} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <InputField label="Department" value={lecturerForm.department} onChange={(value) => setLecturerForm({ ...lecturerForm, department: value })} />
              <InputField label="Designation" value={lecturerForm.designation} onChange={(value) => setLecturerForm({ ...lecturerForm, designation: value })} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <InputField label="Phone" value={lecturerForm.phone} onChange={(value) => setLecturerForm({ ...lecturerForm, phone: value })} />
              <InputField label="Office" value={lecturerForm.officeLocation} onChange={(value) => setLecturerForm({ ...lecturerForm, officeLocation: value })} />
            </div>
            <InputField label="Specializations" value={lecturerForm.specialization} onChange={(value) => setLecturerForm({ ...lecturerForm, specialization: value })} />
            <button type="submit" className="primary-button justify-center">Add lecturer</button>
          </form>
        </SectionCard>

        <SectionCard title="Admin operations monitor" description="Professional monitoring for students, attendance, issues, and feedback routing.">
          <div className="grid gap-4 md:grid-cols-2">
            <MiniPanel title="Registered students" value={users.filter((user) => user.role === "student").length} subtitle="Unique ID protected" />
            <MiniPanel title="Lecturer count" value={faculty.length} subtitle="Scheduling-ready resources" />
            <MiniPanel title="Attendance rate" value={`${attendanceRate}%`} subtitle="Recent recorded sessions" />
            <MiniPanel title="Open support tickets" value={issues.filter((issue) => issue.status !== "closed").length} subtitle="Needs monitoring" />
            <MiniPanel title="Average feedback" value={`${dashboard?.kpis?.averageFeedback || 4.6}/5`} subtitle="Campus experience score" />
            <MiniPanel title="Teaching feedback" value={feedback.filter((item) => item.category === "teaching").length} subtitle="Lecturer-linked comments" />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Feedback management for lecturers" description="Review student feedback, share it with lecturers, and mark action items from one admin workspace.">
          <div className="space-y-3">
            {feedback.slice(0, 8).map((item) => (
              <div key={item._id} className="list-row items-start">
                <div>
                  <p className="font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.studentName} • {item.category}
                    {item.lecturerName ? ` • ${item.lecturerName}` : ""}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="pill pill-success">{item.rating}/5</span>
                  <span className="pill">{item.status}</span>
                  <button type="button" className="secondary-button px-3 py-2 text-sm" onClick={() => handleFeedbackStatusChange(item._id, "reviewed")}>Mark reviewed</button>
                  <button type="button" className="secondary-button px-3 py-2 text-sm" onClick={() => handleFeedbackStatusChange(item._id, "shared_with_lecturer")}>Share with lecturer</button>
                  <button type="button" className="secondary-button px-3 py-2 text-sm" onClick={() => handleFeedbackStatusChange(item._id, "actioned")}>Mark actioned</button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Student and issue watchlist" description="Keeps registrations and active issue resolution visible for admin follow-up.">
          <div className="space-y-3">
            {users.slice(0, 4).map((user) => (
              <div key={user._id} className="list-row">
                <div>
                  <p className="font-semibold text-slate-950">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}{user.collegeId ? ` • ${user.collegeId}` : ""}</p>
                </div>
                <span className="pill">{user.role}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {issues.slice(0, 4).map((issue) => (
              <div key={issue._id} className="rounded-3xl border border-sky-100 bg-sky-50/70 p-4">
                <p className="font-semibold text-slate-950">{issue.title}</p>
                <p className="mt-1 text-sm text-slate-500">{issue.studentName} • {issue.category} • {issue.priority}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{issue.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
