import { InputField, MiniPanel, SectionCard } from "./PortalUI";

export function AdminSection({ lecturerForm, setLecturerForm, faculty, users, issues, dashboard, submitRecord, emptyLecturerForm }) {
  return (
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

      <SectionCard title="Admin monitor" description="Student accounts, issue queue, and feedback health in one place.">
        <div className="space-y-4">
          <MiniPanel title="Registered students" value={users.filter((user) => user.role === "student").length} subtitle="Unique ID protected" />
          <MiniPanel title="Open support tickets" value={issues.filter((issue) => issue.status !== "closed").length} subtitle="Needs monitoring" />
          <MiniPanel title="Average feedback" value={`${dashboard?.kpis?.averageFeedback || 4.6}/5`} subtitle="Campus experience score" />
          <MiniPanel title="Lecturer count" value={faculty.length} subtitle="Scheduling-ready resources" />
        </div>

        <div className="mt-5 space-y-3">
          {users.slice(0, 6).map((user) => (
            <div key={user._id} className="list-row">
              <div>
                <p className="font-semibold text-slate-950">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email} {user.collegeId ? `• ${user.collegeId}` : ""}</p>
              </div>
              <span className="pill">{user.role}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
