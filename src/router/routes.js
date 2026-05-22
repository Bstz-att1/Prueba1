/**
 * Mapa central de rutas de la SPA.
 * Cada ruta define:
 * - path: URL hash (permite segmentos dinámicos con :param)
 * - view: función de vista (retorna string HTML o nodo)
 * - controller: función de inicialización de lógica (opcional)
 * - title: título de documento
 * - isProtected: indica si requiere sesión activa
 */
import {
  homeView,
  homeController,
  loginView,
  loginController,
  registerView,
  registerController
} from '../modules/home/index.js';
import {
  users,
  usersControlador,
  listUser,
  listUserController,
  editUser,
  editUserController,
  deleteUser,
  deleteUserController
} from '../modules/users/index.js';
import {
  tasks,
  tasksControlador,
  listTask,
  listTaskController,
  editTask,
  editTaskController,
  deleteTask,
  deleteTaskController
} from '../modules/tasks/index.js';
import {
  roles,
  rolesControlador,
  listRole,
  listRoleController,
  editRole,
  editRoleController,
  deleteRole,
  deleteRoleController
} from '../modules/roles/index.js';

export const routes = [
  {
    path: '#/',
    title: 'Login',
    isProtected: false,
    onlyGuest: true,
    view: loginView,
    controller: loginController
  },
  {
    path: '#/login',
    title: 'Login',
    isProtected: false,
    onlyGuest: true,
    view: loginView,
    controller: loginController
  },
  {
    path: '#/register',
    title: 'Registro',
    isProtected: false,
    onlyGuest: true,
    view: registerView,
    controller: registerController
  },
  {
    path: '#/home',
    title: 'Inicio',
    isProtected: true,
    view: homeView,
    controller: homeController
  },

  // Users
  {
    path: '#/users',
    title: 'Usuarios',
    isProtected: true,
    view: users,
    controller: usersControlador
  },
  {
    path: '#/users/list',
    title: 'Lista de usuarios',
    isProtected: true,
    view: listUser,
    controller: listUserController
  },
  {
    path: '#/users/edit/:id',
    title: 'Editar usuario',
    isProtected: true,
    view: editUser,
    controller: editUserController
  },
  {
    path: '#/users/delete/:id',
    title: 'Eliminar usuario',
    isProtected: true,
    view: deleteUser,
    controller: deleteUserController
  },

  // Tasks
  {
    path: '#/tasks',
    title: 'Tareas',
    isProtected: true,
    view: tasks,
    controller: tasksControlador
  },
  {
    path: '#/tasks/list',
    title: 'Lista de tareas',
    isProtected: true,
    view: listTask,
    controller: listTaskController
  },
  {
    path: '#/tasks/edit/:id',
    title: 'Editar tarea',
    isProtected: true,
    view: editTask,
    controller: editTaskController
  },
  {
    path: '#/tasks/delete/:id',
    title: 'Eliminar tarea',
    isProtected: true,
    view: deleteTask,
    controller: deleteTaskController
  },

  // Roles
  {
    path: '#/roles',
    title: 'Roles',
    isProtected: true,
    view: roles,
    controller: rolesControlador
  },
  {
    path: '#/roles/list',
    title: 'Lista de roles',
    isProtected: true,
    view: listRole,
    controller: listRoleController
  },
  {
    path: '#/roles/edit/:id',
    title: 'Editar rol',
    isProtected: true,
    view: editRole,
    controller: editRoleController
  },
  {
    path: '#/roles/delete/:id',
    title: 'Eliminar rol',
    isProtected: true,
    view: deleteRole,
    controller: deleteRoleController
  }
];

/**
 * Ruta fallback para no encontradas (404)
 */
export const notFoundRoute = {
  title: '404 - No encontrado',
  isProtected: false,
  view: () => `
    <section class="animate__animated animate__fadeIn" style="padding: 1rem;">
      <h1>404</h1>
      <p>La ruta solicitada no existe en la aplicación.</p>
      <a href="#/home">Ir al inicio</a>
    </section>
  `,
  controller: null
};
