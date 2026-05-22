import { crearUsuario } from '../../services/usersService.js';
import { canCreateUsers } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const usersControlador = () => {
  const form = document.getElementById('user-create-form');
  const goList = document.getElementById('go-list-user');

  const onList = () => {
    window.location.hash = '#/users/list';
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canCreateUsers()) {
      showError('No tienes permisos para crear usuarios.');
      return;
    }

    const nombre = document.getElementById('user-create-nombre')?.value?.trim();
    const email = document.getElementById('user-create-email')?.value?.trim();
    const documento = document.getElementById('user-create-documento')?.value?.trim();
    const rol = document.getElementById('user-create-rol')?.value || 'usuario';
    const password = document.getElementById('user-create-password')?.value?.trim();

    if (!nombre || !email || !documento || !password) {
      showError('Todos los campos son obligatorios.');
      return;
    }

    try {
      await crearUsuario(nombre, email, documento, password, rol);
      showSuccess('Usuario creado');
      form?.reset();
      window.location.hash = '#/users/list';
    } catch (error) {
      console.error(error);
      showError(error?.message || 'No se pudo crear el usuario.');
    }
  };

  form?.addEventListener('submit', onSubmit);
  goList?.addEventListener('click', onList);

  return () => {
    form?.removeEventListener('submit', onSubmit);
    goList?.removeEventListener('click', onList);
  };
};
