import { obtenerPermisosRol, obtenerRolPorId, reemplazarRol } from '../../services/rolesService.js';
import { canManageRoles } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const editRoleController = async ({ params } = {}) => {
  const id = params?.id;
  const form = document.getElementById('form-editar-rol');
  const nameInput = document.getElementById('edit-role-name');
  const descriptionInput = document.getElementById('edit-role-description');
  const cancelBtn = document.getElementById('cancel-edit-role');

  const onCancel = () => {
    window.location.hash = '#/roles/list';
  };

  cancelBtn?.addEventListener('click', onCancel);

  if (!canManageRoles()) {
    showError('No tienes permisos para editar roles.');
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  if (!id || !form || !nameInput || !descriptionInput) {
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  let currentPermissions = [];

  try {
    const role = await obtenerRolPorId(id);
    nameInput.value = role?.nombre ?? '';
    descriptionInput.value = role?.descripcion ?? '';
    currentPermissions = await obtenerPermisosRol(id);
  } catch (error) {
    showError(error?.message || 'No fue posible cargar el rol.');
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const nombre = nameInput.value.trim();
    const descripcion = descriptionInput.value.trim();

    if (!nombre) {
      showError('El nombre del rol es requerido.');
      return;
    }

    try {
      await reemplazarRol(id, nombre, descripcion, currentPermissions);
      showSuccess('Rol actualizado correctamente.');
      window.location.hash = '#/roles/list';
    } catch (error) {
      showError(error?.message || 'No fue posible actualizar el rol.');
    }
  };

  form.addEventListener('submit', onSubmit);

  return () => {
    form.removeEventListener('submit', onSubmit);
    cancelBtn?.removeEventListener('click', onCancel);
  };
};
