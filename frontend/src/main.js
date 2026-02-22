import "./style.css";
import { renderLanding } from "./pages/landing.js";
import { renderLogin } from "./pages/login.js";
import { renderStudentDashboard } from "./pages/student.js";
import { renderFacultyDashboard } from "./pages/faculty.js";

const app = document.querySelector("#app");

let state = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  selectedPortal: null,
};

function navigate() {
  if (state.user) {
    if (state.user.role === "FACULTY" || state.user.role === "ADMIN") {
      renderFacultyDashboard(app, state.user, handleLogout);
    } else {
      renderStudentDashboard(app, state.user, handleLogout);
    }
  } else if (state.selectedPortal) {
    renderLogin(app, handleLoginSuccess);
  } else {
    renderLanding(app, (portal) => {
      state.selectedPortal = portal;
      navigate();
    });
  }
}

function handleLoginSuccess(user) {
  state.user = user;
  state.selectedPortal = null;
  localStorage.setItem("user", JSON.stringify(user));
  navigate();
}

function handleLogout() {
  state.user = null;
  state.selectedPortal = null;
  localStorage.removeItem("user");
  navigate();
}

navigate();
