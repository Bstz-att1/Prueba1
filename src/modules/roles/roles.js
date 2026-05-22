export const roles = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Gestión de roles</h1>
    <p>Crea y administra roles del sistema.</p>

    <form id="create-role-form">
      <div>
        <label for="role-name">Nombre</label>
        <input id="role-name" name="nombre" type="text" required />
      </div>

      <div>
        <label for="role-description">Descripción</label>
        <textarea id="role-description" name="descripcion" rows="3"></textarea>
      </div>

      <div class="module-actions">
        <button id="submit-create-role" type="submit">Crear rol</button>
        <button id="go-list-role" type="button">Ver lista de roles</button>
      </div>
    </form>
  </section>
`;
