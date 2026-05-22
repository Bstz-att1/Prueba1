import { loginWithCredentials } from '../../services/authService.js';
import { userPost } from '../../api/users.api.js';

export const loginView = () => `
  <section class="auth-screen">
    <div class="auth-card">
      <h2>Iniciar Sesión</h2>
      <p>Ingresa con tu documento y contraseña para acceder al sistema.</p>

      <form id="login-form" class="auth-form">
        <div class="form-group">
          <label for="login-document" class="form-label">Documento</label>
          <input type="text" id="login-document" class="form-input" placeholder="Ej: 12345678" required>
        </div>

        <div class="form-group">
          <label for="login-password" class="form-label">Contraseña</label>
          <input type="password" id="login-password" class="form-input" placeholder="********" required>
        </div>

        <span id="login-error" class="field-error"></span>

        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </form>

      <p style="margin-top: 1rem;">
        ¿No tienes cuenta? <a href="#/register">Regístrate aquí</a>
      </p>
    </div>
  </section>
`;

export const loginController = () => {
  const form = document.getElementById('login-form');
  const documentInput = document.getElementById('login-document');
  const passwordInput = document.getElementById('login-password');
  const errorNode = document.getElementById('login-error');

  if (!form) return null;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (errorNode) errorNode.textContent = '';

    const documentValue = documentInput?.value?.trim();
    const passwordValue = passwordInput?.value?.trim();

    if (!documentValue || !passwordValue) {
      if (errorNode) errorNode.textContent = 'Documento y contraseña son requeridos.';
      return;
    }

    try {
      await loginWithCredentials(documentValue, passwordValue);
      window.location.hash = '#/home';
    } catch (error) {
      if (errorNode) errorNode.textContent = error?.message || 'No fue posible iniciar sesión.';
    }
  };

  form.addEventListener('submit', onSubmit);

  return () => {
    form.removeEventListener('submit', onSubmit);
  };
};

export const registerView = () => `
  <section class="auth-screen">
    <div class="auth-card">
      <h2>Crear cuenta</h2>
      <p>Registra tu usuario para poder iniciar sesión en la plataforma.</p>

      <form id="register-form" class="auth-form">
        <div class="form-group">
          <label for="register-name" class="form-label">Nombre</label>
          <input type="text" id="register-name" class="form-input" required>
        </div>

        <div class="form-group">
          <label for="register-email" class="form-label">Correo</label>
          <input type="email" id="register-email" class="form-input" required>
        </div>

        <div class="form-group">
          <label for="register-document" class="form-label">Documento</label>
          <input type="text" id="register-document" class="form-input" minlength="4" required>
        </div>

        <div class="form-group">
          <label for="register-password" class="form-label">Contraseña</label>
          <input type="password" id="register-password" class="form-input" minlength="6" required>
        </div>

        <span id="register-error" class="field-error"></span>
        <span id="register-success" class="field-success"></span>

        <button type="submit" class="btn btn-primary">Crear cuenta</button>
      </form>

      <p style="margin-top: 1rem;">
        ¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a>
      </p>
    </div>
  </section>
`;

export const registerController = () => {
  const form = document.getElementById('register-form');
  const nameInput = document.getElementById('register-name');
  const emailInput = document.getElementById('register-email');
  const documentInput = document.getElementById('register-document');
  const passwordInput = document.getElementById('register-password');
  const errorNode = document.getElementById('register-error');
  const successNode = document.getElementById('register-success');

  if (!form) return null;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (errorNode) errorNode.textContent = '';
    if (successNode) successNode.textContent = '';

    const name = nameInput?.value?.trim();
    const email = emailInput?.value?.trim();
    const document = documentInput?.value?.trim();
    const password = passwordInput?.value?.trim();

    if (!name || !email || !document || !password) {
      if (errorNode) errorNode.textContent = 'Todos los campos son obligatorios.';
      return;
    }

    try {
      await userPost(name, email, document, password, 'usuario');
      if (successNode) {
        successNode.textContent = 'Cuenta creada correctamente. Redirigiendo a inicio de sesión...';
      }
      form.reset();
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 800);
    } catch (error) {
      if (errorNode) errorNode.textContent = error?.message || 'No fue posible crear la cuenta.';
    }
  };

  form.addEventListener('submit', onSubmit);

  return () => {
    form.removeEventListener('submit', onSubmit);
  };
};
