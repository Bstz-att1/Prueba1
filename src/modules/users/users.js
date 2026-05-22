export const users = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Usuarios</h1>
    <p>Gestiona usuarios del sistema.</p>

    <form id="user-create-form" autocomplete="off">
      <div>
        <label for="user-create-nombre">Nombre</label>
        <input id="user-create-nombre" name="nombre" type="text" required />
      </div>
      <div>
        <label for="user-create-email">Email</label>
        <input id="user-create-email" name="email" type="email" required />
      </div>
      <div>
        <label for="user-create-documento">Documento</label>
        <input id="user-create-documento" name="documento" type="text" required />
      </div>
      <div>
        <label for="user-create-rol">Rol</label>
        <select id="user-create-rol" name="rol">
          <option value="usuario">usuario</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div>
        <label for="user-create-password">Contraseña</label>
        <input id="user-create-password" name="password" type="password" minlength="6" required />
      </div>
      <button type="submit">Crear usuario</button>
    </form>

    <div class="module-actions" style="margin-top:1rem;">
      <button id="go-list-user" type="button">Ver lista de usuarios</button>
    </div>
  </section>
`;
