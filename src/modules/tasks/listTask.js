export const listTask = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Lista de tareas</h1>
    <div id="tasks-list-state">Cargando tareas...</div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="tabla-tareas"></tbody>
    </table>
    <button id="back-tasks" type="button">Volver</button>
  </section>
`;
