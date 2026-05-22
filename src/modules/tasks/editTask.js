export const editTask = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Editar tarea</h1>
    <form id="form-editar-tarea">
      <div>
        <label for="edit-task-title">Título</label>
        <input id="edit-task-title" name="titulo" type="text" />
      </div>
      <div>
        <label for="edit-task-status">Estado</label>
        <input id="edit-task-status" name="estado" type="text" />
      </div>
      <button type="submit">Guardar cambios</button>
      <button id="cancel-edit-task" type="button">Cancelar</button>
    </form>
  </section>
`;
