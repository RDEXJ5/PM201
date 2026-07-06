import { login, setSession } from "../api.js";

document.body.className = "page-login";
document.body.innerHTML = `<form class="login-card" id="loginForm"><div class="logo-cup"><div class="logo-lines"><span></span><span></span><span></span></div></div><h1>Coffee Manager</h1><p>Administración Artesanal</p><div id="msg" class="message"></div><label class="form-label">Correo Electrónico</label><div class="input-wrap"><span class="input-icon">✉</span><input class="text-input" id="email" type="email" placeholder="gerente@cafeteria.com" required></div><label class="form-label">Contraseña</label><div class="input-wrap"><span class="input-icon">🔒</span><input class="text-input" id="password" type="password" placeholder="••••••••" required></div><div class="login-options"><label class="checkbox-line"><input id="remember" type="checkbox">Recordar este equipo</label><button type="button" id="forgot" class="link-btn">¿Olvidaste tu contraseña?</button></div><button class="btn-primary btn-full" type="submit">Iniciar Sesión →</button><div class="login-footer">Gestiona tu negocio con precisión.<br>© 2026 Coffee Manager Enterprise.</div><div class="status-online">SISTEMAS EN LÍNEA</div></form>`;
const msg = document.getElementById("msg");
function show(t, type = "error") {
  msg.textContent = t;
  msg.className = `message ${type} show`;
}
const remembered = localStorage.getItem("coffee_remember_email");
if (remembered) {
  email.value = remembered;
  remember.checked = true;
}
document.getElementById("forgot").onclick = () =>
  show(
    "Solicita al administrador restablecer la contraseña del usuario.",
    "info",
  );
document.getElementById("loginForm").onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  try {
    const data = await login(email, password);
    setSession(data);
    if (remember.checked) localStorage.setItem("coffee_remember_email", email);
    else localStorage.removeItem("coffee_remember_email");
    location.href = "dashboard.html";
  } catch (err) {
    show(err.message || "No se pudo iniciar sesión");
  }
};
