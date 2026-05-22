import { obtenerUsuarioPorId, reemplazarUsuario } from '../../services/usersService.js';
import { canUpdateUsers } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const editUserController = async ({ params } = {}) => {
  const id = params?.id;
  const form = document.getElementById('form-editar');
  const nameInput = document.getElementById('edit-nombre');
  const emailInput = document.getElementById('edit-email');
  const cancelBtn = document.getElementById('cancel-edit-user');

  let currentUser = null;

  const onCancel = () => {
    window.location.hash = '#/users/list';
  };

  cancelBtn?.addEventListener('click', onCancel);

  if (!id || !form || !nameInput || !emailInput) {
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  try {
    currentUser = await obtenerUsuarioPorId(id);
    nameInput.value = currentUser?.nombre ?? '';
    emailInput.value = currentUser?.email ?? '';
  } catch (error) {
    console.error(error);
    showError(error?.message || 'No se pudo cargar el usuario.');
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canUpdateUsers()) {
      showError('No tienes permisos para editar usuarios.');
      return;
    }

    try {
      await reemplazarUsuario(
        id,
        nameInput.value.trim(),
        emailInput.value.trim(),
        currentUser?.document || '',
        `Tmp${Date.now()}Aa1`,
        currentUser?.rol || 'usuario'
      );
      showSuccess('Usuario actualizado');
      window.location.hash = '#/users/list';
    } catch (error) {
      console.error(error);
      showError(error?.message || 'No se pudo actualizar el usuario.');
    }
  };

  form.addEventListener('submit', onSubmit);

  return () => {
    form.removeEventListener('submit', onSubmit);
    cancelBtn?.removeEventListener('click', onCancel);
  };
};
