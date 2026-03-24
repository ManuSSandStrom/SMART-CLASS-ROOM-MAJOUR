import { InputField, SectionCard, SelectField, TextAreaField } from "./PortalUI";

export function FeedbackSection({ feedbackForm, setFeedbackForm, feedback, currentUser, submitRecord, emptyFeedbackForm }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <SectionCard title="Student feedback" description="Capture ratings and comments so the platform and classes can improve continuously.">
        <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); submitRecord("feedback", "/feedback", { ...feedbackForm, studentId: currentUser?._id, studentName: currentUser?.name || "Guest Student", collegeId: currentUser?.collegeId || "NA", status: "new" }, () => setFeedbackForm(emptyFeedbackForm)); }}>
          <InputField label="Feedback title" value={feedbackForm.title} onChange={(value) => setFeedbackForm({ ...feedbackForm, title: value })} />
          <div className="grid gap-3 md:grid-cols-2">
            <SelectField label="Category" value={feedbackForm.category} onChange={(value) => setFeedbackForm({ ...feedbackForm, category: value })} options={[{ label: "Platform", value: "platform" }, { label: "Teaching", value: "teaching" }, { label: "Facilities", value: "facilities" }, { label: "Support", value: "support" }, { label: "General", value: "general" }]} />
            <InputField label="Rating / 5" type="number" min="1" max="5" value={feedbackForm.rating} onChange={(value) => setFeedbackForm({ ...feedbackForm, rating: Number(value) })} />
          </div>
          <TextAreaField label="Message" value={feedbackForm.message} onChange={(value) => setFeedbackForm({ ...feedbackForm, message: value })} />
          <button type="submit" className="primary-button justify-center">Send feedback</button>
        </form>
      </SectionCard>

      <SectionCard title="Feedback board" description="Recent student sentiment and actionable comments for admins.">
        <div className="space-y-3">
          {feedback.slice(0, 8).map((item) => (
            <div key={item._id} className="list-row">
              <div>
                <p className="font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.studentName} • {item.category}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.message}</p>
              </div>
              <div className="text-right">
                <span className="pill pill-success">{item.rating}/5</span>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
