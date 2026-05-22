import { actualizarTarea, obtenerTodasTareas } from '../../services/tasksService.js';
import { canUpdateTasks } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const editTaskController = async ({ params } = {}) => {
  const id = params?.id;
  const form = document.getElementById('form-editar-tarea');
  const titleInput = document.getElementById('edit-task-title');
  const statusInput = document.getElementById('edit-task-status');
  const cancelBtn = document.getElementById('cancel-edit-task');

  const onCancel = () => {
    window.location.hash = '#/tasks/list';
  };

  cancelBtn?.addEventListener('click', onCancel);

  if (!canUpdateTasks()) {
    showError('No tienes permisos para editar tareas.');
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  if (!id || !form || !titleInput || !statusInput) {
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  try {
    const tasks = await obtenerTodasTareas();
    const task = tasks.find((t) => String(t.id) === String(id));
    if (!task) {
      showError('No se encontró la tarea.');
      return () => cancelBtn?.removeEventListener('click', onCancel);
    }
    titleInput.value = task?.titulo ?? '';
    statusInput.value = task?.estado ?? 'pendiente';
  } catch (error) {
    showError(error?.message || 'No fue posible cargar la tarea.');
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await actualizarTarea(
        id,
        titleInput.value.trim(),
        '',
        '',
        statusInput.value.trim() || 'pendiente',
        'user'
      );
      showSuccess('Tarea actualizada correctamente.');
      window.location.hash = '#/tasks/list';
    } catch (error) {
      showError(error?.message || 'No fue posible actualizar la tarea.');
    }
  };

  form.addEventListener('submit', onSubmit);

  return () => {
    form.removeEventListener('submit', onSubmit);
    cancelBtn?.removeEventListener('click', onCancel);
  };
};
