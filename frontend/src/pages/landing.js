import {
  createIcons,
  GraduationCap,
  Users,
  FileText,
  ArrowRight,
} from "lucide";

export function renderLanding(container, onSelect) {
  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-6 bg-slate-100/50 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-brand-green mix-blend-multiply filter blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 mix-blend-multiply filter blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="z-10 w-full max-w-md bg-white rounded-4xl shadow-2xl p-12 animate-fade-in border border-white/50 text-center space-y-12 relative">
        <div class="absolute -top-4 -left-4 bg-brand-green text-white p-3 rounded-2xl shadow-xl -rotate-12 animate-bounce">
           <i data-lucide="graduation-cap" class="w-6 h-6"></i>
        </div>
        
        <div>
          <h2 class="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-2">Select Gateway</h2>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] italic">Central Philippines State University</p>
        </div>

        <div class="space-y-4">
          <button id="btnStudent" class="group w-full py-5 bg-brand-green hover:bg-brand-hover text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl shadow-brand-green/30 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-between px-8">
            <div class="flex items-center space-x-4">
               <i data-lucide="graduation-cap" class="w-5 h-5 opacity-70"></i>
               <span>Student Portal</span>
            </div>
            <i data-lucide="arrow-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"></i>
          </button>

          <button id="btnFaculty" class="group w-full py-5 bg-white border-2 border-slate-100 hover:border-brand-green text-slate-600 hover:text-brand-green font-black uppercase tracking-widest text-sm rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-between px-8">
            <div class="flex items-center space-x-4">
               <i data-lucide="users" class="w-5 h-5 opacity-70"></i>
               <span>Faculty Admission</span>
            </div>
            <i data-lucide="arrow-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"></i>
          </button>
          
          <button disabled class="w-full py-5 bg-slate-50 text-slate-300 font-black uppercase tracking-widest text-[10px] rounded-2xl cursor-not-allowed border border-slate-100 flex items-center justify-center space-x-3">
            <i data-lucide="file-text" class="w-4 h-4"></i>
            <span>Document Request Center</span>
          </button>
        </div>

        <div class="flex flex-col items-center border-t border-slate-50 pt-8 mt-4">
          <div class="w-20 h-20 bg-slate-50 rounded-3xl p-4 mb-4 shadow-inner group transition-transform hover:scale-110">
             <img src="/enrollment.png" alt="Logo" class="w-full h-full object-contain grayscale opacity-50 contrast-125">
          </div>
          <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed max-w-[200px]">
            Managed by Management Information System Office (MISO)
          </p>
        </div>
      </div>
    </div>
  `;

  document
    .querySelector("#btnStudent")
    .addEventListener("click", () => onSelect("STUDENT"));
  document
    .querySelector("#btnFaculty")
    .addEventListener("click", () => onSelect("FACULTY"));

  createIcons({ icons: { GraduationCap, Users, FileText, ArrowRight } });
}
