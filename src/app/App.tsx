import { useState } from "react";
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Bot,
  Library,
  Briefcase,
  MessageSquare,
  Calendar,
  Zap,
  User,
  Search,
  Bell,
  Send,
  CheckCircle2,
  Circle,
  ArrowRight,
  Clock,
  Sparkles,
  Play,
  GraduationCap,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const NAV_SECTIONS = [
  {
    section: "MAIN",
    items: [
      { icon: LayoutDashboard, label: "Dashboard" },
      { icon: Map, label: "Roadmap" },
      { icon: BookOpen, label: "Academics" },
    ],
  },
  {
    section: "LEARN",
    items: [
      { icon: Bot, label: "AI Tutor" },
      { icon: Library, label: "Resources" },
    ],
  },
  {
    section: "CAREER",
    items: [
      { icon: Briefcase, label: "Career" },
      { icon: MessageSquare, label: "Interview Practice" },
    ],
  },
  {
    section: "COMMUNITY",
    items: [{ icon: Calendar, label: "Events" }],
  },
  {
    section: "PERSONAL",
    items: [
      { icon: Zap, label: "Productivity" },
      { icon: User, label: "Profile" },
    ],
  },
];

const WEEK_DATA = [
  { day: "Sa", hours: 1.8, today: false },
  { day: "Su", hours: 4.0, today: false },
  { day: "Mo", hours: 3.5, today: false },
  { day: "Tu", hours: 5.1, today: false },
  { day: "We", hours: 2.8, today: false },
  { day: "Th", hours: 4.6, today: false },
  { day: "Fr", hours: 4.5, today: true },
];

const SUBJECTS = [
  { name: "Data Structures", grade: "A", score: 92, change: 3 },
  { name: "Web Development", grade: "B+", score: 85, change: 5 },
  { name: "Database Systems", grade: "A−", score: 88, change: 0 },
  { name: "Linear Algebra", grade: "B", score: 76, change: -2 },
  { name: "Operating Systems", grade: "B+", score: 83, change: 1 },
];

const ROADMAP = [
  { label: "HTML & CSS Fundamentals", done: true },
  { label: "JavaScript Fundamentals", done: true },
  { label: "React & Component Design", done: true },
  { label: "JavaScript Arrays & Methods", done: false, current: true },
  { label: "Node.js & Express", done: false },
  { label: "Databases (SQL & NoSQL)", done: false },
  { label: "Full Stack Capstone Project", done: false },
];

const UPCOMING = [
  {
    title: "DSA Assignment #3",
    type: "assignment" as const,
    due: "Today, 11:59 PM",
    urgent: true,
  },
  {
    title: "Mock Interview — System Design",
    type: "event" as const,
    due: "Tomorrow, 3:00 PM",
    urgent: false,
  },
  {
    title: "Web Dev Project Review",
    type: "assignment" as const,
    due: "Fri, Aug 23",
    urgent: false,
  },
  {
    title: "Tech Fest Registration",
    type: "event" as const,
    due: "Sat, Aug 24",
    urgent: false,
  },
];

const QUICK_PROMPTS = ["Explain recursion", "DSA revision plan", "Mock interview Q&A"];

const completedCount = ROADMAP.filter((r) => r.done).length;
const roadmapPct = Math.round((completedCount / ROADMAP.length) * 100);

const METRICS = [
  { label: "CGPA", value: "8.6", sub: "of 10.0", badge: "+0.2", positive: true },
  { label: "Study Time", value: "4h 32m", sub: "today", badge: "+32m", positive: true },
  { label: "Skills Mastered", value: "72%", sub: "of roadmap", badge: null, positive: null },
  { label: "Tasks Done", value: "4 / 7", sub: "due today", badge: null, positive: null },
];

function gradeColor(grade: string) {
  if (grade.startsWith("A")) return { bg: "#D1FAE5", text: "#059669" };
  return { bg: "#FEF3C7", text: "#D97706" };
}

