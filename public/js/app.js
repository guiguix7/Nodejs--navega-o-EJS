document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-confirm]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      const message = form.getAttribute('data-confirm') || 'Deseja continuar?';
      if (!window.confirm(message)) event.preventDefault();
    });
  });

  document.querySelectorAll('input, textarea, select').forEach((field) => {
    field.addEventListener('input', () => {
      if (field.checkValidity()) field.classList.remove('is-invalid');
    });
  });
});
