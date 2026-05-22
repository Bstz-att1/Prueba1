import { obtenerTodosUsuarios } from '../../services/usersService.js';
import { canDeleteUsers, canUpdateUsers } from '../../core/permissions.js';
import { showError } from '../../ui/notificationsUi.js';

export const listUserController = async () => {
  const body = document.getElementById('tabla-usuarios');
  const state = document.getElementById('users-list-state');
  const backBtn = document.getElementById('back-users');

  const onBack = () => {
    window.location.hash = '#/users';
  };

  const onTableClick = (event) => {
    const editId = event.target?.dataset?.editId;
    const deleteId = event.target?.dataset?.deleteId;

    if (editId && canUpdateUsers()) window.location.hash = `#/users/edit/${editId}`;
    if (deleteId && canDeleteUsers()) window.location.hash = `#/users/delete/${deleteId}`;
  };

  backBtn?.addEventListener('click', onBack);

  if (!body) {
    return () => backBtn?.removeEventListener('click', onBack);
  }

  try {
    const users = await obtenerTodosUsuarios();
    body.innerHTML = '';

    if (!Array.isArray(users) || users.length === 0) {
      if (state) state.textContent = 'No hay usuarios registrados.';
      return () => backBtn?.removeEventListener('click', onBack);
    }

    if (state) state.textContent = '';

    users.forEach((u) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.id ?? ''}</td>
        <td>${u.nombre ?? ''}</td>
        <td>${u.email ?? ''}</td>
        <td>
          ${canUpdateUsers() ? `<button data-edit-id="${u.id}">Editar</button>` : ''}
          ${canDeleteUsers() ? `<button data-delete-id="${u.id}">Eliminar</button>` : ''}
        </td>
      `;
      body.appendChild(tr);
    });

    body.addEventListener('click', onTableClick);

    return () => {
      body.removeEventListener('click', onTableClick);
      backBtn?.removeEventListener('click', onBack);
    };
  } catch (error) {
    console.error(error);
    if (state) state.textContent = 'Error cargando usuarios.';
    showError(error?.message || 'Error al cargar usuarios');
    return () => backBtn?.removeEventListener('click', onBack);
  }
};
