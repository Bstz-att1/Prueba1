import { obtenerRoles } from '../../services/rolesService.js';
import { canManageRoles, canReadRoles } from '../../core/permissions.js';
import { showError } from '../../ui/notificationsUi.js';

export const listRoleController = async () => {
  const body = document.getElementById('tabla-roles');
  const state = document.getElementById('roles-list-state');
  const backBtn = document.getElementById('back-roles');

  const onBack = () => {
    window.location.hash = '#/roles';
  };

  const onTableClick = (event) => {
    const editId = event.target?.dataset?.editRoleId;
    const deleteId = event.target?.dataset?.deleteRoleId;

    if (editId) {
      if (!canManageRoles()) {
        showError('No tienes permisos para editar roles.');
        return;
      }
      window.location.hash = `#/roles/edit/${editId}`;
    }

    if (deleteId) {
      if (!canManageRoles()) {
        showError('No tienes permisos para eliminar roles.');
        return;
      }
      window.location.hash = `#/roles/delete/${deleteId}`;
    }
  };

  backBtn?.addEventListener('click', onBack);

  if (!canReadRoles()) {
    if (state) state.textContent = 'No tienes permisos para ver roles.';
    return () => backBtn?.removeEventListener('click', onBack);
  }

  if (!body) {
    return () => backBtn?.removeEventListener('click', onBack);
  }

  try {
    const roles = await obtenerRoles();
    body.innerHTML = '';

    if (!Array.isArray(roles) || roles.length === 0) {
      if (state) state.textContent = 'No hay roles registrados.';
      return () => backBtn?.removeEventListener('click', onBack);
    }

    if (state) state.textContent = '';

    roles.forEach((r) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.id ?? ''}</td>
        <td>${r.nombre ?? ''}</td>
        <td>${r.descripcion ?? ''}</td>
        <td>
          <button data-edit-role-id="${r.id}">Editar</button>
          <button data-delete-role-id="${r.id}">Eliminar</button>
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
    if (state) state.textContent = 'Error cargando roles.';
    showError(error?.message || 'No fue posible cargar roles.');
    return () => backBtn?.removeEventListener('click', onBack);
  }
};