function scoreBarColor(score: number) {
  if (score >= 90) return "#10B981";
  if (score >= 80) return "#6366F1";
  if (score >= 70) return "#F59E0B";
  return "#EF4444";
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [aiInput, setAiInput] = useState("");
  const [timeRange, setTimeRange] = useState<"7D" | "30D">("7D");

  return (
    <>
      <style>{`
        .no-scroll::-webkit-scrollbar { display: none; }
        .no-scroll { scrollbar-width: none; }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-background">
        {/* ── Sidebar ──────────────────────────────── */}
        <aside className="w-60 flex-shrink-0 bg-card border-r border-border flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-5 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "#6366F1" }}
              >
                <GraduationCap size={14} className="text-white" />
              </div>
              <span className="text-[15px] font-semibold text-foreground tracking-tight">
                StudentOS
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 overflow-y-auto no-scroll px-3 space-y-5">
            {NAV_SECTIONS.map(({ section, items }) => (
              <div key={section}>
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground px-2 mb-1.5 select-none">
                  {section}
                </p>
                <div className="space-y-0.5">
                  {items.map(({ icon: Icon, label }) => {
                    const active = activeNav === label;
                    return (
                      <button
                        key={label}
                        onClick={() => setActiveNav(label)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-accent text-primary font-medium"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <Icon size={16} strokeWidth={active ? 2 : 1.75} />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Profile footer */}
          <div className="border-t border-border p-3 flex-shrink-0">
            <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                style={{ background: "#6366F1" }}
              >
                AK
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-foreground truncate">Aryan Kumar</p>
                <p className="text-xs text-muted-foreground truncate">CS · Semester 5</p>
              </div>
            </button>
          </div>
        </aside>

        {/* ── Right pane ───────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-card border-b border-border flex items-center px-8 gap-5 flex-shrink-0">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 w-60 h-9 bg-secondary rounded-lg px-3 border border-transparent focus-within:border-primary focus-within:bg-card transition-colors">
              <Search size={14} className="text-muted-foreground flex-shrink-0" />
              <input
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                placeholder="Search anything..."
              />
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <Bell size={18} />
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                style={{ background: "#6366F1" }}
              />
            </button>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer select-none"
              style={{ background: "#6366F1" }}
            >
              AK
            </div>
          </header>

          {/* Main scrollable content */}
          <main className="flex-1 overflow-y-auto no-scroll px-8 py-7">
            {/* ── Greeting ──────────────────────── */}
            <div className="mb-7">
              <h1 className="text-xl font-semibold text-foreground">Good morning 👋</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Here's your progress and what to focus on today.
              </p>
            </div>

            {/* ── Metrics row ───────────────────── */}
            <div className="grid grid-cols-4 gap-4 mb-7">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="bg-card rounded-xl border border-border px-5 py-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
                      {m.label}
                    </span>
                    {m.badge && (
                      <span
                        className="text-[11px] font-medium px-1.5 py-0.5 rounded"
                        style={
                          m.positive
                            ? { background: "#D1FAE5", color: "#059669" }
                            : { background: "#FEE2E2", color: "#DC2626" }
                        }
                      >
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-semibold text-foreground leading-none mb-1">
                    {m.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* ── Two-column grid ───────────────── */}
            <div className="grid grid-cols-12 gap-6">
              {/* LEFT — 7/12 */}
              <div className="col-span-7 space-y-6">
                {/* Next Best Action */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="border-b border-border px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={13} style={{ color: "#6366F1" }} />
                      <span
                        className="text-[11px] font-semibold tracking-wider uppercase"
                        style={{ color: "#6366F1" }}
                      >
                        Next Best Action
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">Based on your roadmap</span>
                  </div>

                  <div className="px-6 py-5 flex items-start gap-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "#EEF2FF" }}
                    >
                      <Play size={18} style={{ color: "#6366F1" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-[15px] font-semibold text-foreground">
                        Complete JavaScript Arrays
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Master array methods — map, filter, reduce — essential for your React learning path.
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock size={12} />
                          45 min
                        </span>
                        <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-md">
                          Intermediate
                        </span>
                        <span className="text-xs text-muted-foreground">Step 4 of 7</span>
                      </div>
                    </div>

                    <button
                      className="flex-shrink-0 text-sm font-medium px-4 py-2 rounded-lg text-white flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                      style={{ background: "#6366F1" }}
                    >
                      Start learning
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Weekly Study Activity */}
                <div className="bg-card rounded-xl border border-border px-6 py-5">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Weekly Study Activity</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        26.3 hrs this week · +12% vs last week
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {(["7D", "30D"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeRange(t)}
                          className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                            timeRange === t
                              ? "font-medium"
                              : "text-muted-foreground hover:bg-secondary"
                          }`}
                          style={
                            timeRange === t
                              ? { background: "#EEF2FF", color: "#6366F1" }
                              : {}
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart
                      data={WEEK_DATA}
                      barSize={30}
                      margin={{ top: 0, right: 0, left: -24, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                        tickFormatter={(v: number) => `${v}h`}
                      />
                      <Tooltip
                        cursor={{ fill: "#F9FAFB", radius: 4 }}
                        contentStyle={{
                          border: "1px solid #E5E7EB",
                          borderRadius: 8,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                          fontSize: 12,
                          padding: "6px 10px",
                          color: "#111827",
                        }}
                        formatter={(v: number) => [`${v}h`, "Study time"]}
                      />
                      <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                        {WEEK_DATA.map((entry, i) => (
                          <Cell
                            key={i}
                            fill={entry.today ? "#6366F1" : "#E0E7FF"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#6366F1" }} />
                      <span className="text-xs text-muted-foreground">Today</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#E0E7FF" }} />
                      <span className="text-xs text-muted-foreground">Past days</span>
                    </div>
                  </div>
                </div>

                {/* Academic Performance */}
                <div className="bg-card rounded-xl border border-border px-6 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Academic Performance</h3>
                    <button className="text-xs font-medium" style={{ color: "#6366F1" }}>
                      View details
                    </button>
                  </div>

                  <div className="space-y-0">
                    {SUBJECTS.map((s, i) => {
                      const gc = gradeColor(s.grade);
                      return (
                        <div
                          key={s.name}
                          className={`flex items-center gap-4 py-2.5 ${
                            i < SUBJECTS.length - 1 ? "border-b border-border" : ""
                          }`}
                        >
                          <span className="text-sm text-foreground font-medium w-44 truncate flex-shrink-0">
                            {s.name}
                          </span>

                          <div className="flex items-center gap-2 flex-1">
                            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${s.score}%`,
                                  background: scoreBarColor(s.score),
                                }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-6 text-right flex-shrink-0">
                              {s.score}
                            </span>
                          </div>

                          <span
                            className="text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
                            style={{ background: gc.bg, color: gc.text }}
                          >
                            {s.grade}
                          </span>

                          <span
                            className="flex items-center gap-0.5 text-xs w-8 flex-shrink-0"
                            style={{
                              color:
                                s.change > 0
                                  ? "#059669"
                                  : s.change < 0
                                  ? "#DC2626"
                                  : "#9CA3AF",
                            }}
                          >
                            {s.change > 0 ? (
                              <ChevronUp size={12} />
                            ) : s.change < 0 ? (
                              <ChevronDown size={12} />
                            ) : (
                              <Minus size={12} />
                            )}
                            {s.change !== 0 && Math.abs(s.change)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT — 5/12 */}
              <div className="col-span-5 space-y-6">
                {/* Career Roadmap */}
                <div className="bg-card rounded-xl border border-border px-5 py-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Career Roadmap</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Toward Full Stack Developer
                      </p>
                    </div>
                    <button className="text-xs font-medium" style={{ color: "#6366F1" }}>
                      View full
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{roadmapPct}% complete</span>
                      <span className="text-muted-foreground">
                        {completedCount}/{ROADMAP.length} milestones
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${roadmapPct}%`, background: "#6366F1" }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-0.5">
                    {ROADMAP.map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg ${
                          item.current ? "" : ""
                        }`}
                        style={item.current ? { background: "#EEF2FF" } : {}}
                      >
                        {item.done ? (
                          <CheckCircle2 size={14} style={{ color: "#6366F1" }} className="flex-shrink-0" />
                        ) : item.current ? (
                          <div
                            className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0"
                            style={{ borderColor: "#6366F1" }}
                          />
                        ) : (
                          <Circle size={14} className="text-border flex-shrink-0" />
                        )}

                        <span
                          className={`text-xs flex-1 ${
                            item.done
                              ? "line-through text-muted-foreground"
                              : item.current
                              ? "font-medium"
                              : "text-muted-foreground"
                          }`}
                          style={item.current ? { color: "#4338CA" } : {}}
                        >
                          {item.label}
                        </span>

                        {item.current && (
                          <span
                            className="text-[10px] font-semibold text-white px-1.5 py-0.5 rounded flex-shrink-0"
                            style={{ background: "#6366F1" }}
                          >
                            Next
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Study Assistant */}
                <div className="bg-card rounded-xl border border-border px-5 py-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={14} style={{ color: "#6366F1" }} />
                    <h3 className="text-sm font-semibold text-foreground">AI Study Assistant</h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {QUICK_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => setAiInput(p)}
                        className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-full hover:bg-accent hover:text-primary transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Ask me anything about your studies..."
                      className="w-full text-sm bg-secondary border border-border rounded-lg px-3.5 py-2.5 pr-10 outline-none transition-colors placeholder:text-muted-foreground"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#6366F1";
                        e.currentTarget.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.background = "";
                      }}
                    />
                    <button
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md hover:opacity-90 transition-opacity"
                      style={{ background: "#6366F1" }}
                    >
                      <Send size={11} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Upcoming */}
                <div className="bg-card rounded-xl border border-border px-5 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Upcoming</h3>
                    <button className="text-xs font-medium" style={{ color: "#6366F1" }}>
                      View all
                    </button>
                  </div>

                  <div className="space-y-0">
                    {UPCOMING.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 py-3 ${
                          i < UPCOMING.length - 1 ? "border-b border-border" : ""
                        }`}
                      >
                        <div
                          className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            background: item.urgent
                              ? "#EF4444"
                              : item.type === "event"
                              ? "#6366F1"
                              : "#F59E0B",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground font-medium leading-snug">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.due}</p>
                        </div>
                        <span
                          className="text-[11px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5"
                          style={
                            item.type === "assignment"
                              ? { background: "#FEF3C7", color: "#D97706" }
                              : { background: "#EEF2FF", color: "#6366F1" }
                          }
                        >
                          {item.type === "assignment" ? "Task" : "Event"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
