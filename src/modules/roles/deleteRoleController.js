import { eliminarRol, obtenerRolPorId } from '../../services/rolesService.js';
import { canManageRoles } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const deleteRoleController = async ({ params } = {}) => {
  const id = params?.id;
  const info = document.getElementById('info-eliminar-rol');
  const confirmBtn = document.getElementById('confirmar-eliminacion-rol');
  const cancelBtn = document.getElementById('cancel-delete-role');

  const onCancel = () => {
    window.location.hash = '#/roles/list';
  };

  cancelBtn?.addEventListener('click', onCancel);

  if (!canManageRoles()) {
    showError('No tienes permisos para eliminar roles.');
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  if (!id) {
    if (info) info.textContent = 'No se encontró ID para eliminar.';
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  try {
    const role = await obtenerRolPorId(id);
    info.textContent = `Vas a eliminar el rol "${role?.nombre ?? 'sin nombre'}".`;
  } catch (error) {
    if (info) info.textContent = 'No fue posible cargar datos del rol.';
    showError(error?.message || 'No fue posible cargar datos del rol.');
  }

  const onConfirm = async () => {
    try {
      await eliminarRol(id);
      showSuccess('Rol eliminado correctamente.');
      window.location.hash = '#/roles/list';
    } catch (error) {
      showError(error?.message || 'No fue posible eliminar el rol.');
    }
  };

  confirmBtn?.addEventListener('click', onConfirm);

  return () => {
    confirmBtn?.removeEventListener('click', onConfirm);
    cancelBtn?.removeEventListener('click', onCancel);
  };
};
