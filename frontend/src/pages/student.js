import { api } from "../api.js";
import { modal } from "../components/modal.js";
import {
  createIcons,
  School,
  BookOpen,
  Send,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  GraduationCap,
} from "lucide";

export async function renderStudentDashboard(container, user, onLogout) {
  container.innerHTML = `
    <div class="min-h-screen bg-slate-50">
      <nav class="sticky top-0 z-50 bg-brand-dark text-white p-5 shadow-xl border-b border-white/5">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center space-x-4">
             <div class="p-2 bg-white rounded-xl shadow-inner">
                <img src="/enrollment.png" class="h-6 w-6">
             </div>
             <span class="font-black tracking-tight uppercase text-lg leading-none">CPSU Enrollment</span>
          </div>
          <div class="flex items-center space-x-6">
            <div class="hidden md:flex flex-col text-right">
               <span class="text-xs font-bold text-white/60 uppercase tracking-widest leading-none mb-1">Authenticated Student</span>
               <span class="text-xs transition-colors hover:text-brand-green font-bold text-white uppercase tracking-tighter cursor-default">${user.name}</span>
            </div>
            <button id="logoutBtn" class="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-rose-500/20 active:scale-95 flex items-center space-x-2 group">
              <i data-lucide="log-out" class="w-4 h-4 group-hover:-translate-x-1 transition-transform"></i>
              <span>Exit</span>
            </button>
          </div>
        </div>
      </nav>

      <main class="max-w-4xl mx-auto p-10 animate-fade-in">
        <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div class="flex items-center space-x-2 text-brand-green font-black uppercase tracking-widest text-[10px] mb-2 bg-brand-green/5 w-fit px-4 py-1.5 rounded-full border border-brand-green/10">
               <i data-lucide="graduation-cap" class="w-3 h-3"></i>
               <span>Academic Admission Portal</span>
            </div>
            <h1 class="text-4xl font-black text-slate-800 tracking-tighter leading-none mb-2 uppercase">Student Center</h1>
            <p class="text-slate-500 font-medium">Select your college and program to begin enrollment</p>
          </div>
        </div>

        <div class="grid gap-10">
          <!-- Application Form -->
          <div class="bg-white rounded-4xl p-10 shadow-sm border border-slate-200 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 group-hover:bg-brand-green/10 transition-colors"></div>
            
            <div class="flex items-center space-x-3 mb-8">
               <div class="p-2.5 bg-slate-50 rounded-2xl">
                  <i data-lucide="send" class="w-5 h-5 text-brand-green"></i>
               </div>
               <h2 class="text-xl font-black text-slate-700 uppercase tracking-tight">Post New Application</h2>
            </div>
            
            <div class="space-y-8">
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-3">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic College</label>
                  <div class="relative group/select">
                    <select id="collegeSelect" class="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all appearance-none font-bold text-slate-800 group-hover/select:bg-white text-sm">
                      <option value="">Choose a college...</option>
                    </select>
                    <i data-lucide="school" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/select:text-brand-green transition-colors"></i>
                  </div>
                </div>
                <div class="space-y-3">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course / Program</label>
                  <div class="relative group/select">
                    <select id="programSelect" disabled class="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all appearance-none font-bold text-slate-800 disabled:opacity-50 text-sm">
                      <option value="">Choose a program...</option>
                    </select>
                    <i data-lucide="book-open" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-enabled:group-focus-within/select:text-brand-green transition-colors"></i>
                  </div>
                </div>
              </div>
              <button id="applyBtn" class="w-full py-5 bg-brand-green text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-brand-green/30 hover:shadow-brand-green/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 text-sm">
                <i data-lucide="send" class="w-4 h-4"></i>
                <span>Submit Admission Request</span>
              </button>
            </div>
          </div>

          <!-- My Applications -->
          <div class="space-y-6">
             <div class="flex items-center space-x-3 px-2">
                <i data-lucide="clock" class="w-5 h-5 text-slate-400"></i>
                <h2 class="text-xl font-black text-slate-700 uppercase tracking-tight">Your Admissions Status</h2>
             </div>
             <div id="appList" class="grid gap-6">
                <!-- App items here -->
             </div>
          </div>
        </div>
      </main>
    </div>
  `;

  document.querySelector("#logoutBtn").onclick = onLogout;

  const collegeSelect = document.querySelector("#collegeSelect");
  const programSelect = document.querySelector("#programSelect");
  const applyBtn = document.querySelector("#applyBtn");
  const appList = document.querySelector("#appList");

  try {
    const colleges = await api.get("/colleges");
    colleges.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.name;
      collegeSelect.appendChild(opt);
    });

    collegeSelect.addEventListener("change", () => {
      const college = colleges.find((c) => c.id == collegeSelect.value);
      programSelect.innerHTML = '<option value="">Choose a program...</option>';
      if (college && college.programs) {
        college.programs.forEach((p) => {
          const opt = document.createElement("option");
          opt.value = p.id;
          opt.textContent = p.name;
          programSelect.appendChild(opt);
        });
        programSelect.disabled = false;
      } else {
        programSelect.disabled = true;
      }
      createIcons({ icons: { BookOpen } });
    });
  } catch (e) {}

  let isAlreadyEnrolled = false;

  const loadMyApps = async () => {
    try {
      const apps = await api.get(`/applications/my?studentId=${user.id}`);
      isAlreadyEnrolled = apps.some((app) => app.status === "ENROLLED");

      if (isAlreadyEnrolled) {
        collegeSelect.disabled = true;
        programSelect.disabled = true;
        applyBtn.disabled = true;
        applyBtn.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> <span>Officially Enrolled</span>`;
        applyBtn.className =
          "w-full py-5 bg-slate-200 text-slate-500 font-black uppercase tracking-widest rounded-2xl cursor-not-allowed flex items-center justify-center space-x-3 text-sm";
      }

      appList.innerHTML = apps.length
        ? ""
        : '<div class="p-16 text-center text-slate-400 bg-white rounded-4xl border border-dashed border-slate-200 font-bold uppercase tracking-widest text-[10px] flex flex-col items-center justify-center space-y-4 animate-fade-in"><i data-lucide="graduation-cap" class="w-12 h-12 text-slate-200"></i><span>No active applications found on this account</span></div>';

      apps.forEach((app) => {
        const div = document.createElement("div");
        div.className =
          "bg-white p-8 rounded-4xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center group hover:border-brand-green/30 transition-all animate-fade-in";

        div.innerHTML = `
          <div class="flex items-center space-x-6 mb-4 md:mb-0 w-full md:w-auto cursor-pointer" id="info-${app.id}">
            <div class="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-brand-green/5 group-hover:text-brand-green transition-all">
               <i data-lucide="graduation-cap" class="w-6 h-6"></i>
            </div>
            <div>
              <h3 class="font-black text-slate-800 uppercase tracking-tight text-lg">${app.program.name}</h3>
              <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">${app.program.college.name}</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            ${
              app.status === "ENROLLED"
                ? `
              <button id="ticket-${app.id}" class="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center space-x-2 shadow-lg shadow-slate-900/20">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                <span>Enrollment Form</span>
              </button>
            `
                : ""
            }
            <div id="status-${app.id}" class="flex items-center space-x-3 bg-slate-50 px-6 py-2 rounded-full border border-slate-100 group-hover:bg-white group-hover:border-brand-green/10 transition-all min-w-[140px] justify-center cursor-pointer">
              <i data-lucide="${app.status === "PENDING" ? "clock" : app.status === "REJECTED" ? "x-circle" : "check-circle"}" class="w-4 h-4 ${app.status === "PENDING" ? "text-amber-500" : app.status === "REJECTED" ? "text-rose-500" : "text-brand-green"}"></i>
              <span class="text-[10px] font-black uppercase tracking-widest ${app.status === "PENDING" ? "text-amber-600" : app.status === "REJECTED" ? "text-rose-600" : "text-brand-green"}">
                ${app.status}
              </span>
            </div>
          </div>
        `;

        div.querySelector(`#info-${app.id}`).onclick = () => showTimeline(app);
        div.querySelector(`#status-${app.id}`).onclick = () =>
          showTimeline(app);
        if (app.status === "ENROLLED") {
          div.querySelector(`#ticket-${app.id}`).onclick = (e) => {
            e.stopPropagation();
            showEnrollmentTicket(app);
          };
        }
        appList.appendChild(div);
      });
      createIcons({
        icons: { GraduationCap, Clock, CheckCircle, XCircle, Send, FileText },
      });
    } catch (e) {}
  };

  const showEnrollmentTicket = (app) => {
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-fade-in";

    overlay.innerHTML = `
      <div class="w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in flex flex-col relative border border-white/20">
        <!-- Ticket Header -->
        <div class="bg-brand-dark p-6 text-center relative overflow-hidden">
           <div class="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-transparent"></div>
           <div class="relative z-10 flex flex-col items-center">
              <div class="p-2 bg-white rounded-xl mb-3 shadow-lg rotate-2">
                 <img src="/enrollment.png" class="h-8 w-8">
              </div>
              <h2 class="text-white font-black text-xl uppercase tracking-tighter leading-none mb-1">Registration Form</h2>
              <div class="text-[8px] text-brand-green font-black uppercase tracking-[0.2em] opacity-80">Official Document</div>
           </div>
        </div>

        <!-- Ticket Body -->
        <div class="p-6 space-y-4 relative">
           <!-- Decorative Punch-outs -->
           <div class="absolute -left-3 top-0 w-6 h-6 bg-slate-900/80 rounded-full"></div>
           <div class="absolute -right-3 top-0 w-6 h-6 bg-slate-900/80 rounded-full"></div>
           <div class="border-t-2 border-dashed border-slate-100 mb-4"></div>

           <div class="grid grid-cols-2 gap-4">
              <div class="space-y-0.5">
                 <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Full Name</span>
                 <div class="text-xs font-black text-slate-800 uppercase leading-none">${user.name}</div>
              </div>
              <div class="space-y-0.5 text-right">
                 <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Student ID</span>
                 <div class="text-xs font-black text-brand-green uppercase leading-none">CPSU-${1000 + user.id}</div>
              </div>
              <div class="col-span-2 space-y-0.5">
                 <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Program</span>
                 <div class="text-xs font-black text-slate-800 uppercase leading-tight">${app.program.name}</div>
              </div>
              <div class="col-span-2 space-y-0.5">
                 <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Department</span>
                 <div class="text-[10px] font-bold text-slate-500 uppercase">${app.program.college.name}</div>
              </div>
              <div class="space-y-0.5">
                 <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Year</span>
                 <div class="text-xs font-black text-slate-800 uppercase leading-none">2026-2027</div>
              </div>
              <div class="space-y-0.5 text-right">
                 <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                 <div class="text-[8px] font-black text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block">Active</div>
              </div>
           </div>

           <div class="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 border border-slate-100">
              <div class="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                 <i data-lucide="qr-code" class="w-10 h-10 text-slate-800"></i>
              </div>
              <div class="text-center">
                <div class="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-0.5 italic">Authentication Code</div>
                <div class="text-[8px] font-mono text-slate-400 truncate w-32">CPSU-ENR-${app.id}</div>
              </div>
           </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-6 pt-0 flex space-x-2">
           <button id="closeTicket" class="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-400 font-black uppercase tracking-widest text-[8px] rounded-xl transition-all">
              <span>Dismiss</span>
           </button>
           <button id="printTicket" class="flex-[2] py-3 bg-brand-green hover:bg-brand-hover text-white font-black uppercase tracking-widest text-[8px] rounded-xl shadow-lg shadow-brand-green/20 transition-all flex items-center justify-center space-x-2">
              <i data-lucide="printer" class="w-3 h-3"></i>
              <span>Print Registration</span>
           </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    import("lucide").then(({ createIcons, QrCode, Printer, FileText }) => {
      createIcons({ icons: { QrCode, Printer, FileText } });
    });

    document.querySelector("#closeTicket").onclick = () => {
      overlay.classList.add("opacity-0");
      setTimeout(() => overlay.remove(), 200);
    };

    document.querySelector("#printTicket").onclick = () => {
      window.print();
    };
  };

  const showTimeline = (app) => {
    const steps = [
      {
        id: "PENDING",
        label: "Application Submitted",
        desc: "Awaiting faculty review",
      },
      {
        id: "ACCEPTED",
        label: "Admission Accepted",
        desc: "Eligible for enrollment",
      },
      {
        id: "ENROLLED",
        label: "Officially Enrolled",
        desc: "Welcome to CPSU!",
      },
    ];

    const currentIdx = steps.findIndex((s) => s.id === app.status);
    const isRejected = app.status === "REJECTED";

    const modalOverlay = document.createElement("div");
    modalOverlay.className =
      "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in";
    modalOverlay.innerHTML = `
      <div class="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full p-10 animate-fade-in border border-white/20">
        <div class="flex justify-between items-center mb-10">
           <h3 class="text-2xl font-black text-slate-800 uppercase tracking-tight">Status Timeline</h3>
           <button id="closeTimeline" class="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"><i data-lucide="x-circle" class="w-6 h-6"></i></button>
        </div>

        <div class="relative space-y-12">
          ${
            isRejected
              ? `
            <div class="flex items-center space-x-6 grayscale opacity-50">
              <div class="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm font-black text-slate-400">1</div>
              <div class="flex-1">
                <div class="text-sm font-black text-slate-400 uppercase tracking-widest">Submitted</div>
              </div>
            </div>
            <div class="flex items-center space-x-6">
              <div class="h-12 w-12 bg-rose-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl text-white"><i data-lucide="x-circle" class="w-6 h-6"></i></div>
              <div class="flex-1">
                <div class="text-sm font-black text-rose-600 uppercase tracking-widest leading-none mb-1">Application Rejected</div>
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Review your details and try again</div>
              </div>
            </div>
          `
              : steps
                  .map((step, idx) => {
                    const isDone = idx <= currentIdx;
                    const isActive = idx === currentIdx;
                    return `
              <div class="relative flex items-center space-x-6">
                ${idx < steps.length - 1 ? `<div class="absolute left-6 top-12 bottom-[-48px] w-0.5 ${idx < currentIdx ? "bg-brand-green" : "bg-slate-100"}"></div>` : ""}
                <div class="h-12 w-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-all duration-500 ${isDone ? "bg-brand-green text-white shadow-brand-green/30" : "bg-slate-100 text-slate-300"}">
                   ${isDone ? '<i data-lucide="check-circle" class="w-5 h-5"></i>' : idx + 1}
                </div>
                <div class="flex-1">
                  <div class="text-sm font-black uppercase tracking-widest leading-none mb-1 ${isActive ? "text-brand-green" : isDone ? "text-slate-800" : "text-slate-300"}">
                    ${step.label}
                  </div>
                  <div class="text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-slate-500" : "text-slate-300"}">
                    ${step.desc}
                  </div>
                </div>
              </div>
            `;
                  })
                  .join("")
          }
        </div>
        <button id="timelineOk" class="w-full mt-12 py-4 bg-brand-dark text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl transition-all active:scale-95">Back to Portal</button>
      </div>
    `;
    document.body.appendChild(modalOverlay);
    createIcons({ icons: { XCircle, CheckCircle } });

    const close = () => {
      modalOverlay.classList.add("opacity-0");
      setTimeout(() => modalOverlay.remove(), 200);
    };
    document.querySelector("#closeTimeline").onclick = close;
    document.querySelector("#timelineOk").onclick = close;
  };

  applyBtn.addEventListener("click", async () => {
    if (isAlreadyEnrolled) {
      return modal.show(
        "Notice",
        "You are already officially enrolled in a program and cannot apply for additional ones.",
      );
    }

    const programId = programSelect.value;
    if (!programId)
      return modal.show("Validation", "Please select a program first.", "info");

    const programOpt = programSelect.options[programSelect.selectedIndex];
    if (
      await modal.confirm(
        "Confirm Application",
        `Are you sure you want to apply for ${programOpt.text}?`,
      )
    ) {
      try {
        await api.post("/applications/apply", {
          studentId: user.id,
          programId: parseInt(programId),
        });
        await modal.show(
          "Success",
          "Your application has been submitted successfully!",
          "success",
        );
        loadMyApps();
      } catch (err) {
        modal.show("Error", "Failed to submit application.", "error");
      }
    }
  });

  loadMyApps();
  createIcons({
    icons: { School, BookOpen, Send, LogOut, Clock, GraduationCap },
  });
}
