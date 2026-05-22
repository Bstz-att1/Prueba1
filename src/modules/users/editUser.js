export const editUser = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Editar usuario</h1>
    <form id="form-editar">
      <div>
        <label for="edit-nombre">Nombre</label>
        <input id="edit-nombre" name="nombre" type="text" />
      </div>
      <div>
        <label for="edit-email">Email</label>
        <input id="edit-email" name="email" type="email" />
      </div>
      <button type="submit">Guardar cambios</button>
      <button id="cancel-edit-user" type="button">Cancelar</button>
    </form>
  </section>
`;
