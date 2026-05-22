export const listUser = () => `
  <section class="animate__animated animate__fadeIn">
    <h1>Lista de usuarios</h1>
    <div id="users-list-state">Cargando usuarios...</div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="tabla-usuarios"></tbody>
    </table>
    <button id="back-users" type="button">Volver</button>
  </section>
`;
