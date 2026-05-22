export const editRole = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Editar rol</h1>
    <form id="form-editar-rol">
      <div>
        <label for="edit-role-name">Nombre</label>
        <input id="edit-role-name" name="nombre" type="text" />
      </div>
      <div>
        <label for="edit-role-description">Descripción</label>
        <input id="edit-role-description" name="descripcion" type="text" />
      </div>
      <button type="submit">Guardar cambios</button>
      <button id="cancel-edit-role" type="button">Cancelar</button>
    </form>
  </section>
`;
