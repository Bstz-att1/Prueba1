export const listRole = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Lista de roles</h1>
    <div id="roles-list-state">Cargando roles...</div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="tabla-roles"></tbody>
    </table>
    <button id="back-roles" type="button">Volver</button>
  </section>
`;
