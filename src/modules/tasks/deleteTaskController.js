import { eliminarTarea, obtenerTodasTareas } from '../../services/tasksService.js';
import { canDeleteTasks } from '../../core/permissions.js';
import { showError, showSuccess } from '../../ui/notificationsUi.js';

export const deleteTaskController = async ({ params } = {}) => {
  const id = params?.id;
  const info = document.getElementById('info-eliminar-tarea');
  const confirmBtn = document.getElementById('confirmar-eliminacion-tarea');
  const cancelBtn = document.getElementById('cancel-delete-task');

  const onCancel = () => {
    window.location.hash = '#/tasks/list';
  };

  cancelBtn?.addEventListener('click', onCancel);

  if (!canDeleteTasks()) {
    showError('No tienes permisos para eliminar tareas.');
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  if (!id) {
    if (info) info.textContent = 'No se encontró ID para eliminar.';
    return () => cancelBtn?.removeEventListener('click', onCancel);
  }

  try {
    const tasks = await obtenerTodasTareas();
    const task = tasks.find((t) => String(t.id) === String(id));
    info.textContent = `Vas a eliminar la tarea "${task?.titulo ?? 'sin título'}".`;
  } catch (error) {
    if (info) info.textContent = 'No fue posible cargar datos de la tarea.';
    showError(error?.message || 'No fue posible cargar datos de la tarea.');
  }

  const onConfirm = async () => {
    try {
      await eliminarTarea(id);
      showSuccess('Tarea eliminada correctamente.');
      window.location.hash = '#/tasks/list';
    } catch (error) {
      showError(error?.message || 'No fue posible eliminar la tarea.');
    }
  };

  confirmBtn?.addEventListener('click', onConfirm);

  return () => {
    confirmBtn?.removeEventListener('click', onConfirm);
    cancelBtn?.removeEventListener('click', onCancel);
  };
};
