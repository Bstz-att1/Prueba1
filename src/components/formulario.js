export const formulario = () => `
  <form id="home-form" class="formulario" autocomplete="off">
    <div>
      <label for="nombre">Nombre</label>
      <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" />
    </div>
    <div>
      <label for="email">Correo</label>
      <input id="email" name="email" type="email" placeholder="correo@dominio.com" />
    </div>
    <button type="submit">Guardar</button>
  </form>
`;
