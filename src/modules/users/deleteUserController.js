import { eliminarUsuario, obtenerUsuarioPorId } from '../../services/usersService.js';
import { canDeleteUsers } from '../../core/permissions.js';
import { showConfirm, showError, showSuccess } from '../../ui/notificationsUi.js';

export const deleteUserController = async ({ params } = {}) => {
  const id = params?.id;
  const info = document.getElementById('info-eliminar');
  const confirmBtn = document.getElementById('confirmar-eliminacion');
  const cancelBtn = document.getElementById('cancel-delete-user');

  const onCancel = () => {
    window.location.hash = '#/users/list';
  };

  cancelBtn?.addEventListener('click', onCancel);

  if (!id) {
    if (info) info.textContent = 'No se encontró ID para eliminar.';
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  try {
    const user = await obtenerUsuarioPorId(id);
    if (info) info.textContent = `Vas a eliminar a ${user?.nombre ?? 'usuario'} (${user?.email ?? 'sin email'}).`;
  } catch (error) {
    console.error(error);
    if (info) info.textContent = 'No fue posible cargar datos del usuario.';
  }

  const onConfirm = async () => {
    if (!canDeleteUsers()) {
      showError('No tienes permisos para eliminar usuarios.');
      return;
    }

    const confirmed = await showConfirm({
      title: 'Eliminar usuario',
      text: 'Esta acción eliminará el usuario de forma permanente.',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    });

    if (!confirmed) return;

    try {
      await eliminarUsuario(id);
      showSuccess('Usuario eliminado');
      window.location.hash = '#/users/list';
    } catch (error) {
      console.error(error);
      showError(error?.message || 'No se pudo eliminar el usuario.');
    }
  };

  confirmBtn?.addEventListener('click', onConfirm);

  return () => {
    confirmBtn?.removeEventListener('click', onConfirm);
    cancelBtn?.removeEventListener('click', onCancel);
  };
};
