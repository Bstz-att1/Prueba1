import { obtenerTodasTareas } from '../../services/tasksService.js';
import { canDeleteTasks, canUpdateTasks } from '../../core/permissions.js';
import { showError } from '../../ui/notificationsUi.js';

export const listTaskController = async () => {
  const body = document.getElementById('tabla-tareas');
  const state = document.getElementById('tasks-list-state');
  const backBtn = document.getElementById('back-tasks');

  const onBack = () => {
    window.location.hash = '#/tasks';
  };

  const onTableClick = (event) => {
    const editId = event.target?.dataset?.editTaskId;
    const deleteId = event.target?.dataset?.deleteTaskId;

    if (editId) {
      if (!canUpdateTasks()) {
        showError('No tienes permisos para editar tareas.');
        return;
      }
      window.location.hash = `#/tasks/edit/${editId}`;
    }

    if (deleteId) {
      if (!canDeleteTasks()) {
        showError('No tienes permisos para eliminar tareas.');
        return;
      }
      window.location.hash = `#/tasks/delete/${deleteId}`;
    }
  };

  backBtn?.addEventListener('click', onBack);

  if (!body) {
    return () => backBtn?.removeEventListener('click', onBack);
  }

  try {
    const tasks = await obtenerTodasTareas();
    body.innerHTML = '';

    if (!Array.isArray(tasks) || tasks.length === 0) {
      if (state) state.textContent = 'No hay tareas registradas.';
      return () => backBtn?.removeEventListener('click', onBack);
    }

    if (state) state.textContent = '';

    tasks.forEach((t) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.id ?? ''}</td>
        <td>${t.titulo ?? ''}</td>
        <td>${t.estado ?? ''}</td>
        <td>
          <button data-edit-task-id="${t.id}">Editar</button>
          <button data-delete-task-id="${t.id}">Eliminar</button>
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
    if (state) state.textContent = 'Error cargando tareas.';
    showError(error?.message || 'No fue posible cargar tareas.');
    return () => backBtn?.removeEventListener('click', onBack);
  }
};
