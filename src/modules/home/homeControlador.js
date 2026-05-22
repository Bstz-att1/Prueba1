import { api_url, enviarDatos } from '../../repositories/baseRepository.js';

/**
 * Controlador Home:
 * - Maneja eventos y reglas de validación.
 * - Muestra feedback con SweetAlert2 si está disponible.
 * - Retorna función cleanup para evitar memory leaks al desmontar ruta.
 */
export const homeController = () => {
  const form = document.getElementById('home-form');
  const apiUrlNode = document.getElementById('home-api-url');

  if (apiUrlNode) {
    apiUrlNode.textContent = api_url;
  }

  if (!form) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nameInput = form.querySelector('#nombre');
    const emailInput = form.querySelector('#email');

    const nombre = nameInput?.value?.trim() || '';
    const email = emailInput?.value?.trim() || '';

    if (!nombre || !email) {
      showMessage('warning', 'Campos requeridos', 'Debes completar nombre y correo.');
      return;
    }

    if (/[0-9@#$%^&*+=~`{}|;:\",<>?]/.test(nombre)) {
      showMessage(
        'warning',
        'Nombre inválido',
        'El nombre solo puede contener letras, espacios, guiones y apóstrofes.'
      );
      return;
    }

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      showMessage('warning', 'Correo inválido', 'Ingresa un correo electrónico válido.');
      return;
    }

    try {
      await enviarDatos('/users', { nombre, email });
      showMessage('success', 'Guardado', 'Formulario enviado correctamente.');
      form.reset();
    } catch (error) {
      console.error('[homeController] Error al enviar formulario:', error);
      showMessage('error', 'Error', 'No se pudo enviar la información al servidor.');
    }
  };

  form.addEventListener('submit', handleSubmit);

  // cleanup para router.unmount
  return () => {
    form.removeEventListener('submit', handleSubmit);
  };
};

const showMessage = (icon, title, text) => {
  if (typeof window !== 'undefined' && window.Swal && typeof window.Swal.fire === 'function') {
    window.Swal.fire({ icon, title, text });
    return;
  }
  alert(`${title}: ${text}`);
};
