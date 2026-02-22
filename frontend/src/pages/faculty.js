import { api } from "../api.js";
import { modal } from "../components/modal.js";
import {
  createIcons,
  LayoutDashboard,
  UserCheck,
  BookOpen,
  Library,
  LogOut,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  UserPlus,
} from "lucide";

export async function renderFacultyDashboard(container, user, onLogout) {
  let activeTab = "dashboard";

  function renderLayout() {
    container.innerHTML = `
      <div class="flex h-screen bg-slate-50 overflow-hidden">
        <!-- Sidebar -->
        <aside class="w-64 bg-brand-dark flex flex-col shadow-2xl z-20">
          <div class="p-8 flex items-center space-x-3 mb-4">
             <div class="p-2 bg-white rounded-lg shadow-sm">
                <img src="/enrollment.png" class="h-6 w-6">
             </div>
             <span class="text-white font-black tracking-tighter text-lg uppercase leading-tight">CPSU Portal</span>
          </div>

          <nav class="flex-1 px-4 space-y-1">
            <button data-tab="dashboard" class="nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${activeTab === "dashboard" ? "bg-brand-green text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}">
              <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
              <span class="font-bold text-sm">Dashboard</span>
            </button>
            <button data-tab="admissions" class="nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${activeTab === "admissions" ? "bg-brand-green text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}">
              <i data-lucide="user-check" class="w-5 h-5"></i>
              <span class="font-bold text-sm">Admissions</span>
            </button>
            <button data-tab="programs" class="nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${activeTab === "programs" ? "bg-brand-green text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}">
              <i data-lucide="book-open" class="w-5 h-5"></i>
              <span class="font-bold text-sm">Programs</span>
            </button>
            <button data-tab="colleges" class="nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${activeTab === "colleges" ? "bg-brand-green text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}">
              <i data-lucide="library" class="w-5 h-5"></i>
              <span class="font-bold text-sm">Colleges</span>
            </button>
          </nav>

          <div class="p-6 border-t border-white/5">
            <div class="bg-white/5 rounded-2xl p-4 mb-4 border border-white/5">
               <div class="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Logged in as</div>
               <div class="text-white font-bold text-xs truncate">${user.name}</div>
               <div class="text-[10px] text-brand-green mt-1 font-bold italic">Faculty Member</div>
            </div>
            <button id="logoutBtn" class="w-full py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 group">
              <i data-lucide="log-out" class="w-4 h-4 transition-transform group-hover:-translate-x-1"></i>
              <span>Exit Portal</span>
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 flex flex-col relative overflow-hidden">
          <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
             <div class="flex items-center space-x-3">
                <div class="p-2 bg-slate-50 rounded-lg">
                   <i data-lucide="${activeTab === "dashboard" ? "layout-dashboard" : activeTab === "admissions" ? "user-check" : activeTab === "programs" ? "book-open" : "library"}" class="w-5 h-5 text-brand-green"></i>
                </div>
                <h2 id="viewTitle" class="text-xl font-black text-slate-800 uppercase tracking-tight">${activeTab}</h2>
             </div>
             <div class="flex items-center space-x-4">
                <div class="flex flex-col text-right">
                   <span class="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">CPSU Management</span>
                   <span class="text-[10px] text-brand-green font-bold flex items-center justify-end space-x-1">
                      <span class="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"></span>
                      <span>Sync: Healthy</span>
                   </span>
                </div>
             </div>
          </header>

          <div id="contentArea" class="flex-1 overflow-y-auto p-10 bg-slate-50/50 scrollbar-hide">
             <!-- Content Injected Here -->
          </div>
        </main>
      </div>
    `;

    document.querySelector("#logoutBtn").onclick = onLogout;

    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.onclick = () => {
        activeTab = btn.dataset.tab;
        renderLayout();
        loadTabContent();
      };
    });

    createIcons({
      icons: {
        LayoutDashboard,
        UserCheck,
        BookOpen,
        Library,
        LogOut,
        Users,
        Clock,
        CheckCircle,
        AlertCircle,
        XCircle,
        ChevronRight,
        Plus,
        Edit,
        Trash2,
        Save,
        X,
        UserPlus,
      },
    });
  }

  async function loadTabContent() {
    const area = document.querySelector("#contentArea");
    if (activeTab === "dashboard") {
      area.innerHTML = `<div class="animate-pulse space-y-4"><div class="h-8 bg-slate-200 rounded w-1/4"></div><div class="grid grid-cols-3 gap-8"><div class="h-48 bg-slate-200 rounded-4xl"></div><div class="h-48 bg-slate-200 rounded-4xl"></div><div class="h-48 bg-slate-200 rounded-4xl"></div></div></div>`;

      try {
        const apps = await api.get("/applications");
        const progs = await api.get("/programs");

        area.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
             <div class="bg-white p-8 rounded-4xl shadow-sm border border-slate-200 flex flex-col justify-between h-52 group hover:border-brand-green/30 transition-all cursor-default">
                <div class="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                   <i data-lucide="check-circle" class="w-6 h-6"></i>
                </div>
                <div>
                  <div class="text-4xl font-black text-slate-800 tracking-tighter">${apps.filter((a) => a.status === "ENROLLED").length}</div>
                  <div class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Total Enrolled</div>
                </div>
             </div>
             <div class="bg-white p-8 rounded-4xl shadow-sm border border-slate-200 flex flex-col justify-between h-52 hover:border-blue-200 transition-all cursor-default group">
                <div class="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                   <i data-lucide="book-open" class="w-6 h-6"></i>
                </div>
                <div>
                  <div class="text-4xl font-black text-slate-800 tracking-tighter">${progs.length}</div>
                  <div class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Active Programs</div>
                </div>
             </div>
             <div class="bg-white p-8 rounded-4xl shadow-sm border border-slate-200 flex flex-col justify-between h-52 hover:border-amber-200 transition-all cursor-default group">
                <div class="h-12 w-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                   <i data-lucide="clock" class="w-6 h-6"></i>
                </div>
                <div>
                  <div class="text-4xl font-black text-slate-800 tracking-tighter">${apps.filter((a) => a.status === "PENDING").length}</div>
                  <div class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Pending Review</div>
                </div>
             </div>
          </div>

          <div class="mt-12 bg-white rounded-4xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
             <div class="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 group-hover:bg-brand-green/5 transition-colors"></div>
             
             <div class="flex justify-between items-center mb-10">
                <div class="flex items-center space-x-3">
                   <div class="p-2 bg-slate-100 rounded-xl">
                      <i data-lucide="clock" class="w-5 h-5 text-slate-500"></i>
                   </div>
                   <h3 class="text-lg font-bold text-slate-800 uppercase tracking-tight">Recent Activity Feed</h3>
                </div>
                <span class="text-[10px] text-brand-green font-black bg-brand-green/5 px-4 py-2 rounded-full uppercase tracking-widest italic border border-brand-green/10">Live System Feed</span>
             </div>

             <div class="space-y-4">
                ${apps
                  .slice(0, 5)
                  .reverse()
                  .map(
                    (app) => `
                  <div class="flex items-center justify-between py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-6 -mx-6 rounded-3xl transition-all group/item">
                     <div class="flex items-center space-x-5">
                        <div class="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover/item:bg-white group-hover/item:shadow-sm transition-all">
                           <i data-lucide="users" class="w-5 h-5"></i>
                        </div>
                        <div>
                          <div class="text-sm font-bold text-slate-800 group-hover/item:text-brand-green transition-colors">${app.student.name}</div>
                          <div class="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">Applied for ${app.program.name}</div>
                        </div>
                     </div>
                     <div class="flex items-center space-x-6">
                        <div class="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${app.status === "PENDING" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-brand-green/5 text-brand-green border border-brand-green/10"}">
                           ${app.status}
                        </div>
                        <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover/item:text-brand-green group-hover/item:translate-x-1 transition-all"></i>
                     </div>
                  </div>
                `,
                  )
                  .join("")}
             </div>
          </div>
        `;
        createIcons({
          icons: { CheckCircle, BookOpen, Clock, Users, ChevronRight },
        });
      } catch (e) {
        area.innerHTML = `<div class="p-20 text-center text-slate-400">Error loading data</div>`;
      }
    }

    if (activeTab === "admissions") {
      area.innerHTML = `
        <div class="flex flex-col space-y-6 animate-fade-in">
          <div class="flex justify-between items-center mb-4">
             <div>
                <h3 class="text-2xl font-black text-slate-800 uppercase tracking-tighter">Admission Queue</h3>
                <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Review and process student applications</p>
             </div>
             <button id="manualEnrollBtn" class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-600/30 hover:-translate-y-1 transition-all flex items-center space-x-3">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Manual Enroll student</span>
             </button>
          </div>
          <div class="bg-white rounded-4xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-100 italic">
                    <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Student Information</th>
                    <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Academic Program</th>
                    <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Review Actions</th>
                  </tr>
                </thead>
                <tbody id="appListBody" class="divide-y divide-slate-50"></tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      loadAdmissions();
      document.getElementById("manualEnrollBtn").onclick = () =>
        showManualEnrollModal();
    }

    if (activeTab === "programs") {
      area.innerHTML = `
        <div class="flex flex-col space-y-6 animate-fade-in">
          <div class="flex justify-between items-center mb-4">
             <div>
                <h3 class="text-2xl font-black text-slate-800 uppercase tracking-tighter">Academic Programs</h3>
                <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Manage available courses by department</p>
             </div>
             <button id="addProgramBtn" class="bg-brand-green text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-brand-green/30 hover:-translate-y-1 transition-all flex items-center space-x-3">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Add New Program</span>
             </button>
          </div>
          <div class="bg-white rounded-4xl shadow-sm border border-slate-200 overflow-hidden">
             <table class="w-full text-left">
                <thead>
                   <tr class="bg-slate-50/50 border-b border-slate-100 italic">
                      <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Program Name</th>
                      <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Department / College</th>
                      <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Management</th>
                   </tr>
                </thead>
                <tbody id="progListBody" class="divide-y divide-slate-50"></tbody>
             </table>
          </div>
        </div>
      `;
      loadProgramsTab();
    }

    if (activeTab === "colleges") {
      area.innerHTML = `
        <div class="flex flex-col space-y-6 animate-fade-in">
          <div class="flex justify-between items-center mb-4">
             <div>
                <h3 class="text-2xl font-black text-slate-800 uppercase tracking-tighter">Colleges & Depts</h3>
                <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Configure academic organizational units</p>
             </div>
             <button id="addCollegeBtn" class="bg-brand-green text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-brand-green/30 hover:-translate-y-1 transition-all flex items-center space-x-3">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Register College</span>
             </button>
          </div>
          <div class="bg-white rounded-4xl shadow-sm border border-slate-200 overflow-hidden">
             <table class="w-full text-left">
                <thead>
                   <tr class="bg-slate-50/50 border-b border-slate-100 italic">
                      <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">College Name</th>
                      <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Description</th>
                      <th class="px-10 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Management</th>
                   </tr>
                </thead>
                <tbody id="collListBody" class="divide-y divide-slate-50"></tbody>
             </table>
          </div>
        </div>
      `;
      loadCollegesTab();
    }
  }

  const loadAdmissions = async () => {
    try {
      const apps = await api.get("/applications");
      const container = document.querySelector("#appListBody");
      if (!container) return;

      container.innerHTML = apps.length
        ? ""
        : '<tr><td colspan="4" class="p-20 text-center text-slate-400">No applications found in database</td></tr>';

      apps.forEach((app) => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50/50 transition-colors group";
        tr.innerHTML = `
          <td class="px-10 py-8">
            <div class="font-bold text-slate-800 text-sm group-hover:text-brand-green transition-colors">${app.student.name}</div>
            <div class="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">${app.student.email}</div>
          </td>
          <td class="px-10 py-8">
            <div class="text-sm font-bold text-slate-700">${app.program.name}</div>
            <div class="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">${app.program.college.name}</div>
          </td>
          <td class="px-10 py-8">
            <div class="flex items-center space-x-2">
               <span class="w-2 h-2 rounded-full ${app.status === "PENDING" ? "bg-amber-400" : "bg-brand-green"}"></span>
               <span class="text-[10px] font-bold uppercase tracking-widest text-slate-600">${app.status}</span>
            </div>
          </td>
          <td class="px-10 py-8 text-right space-x-2" id="act-${app.id}"></td>
        `;
        container.appendChild(tr);
        renderActionBtns(app);
      });
      createIcons({ icons: { CheckCircle, XCircle, Clock } });
    } catch (e) {}
  };

  const loadCollegesTab = async () => {
    try {
      const colleges = await api.get("/colleges");
      const body = document.querySelector("#collListBody");
      body.innerHTML = colleges.length
        ? ""
        : '<tr><td colspan="3" class="p-10 text-center text-slate-400">No colleges registered.</td></tr>';

      colleges.forEach((c) => {
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50/50 transition-colors group";
        tr.innerHTML = `
          <td class="px-10 py-6">
            <div class="font-black text-slate-800 text-sm uppercase tracking-tight group-hover:text-brand-green transition-colors">${c.name}</div>
          </td>
          <td class="px-10 py-6">
            <div class="text-xs text-slate-500 font-medium">${c.description || "No description provided."}</div>
          </td>
          <td class="px-10 py-6 text-right space-x-2">
            <button class="edit-coll-btn p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-brand-green hover:text-white transition-all shadow-sm border border-slate-100" data-id="${c.id}">
              <i data-lucide="edit" class="w-4 h-4"></i>
            </button>
            <button class="del-coll-btn p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-slate-100" data-id="${c.id}">
              <i data-lucide="trash2" class="w-4 h-4"></i>
            </button>
          </td>
        `;
        body.appendChild(tr);
      });

      document.getElementById("addCollegeBtn").onclick = () =>
        showCollegeModal();
      document.querySelectorAll(".edit-coll-btn").forEach((btn) => {
        btn.onclick = () =>
          showCollegeModal(colleges.find((c) => c.id == btn.dataset.id));
      });
      document.querySelectorAll(".del-coll-btn").forEach((btn) => {
        btn.onclick = async () => {
          if (
            await modal.confirm(
              "Delete College",
              "Are you sure? This will remove all associated programs.",
            )
          ) {
            await api.delete(`/colleges/${btn.dataset.id}`);
            loadCollegesTab();
          }
        };
      });
      createIcons({ icons: { Edit, Trash2, Plus } });
    } catch (e) {
      console.error("Load Colleges Error:", e);
    }
  };

  const loadProgramsTab = async () => {
    try {
      const [programs, colleges] = await Promise.all([
        api.get("/programs"),
        api.get("/colleges"),
      ]);
      const body = document.querySelector("#progListBody");
      if (!body) return;

      if (!programs.length) {
        body.innerHTML =
          '<tr><td colspan="3" class="p-10 text-center text-slate-400 font-medium">No academic programs found.</td></tr>';
        return;
      }

      // Group programs by college
      const grouped = colleges.map((college) => ({
        ...college,
        programs: programs.filter((p) => p.college?.id === college.id),
      }));

      body.innerHTML = "";
      grouped.forEach((group) => {
        // Render College Header Row
        const headerTr = document.createElement("tr");
        headerTr.className = "bg-slate-50/80 sticky top-0 z-10";
        headerTr.innerHTML = `
          <td colspan="3" class="px-10 py-4">
             <div class="flex items-center space-x-2">
                <div class="w-1.5 h-6 bg-brand-green rounded-full"></div>
                <div>
                   <span class="text-[10px] font-black text-brand-green uppercase tracking-[0.2em] block leading-none mb-1">Department</span>
                   <span class="text-sm font-black text-slate-800 uppercase tracking-tight italic">${group.name}</span>
                </div>
             </div>
          </td>
        `;
        body.appendChild(headerTr);

        if (group.programs.length === 0) {
          const emptyTr = document.createElement("tr");
          emptyTr.innerHTML = `<td colspan="3" class="px-10 py-6 text-[10px] text-slate-300 uppercase font-black tracking-widest italic">No programs registered for this department</td>`;
          body.appendChild(emptyTr);
        }

        group.programs.forEach((p) => {
          const tr = document.createElement("tr");
          tr.className =
            "hover:bg-slate-100/30 transition-colors group border-b border-slate-50/50";
          tr.innerHTML = `
            <td class="px-10 py-5 pl-16">
              <div class="font-bold text-slate-700 text-sm group-hover:text-brand-green transition-colors">${p.name}</div>
            </td>
            <td class="px-10 py-5">
              <div class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Active Curriculum</div>
            </td>
            <td class="px-10 py-5 text-right space-x-2">
              <button class="edit-prog-btn p-3 bg-white rounded-xl text-slate-400 hover:bg-brand-green hover:text-white transition-all shadow-sm border border-slate-100 active:scale-95" data-id="${p.id}">
                <i data-lucide="edit" class="w-4 h-4 pointer-events-none"></i>
              </button>
              <button class="del-prog-btn p-3 bg-white rounded-xl text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-slate-100 active:scale-95" data-id="${p.id}">
                <i data-lucide="trash2" class="w-4 h-4 pointer-events-none"></i>
              </button>
            </td>
          `;
          body.appendChild(tr);
        });
      });

      // Handle programs without a valid college link
      const unassigned = programs.filter(
        (p) => !p.college || !colleges.find((c) => c.id === p.college.id),
      );
      if (unassigned.length > 0) {
        const headerTr = document.createElement("tr");
        headerTr.className = "bg-rose-50/50";
        headerTr.innerHTML = `<td colspan="3" class="px-10 py-4 text-[10px] font-black text-rose-400 uppercase tracking-widest">Unassigned Courses</td>`;
        body.appendChild(headerTr);

        unassigned.forEach((p) => {
          const tr = document.createElement("tr");
          tr.className = "hover:bg-slate-50/50 transition-colors group";
          tr.innerHTML = `
             <td class="px-10 py-5 pl-16">
               <div class="font-bold text-slate-700 text-sm">${p.name}</div>
             </td>
             <td class="px-10 py-5">
               <div class="text-[8px] font-black text-rose-300 uppercase tracking-widest">Needs Affiliation</div>
             </td>
             <td class="px-10 py-5 text-right space-x-2">
               <button class="edit-prog-btn p-3 bg-white rounded-xl text-brand-green border border-brand-green/20" data-id="${p.id}">
                 <i data-lucide="edit" class="w-4 h-4 pointer-events-none"></i>
               </button>
               <button class="del-prog-btn p-3 bg-white rounded-xl text-rose-500 border border-rose-100" data-id="${p.id}">
                 <i data-lucide="trash2" class="w-4 h-4 pointer-events-none"></i>
               </button>
             </td>
           `;
          body.appendChild(tr);
        });
      }

      document.getElementById("addProgramBtn").onclick = () =>
        showProgramModal(null, colleges);
      document.querySelectorAll(".edit-prog-btn").forEach((btn) => {
        btn.onclick = () =>
          showProgramModal(
            programs.find((p) => p.id == btn.dataset.id),
            colleges,
          );
      });
      document.querySelectorAll(".del-prog-btn").forEach((btn) => {
        btn.onclick = async () => {
          if (
            await modal.confirm(
              "Delete Program",
              "Permanently remove this academic program?",
            )
          ) {
            await api.delete(`/programs/${btn.dataset.id}`);
            loadProgramsTab();
          }
        };
      });
      createIcons({ icons: { Edit, Trash2, Plus } });
    } catch (e) {
      console.error("Load Programs Error:", e);
    }
  };

  const showCollegeModal = (college = null) => {
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in";
    overlay.innerHTML = `
      <div class="bg-white rounded-4xl shadow-2xl max-w-sm w-full p-8 animate-fade-in relative border border-white/20">
        <h3 class="text-xl font-black text-slate-800 uppercase tracking-tighter mb-6">${college ? "Edit College" : "Register College"}</h3>
        <div class="space-y-5">
          <div class="space-y-1.5">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Name</label>
            <input type="text" id="collName" value="${college?.name || ""}" placeholder="e.g. College of Engineering" class="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all font-bold text-xs">
          </div>
          <div class="space-y-1.5">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Core Description</label>
            <textarea id="collDesc" placeholder="Brief overview of the college scope..." class="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all font-medium text-xs h-24">${college?.description || ""}</textarea>
          </div>
        </div>
        <div class="flex space-x-2 mt-8">
          <button id="cancelColl" class="flex-1 py-3.5 bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[9px] rounded-xl transition-all">Cancel</button>
          <button id="saveColl" class="flex-2 py-3.5 bg-brand-green text-white font-black uppercase tracking-widest text-[9px] rounded-xl shadow-lg shadow-brand-green/20 transition-all flex items-center justify-center space-x-2">
            <i data-lucide="save" class="w-3 h-3 pointer-events-none"></i>
            <span>${college ? "Update" : "Register"}</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    createIcons({ icons: { Save } });

    document.getElementById("cancelColl").onclick = () => overlay.remove();
    document.getElementById("saveColl").onclick = async () => {
      const name = document.getElementById("collName").value;
      const description = document.getElementById("collDesc").value;
      if (!name)
        return modal.show("Validation", "College name is required.", "error");

      try {
        if (college) {
          await api.put(`/colleges/${college.id}`, { name, description });
        } else {
          await api.post("/colleges", { name, description });
        }
        overlay.remove();
        loadCollegesTab();
      } catch (e) {
        console.error("Save College Error:", e);
      }
    };
  };

  const showProgramModal = (prog = null, colleges = []) => {
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in";
    overlay.innerHTML = `
      <div class="bg-white rounded-4xl shadow-2xl max-w-sm w-full p-8 animate-fade-in relative border border-white/20">
        <h3 class="text-xl font-black text-slate-800 uppercase tracking-tighter mb-6">${prog ? "Edit Course" : "Curriculum Registry"}</h3>
        <div class="space-y-5">
          <div class="space-y-1.5">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Program Name</label>
            <input type="text" id="progName" value="${prog?.name || ""}" placeholder="e.g. BS in Information Systems" class="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all font-bold text-xs">
          </div>
          <div class="space-y-1.5">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Affiliated Department</label>
            <select id="progColl" class="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-green transition-all outline-none font-bold text-xs appearance-none">
              <option value="">Select College Affiliate...</option>
              ${colleges.map((c) => `<option value="${c.id}" ${prog?.college?.id == c.id ? "selected" : ""}>${c.name}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="flex space-x-2 mt-8">
          <button id="cancelProg" class="flex-1 py-3.5 bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[9px] rounded-xl transition-all">Cancel</button>
          <button id="saveProg" class="flex-2 py-3.5 bg-brand-green text-white font-black uppercase tracking-widest text-[9px] rounded-xl shadow-lg shadow-brand-green/20 transition-all flex items-center justify-center space-x-2">
            <i data-lucide="save" class="w-3 h-3 pointer-events-none"></i>
            <span>${prog ? "Update" : "Register Course"}</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    createIcons({ icons: { Save } });

    document.getElementById("cancelProg").onclick = () => overlay.remove();
    document.getElementById("saveProg").onclick = async () => {
      const name = document.getElementById("progName").value;
      const collegeId = document.getElementById("progColl").value;
      if (!name || !collegeId)
        return modal.show(
          "Validation",
          "Name and Affiliate required.",
          "error",
        );

      try {
        if (prog) {
          await api.put(`/programs/${prog.id}`, {
            name,
            collegeId: parseInt(collegeId),
          });
        } else {
          await api.post("/programs", { name, collegeId: parseInt(collegeId) });
        }
        overlay.remove();
        loadProgramsTab();
      } catch (e) {
        console.error("Save Program Error:", e);
      }
    };
  };

  function renderActionBtns(app) {
    const cell = document.querySelector(`#act-${app.id}`);
    if (!cell) return;
    cell.innerHTML = "";
    cell.className =
      "px-10 py-8 text-right flex items-center justify-end space-x-2";

    if (app.status === "PENDING") {
      const b1 = document.createElement("button");
      b1.className =
        "inline-flex items-center justify-center p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm border border-emerald-100 group/btn";
      b1.title = "Accept Student";
      b1.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 pointer-events-none"></i>`;
      b1.onclick = async () => {
        if (
          await modal.confirm("Accept Student", `Accept ${app.student.name}?`)
        ) {
          await api.patch(`/applications/${app.id}/status`, {
            status: "ACCEPTED",
          });
          loadAdmissions();
        }
      };

      const b2 = document.createElement("button");
      b2.className =
        "inline-flex items-center justify-center p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-rose-100 group/btn";
      b2.title = "Reject Application";
      b2.innerHTML = `<i data-lucide="x-circle" class="w-5 h-5 pointer-events-none"></i>`;
      b2.onclick = async () => {
        if (
          await modal.confirm("Reject Student", `Reject ${app.student.name}?`)
        ) {
          await api.patch(`/applications/${app.id}/status`, {
            status: "REJECTED",
          });
          loadAdmissions();
        }
      };
      cell.appendChild(b1);
      cell.appendChild(b2);
    } else if (app.status === "ACCEPTED") {
      const b3 = document.createElement("button");
      b3.className =
        "inline-flex items-center space-x-2 px-6 py-2 rounded-xl bg-brand-green text-white font-black text-[10px] uppercase tracking-widest hover:bg-brand-hover transition-all shadow-lg shadow-brand-green/20";
      b3.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 pointer-events-none"></i> <span>Final Enroll</span>`;
      b3.onclick = async () => {
        if (
          await modal.confirm(
            "Final Enrollment",
            `Enroll ${app.student.name} in CPSU?`,
          )
        ) {
          await api.patch(`/applications/${app.id}/status`, {
            status: "ENROLLED",
          });
          loadAdmissions();
        }
      };
      cell.appendChild(b3);
    } else {
      cell.innerHTML =
        '<span class="text-[10px] text-brand-green font-black uppercase tracking-widest italic tracking-tighter mr-2">Verified Enrollment</span>';
    }

    // Always add Delete option for faculty
    const delBtn = document.createElement("button");
    delBtn.className =
      "inline-flex items-center justify-center p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-slate-100 group/btn";
    delBtn.title = "Remove Record";
    delBtn.innerHTML = `<i data-lucide="trash2" class="w-4 h-4 pointer-events-none"></i>`;
    delBtn.onclick = async () => {
      if (
        await modal.confirm(
          "Delete Record",
          `Permanently remove enrollment record for ${app.student.name}? This cannot be undone.`,
        )
      ) {
        await api.delete(`/applications/${app.id}`);
        loadAdmissions();
      }
    };
    cell.appendChild(delBtn);
    createIcons({ icons: { CheckCircle, XCircle, Trash2 } });
  }

  const showManualEnrollModal = async () => {
    try {
      const [users, programs] = await Promise.all([
        api.get("/users"),
        api.get("/programs"),
      ]);
      const students = users.filter((u) => u.role === "STUDENT");

      const overlay = document.createElement("div");
      overlay.className =
        "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in";
      overlay.innerHTML = `
        <div class="bg-white rounded-4xl shadow-2xl max-w-sm w-full p-8 animate-fade-in relative border border-white/20">
          <div class="mb-6">
            <h3 class="text-xl font-black text-slate-800 uppercase tracking-tighter">Manual Enrollment</h3>
            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Bypass standard application process</p>
          </div>
          <div class="space-y-5">
            <div class="space-y-1.5">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Student</label>
              <select id="enrollStudent" class="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 transition-all outline-none font-bold text-xs appearance-none">
                <option value="">Choose Student...</option>
                ${students.map((s) => `<option value="${s.id}">${s.name} (${s.email})</option>`).join("")}
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Assign Program</label>
              <select id="enrollProg" class="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 transition-all outline-none font-bold text-xs appearance-none">
                <option value="">Choose Program...</option>
                ${programs.map((p) => `<option value="${p.id}">${p.name}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="flex space-x-2 mt-8">
            <button id="cancelEnroll" class="flex-1 py-3.5 bg-slate-50 text-slate-400 font-black uppercase tracking-widest text-[9px] rounded-xl transition-all">Cancel</button>
            <button id="confirmEnroll" class="flex-[2] py-3.5 bg-indigo-600 text-white font-black uppercase tracking-widest text-[9px] rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2">
              <i data-lucide="user-check" class="w-3 h-3"></i>
              <span>Enroll Now</span>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      createIcons({ icons: { UserCheck } });

      document.getElementById("cancelEnroll").onclick = () => overlay.remove();
      document.getElementById("confirmEnroll").onclick = async () => {
        const studentId = document.getElementById("enrollStudent").value;
        const programId = document.getElementById("enrollProg").value;
        if (!studentId || !programId)
          return modal.show(
            "Validation",
            "Please select both student and program.",
            "error",
          );

        try {
          await api.post("/applications/manual-enroll", {
            studentId: parseInt(studentId),
            programId: parseInt(programId),
          });
          overlay.remove();
          modal.show(
            "Success",
            "Student has been manually enrolled.",
            "success",
          );
          if (activeTab === "admissions") loadAdmissions();
          if (activeTab === "dashboard") loadTabContent();
        } catch (e) {
          console.error("Enrollment Error:", e);
          modal.show("Error", "Failed to enroll student.", "error");
        }
      };
    } catch (e) {
      console.error("Manual Enroll Setup Error:", e);
    }
  };

  renderLayout();
  loadTabContent();
}
