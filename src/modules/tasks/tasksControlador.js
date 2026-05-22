import { crearTarea } from '../../services/tasksService.js';
import { canCreateTasks } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const tasksControlador = () => {
  const createForm = document.getElementById('create-task-form');
  const goList = document.getElementById('go-list-task');

  const onList = () => {
    window.location.hash = '#/tasks/list';
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canCreateTasks()) {
      showError('No tienes permisos para crear tareas.');
      return;
    }

    const titleInput = document.getElementById('task-title');
    const descriptionInput = document.getElementById('task-description');
    const userIdInput = document.getElementById('task-user-id');

    const titulo = titleInput?.value?.trim() || '';
    const descripcion = descriptionInput?.value?.trim() || '';
    const user_id = userIdInput?.value?.trim() || '';

    if (!titulo || !user_id) {
      showError('Título e ID de usuario son requeridos.');
      return;
    }

    try {
      await crearTarea(titulo, descripcion, user_id);
      showSuccess('Tarea creada correctamente.');
      createForm?.reset();
      window.location.hash = '#/tasks/list';
    } catch (error) {
      showError(error?.message || 'No fue posible crear la tarea.');
    }
  };

  goList?.addEventListener('click', onList);
  createForm?.addEventListener('submit', onSubmit);

  return () => {
    goList?.removeEventListener('click', onList);
    createForm?.removeEventListener('submit', onSubmit);
  };
};
