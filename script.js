const copyData = {
  'popular-cuenta': '830728192',
  'popular-cedula': '402-2689435-6',
  'bhd-cuenta': '24591270031',
  'bhd-cedula': '402-2689435-6',
  'banreservas-cuenta': '9605020888',
  'banreservas-cedula': '402-2405696-6',
};

let toastTimeout;

window.addEventListener('load', () => {
  const splash = document.querySelector('.splash');
  const page = document.querySelector('.page-content');

  if (splash && page) {
    if (location.hash === '#principal') {
      splash.classList.add('splash--hidden');
      page.classList.remove('page-hidden');
    } else {
      setTimeout(() => {
        splash.classList.add('splash--hidden');
        page.classList.remove('page-hidden');
      }, 2200);
    }
  }

  document.querySelectorAll('.nav-button').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      if (target) {
        button.classList.add('button-pressed');
        setTimeout(() => {
          window.location.href = target;
        }, 180);
      }
    });
  });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const key = button.dataset.copy;
    const text = copyData[key];

    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      showCopyToast('Número copiado');
    } catch (error) {
      showCopyToast('No se pudo copiar');
    }
  });
});

function showCopyToast(message) {
  const toast = document.getElementById('copy-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('visible');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 1600);
}
