export const tasks = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Gestión de tareas</h1>
    <p>Crea y administra tareas del sistema.</p>

    <form id="create-task-form">
      <div>
        <label for="task-title">Título</label>
        <input id="task-title" name="titulo" type="text" required />
      </div>

      <div>
        <label for="task-description">Descripción</label>
        <textarea id="task-description" name="descripcion" rows="3"></textarea>
      </div>

      <div>
        <label for="task-user-id">ID Usuario asignado</label>
        <input id="task-user-id" name="userId" type="text" required />
      </div>

      <div class="module-actions">
        <button id="submit-create-task" type="submit">Crear tarea</button>
        <button id="go-list-task" type="button">Ver lista de tareas</button>
      </div>
    </form>
  </section>
`;
