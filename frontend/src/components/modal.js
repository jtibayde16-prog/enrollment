export const modal = {
  show: (title, message, type = "info") => {
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in";

    const colors = {
      success: "text-brand-green bg-emerald-50 border-brand-green/20",
      error: "text-rose-600 bg-rose-50 border-rose-200",
      info: "text-cyan-600 bg-cyan-50 border-cyan-100",
    };

    overlay.innerHTML = `
      <div class="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full p-10 transform transition-all animate-fade-in scale-100 border border-white/20 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent -z-10"></div>
        <div class="flex flex-col items-center text-center space-y-6">
          <div class="h-20 w-20 rounded-3xl ${colors[type] || colors.info} border-2 flex items-center justify-center mb-2 shadow-inner group transition-transform hover:scale-105">
             <i data-lucide="${type === "success" ? "check-circle" : type === "error" ? "alert-triangle" : "info"}" class="w-10 h-10"></i>
          </div>
          <div>
            <h3 class="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-3">${title}</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium">${message}</p>
          </div>
          <button id="modalClose" class="w-full py-4 bg-brand-green hover:bg-brand-hover text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-brand-green/30 active:scale-95 transition-all">
            Dismiss Notification
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    // Dynamic import to avoid circular dep or missing lib issues
    import("lucide").then(
      ({ createIcons, CheckCircle, AlertTriangle, Info }) => {
        createIcons({ icons: { CheckCircle, AlertTriangle, Info } });
      },
    );

    return new Promise((resolve) => {
      document.querySelector("#modalClose").onclick = () => {
        overlay.classList.add("opacity-0");
        setTimeout(() => {
          overlay.remove();
          resolve();
        }, 200);
      };
    });
  },

  confirm: (title, message) => {
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in";

    overlay.innerHTML = `
      <div class="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full p-10 animate-fade-in relative overflow-hidden border border-white/20">
        <div class="absolute inset-0 bg-gradient-to-b from-amber-50/20 to-transparent -z-10"></div>
        <div class="flex flex-col items-center text-center space-y-6">
          <div class="h-20 w-20 rounded-3xl text-amber-600 bg-amber-50 border-2 border-amber-100 flex items-center justify-center mb-2 shadow-sm">
            <i data-lucide="help-circle" class="w-10 h-10"></i>
          </div>
          <div>
            <h3 class="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-3">${title}</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium">${message}</p>
          </div>
          <div class="flex space-x-3 w-full mt-2">
            <button id="confirmCancel" class="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-black uppercase tracking-widest text-xs rounded-2xl transition-all active:scale-95">
              Cancel
            </button>
            <button id="confirmYes" class="flex-1 py-4 bg-brand-green hover:bg-brand-hover text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-brand-green/30 transition-all active:scale-95">
              Confirm
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    import("lucide").then(({ createIcons, HelpCircle }) => {
      createIcons({ icons: { HelpCircle } });
    });

    return new Promise((resolve) => {
      const cleanup = (val) => {
        overlay.classList.add("opacity-0");
        setTimeout(() => {
          overlay.remove();
          resolve(val);
        }, 200);
      };
      document.querySelector("#confirmYes").onclick = () => cleanup(true);
      document.querySelector("#confirmCancel").onclick = () => cleanup(false);
    });
  },
};
