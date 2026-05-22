import { crearRol } from '../../services/rolesService.js';
import { canManageRoles } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const rolesControlador = () => {
  const createForm = document.getElementById('create-role-form');
  const goList = document.getElementById('go-list-role');

  const onList = () => {
    window.location.hash = '#/roles/list';
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canManageRoles()) {
      showError('No tienes permisos para crear roles.');
      return;
    }

    const nameInput = document.getElementById('role-name');
    const descriptionInput = document.getElementById('role-description');

    const nombre = nameInput?.value?.trim() || '';
    const descripcion = descriptionInput?.value?.trim() || '';

    if (!nombre) {
      showError('El nombre del rol es requerido.');
      return;
    }

    try {
      await crearRol(nombre, descripcion, []);
      showSuccess('Rol creado correctamente.');
      createForm?.reset();
      window.location.hash = '#/roles/list';
    } catch (error) {
      showError(error?.message || 'No fue posible crear el rol.');
    }
  };

  goList?.addEventListener('click', onList);
  createForm?.addEventListener('submit', onSubmit);

  return () => {
    goList?.removeEventListener('click', onList);
    createForm?.removeEventListener('submit', onSubmit);
  };
};
