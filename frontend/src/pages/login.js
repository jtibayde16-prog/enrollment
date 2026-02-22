import { api } from "../api.js";
import { modal } from "../components/modal.js";
import {
  createIcons,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
} from "lucide";

export function renderLogin(container, onLoginSuccess) {
  let isRegister = false;

  function updateView() {
    container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-6 bg-slate-100/50 relative overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-brand-green mix-blend-multiply filter blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 mix-blend-multiply filter blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div class="z-10 w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in border border-white/50 relative">
          <!-- Brand Section (Left) -->
          <div class="md:w-1/2 bg-brand-dark p-16 flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-transparent opacity-50"></div>
             <div class="z-10 w-40 h-40 bg-white rounded-4xl p-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform">
               <img src="/enrollment.png" alt="Logo" class="w-full h-full object-contain">
            </div>
            <div class="z-10">
              <h1 class="text-5xl font-black text-white tracking-widest uppercase leading-none mb-4">CPSU</h1>
              <div class="h-1 w-12 bg-brand-green mx-auto rounded-full mb-4"></div>
              <p class="text-emerald-100/40 text-[10px] font-black tracking-widest uppercase leading-loose text-center">Central Philippines State University<br>Academic Management System</p>
            </div>
          </div>

          <!-- Form Section (Right) -->
          <div class="md:w-1/2 p-16 flex flex-col justify-center bg-white relative">
            <div class="text-center mb-10">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-slate-50 rounded-xl text-brand-green mb-4">
                 <i data-lucide="${isRegister ? "user-plus" : "log-in"}" class="w-6 h-6"></i>
              </div>
              <h2 class="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-2 text-center w-full">${isRegister ? "New Account" : "Welcome Back"}</h2>
              <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">${isRegister ? "Register to start session" : "Sign in to your account"}</p>
            </div>

            <form id="authForm" class="space-y-4">
              ${
                isRegister
                  ? `
                <div class="relative group">
                  <input type="text" id="regName" placeholder="Full Name" required
                    class="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all placeholder:text-slate-400 font-bold text-sm">
                  <i data-lucide="user" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"></i>
                </div>
                <div class="relative group">
                  <select id="regRole" required
                    class="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all appearance-none font-bold text-sm text-slate-800">
                    <option value="STUDENT">Register as Student</option>
                    <option value="FACULTY">Register as Faculty</option>
                  </select>
                  <i data-lucide="shield-check" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"></i>
                </div>
              `
                  : ""
              }
              <div class="relative group">
                <input type="email" id="email" placeholder="Email Address" required
                  class="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all placeholder:text-slate-400 font-bold text-sm">
                <i data-lucide="mail" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"></i>
              </div>
              <div class="relative group">
                <input type="password" id="password" placeholder="Password" required
                  class="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none transition-all placeholder:text-slate-400 font-bold text-sm">
                <i data-lucide="lock" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-green"></i>
              </div>
              
              <button type="submit" 
                class="w-full py-5 bg-brand-green hover:bg-brand-hover text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-brand-green/30 active:scale-[0.98] transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3 mt-6">
                <i data-lucide="${isRegister ? "user-plus" : "log-in"}" class="w-4 h-4"></i>
                <span>${isRegister ? "Create Account" : "Authenticate"}</span>
              </button>
            </form>

            <div class="mt-10 text-center">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                ${isRegister ? "Already have an account?" : "Don't have an account?"}
                <button id="toggleAuth" class="text-brand-green font-black hover:underline ml-2">
                  ${isRegister ? "Login here" : "Register now"}
                </button>
              </p>
            </div>
          </div>
        </div>

        <button id="backBtn" class="absolute top-10 left-10 text-slate-400 hover:text-brand-green font-black uppercase tracking-widest text-[10px] flex items-center space-x-2 transition-all p-3 bg-white rounded-2xl shadow-lg border border-slate-50">
           <i data-lucide="arrow-right" class="w-4 h-4 rotate-180"></i>
           <span>Back to Selection</span>
        </button>
      </div>
    `;

    document.querySelector("#toggleAuth").addEventListener("click", (e) => {
      e.preventDefault();
      isRegister = !isRegister;
      updateView();
    });

    document.querySelector("#backBtn").onclick = () => window.location.reload();

    document
      .querySelector("#authForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.querySelector("#email").value;

        try {
          const users = await api.get("/users");
          let user = users.find((u) => u.email === email);

          if (isRegister) {
            if (user)
              return modal.show(
                "Error",
                "This email is already registered.",
                "error",
              );
            const name = document.querySelector("#regName").value;
            const role = document.querySelector("#regRole").value;
            await api.post("/users", { name, email, role });
            await modal.show(
              "Success",
              "Profile created! You can now log in.",
              "success",
            );
            isRegister = false;
            updateView();
          } else {
            if (!user)
              return modal.show(
                "Security",
                "Unauthorized. Please register your account.",
                "error",
              );
            onLoginSuccess(user);
          }
        } catch (err) {
          modal.show("System", "Server connectivity issues detected.", "error");
        }
      });

    createIcons({
      icons: { LogIn, UserPlus, Mail, Lock, User, ShieldCheck, ArrowRight },
    });
  }

  updateView();
}
