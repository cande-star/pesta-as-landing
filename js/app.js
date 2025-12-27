// Funcionalidad de pestañas
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tabs__button, .nav__link[data-tab]');
  const tabContents = document.querySelectorAll('.tabs__content');
  
  // Función para cambiar de pestaña
  function switchTab(tabName) {
    // Ocultar todos los contenidos
    tabContents.forEach(content => {
      content.classList.remove('active');
    });
    
    // Remover active de todos los botones
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Mostrar el contenido correspondiente
    const targetContent = document.getElementById(`tab-${tabName}`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
    
    // Activar el botón correspondiente
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add('active');
      }
    });
  }
  
  // Event listeners para botones de pestañas
  document.querySelectorAll('.tabs__button').forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      switchTab(tabName);
      // Scroll suave a la sección de pestañas
      document.querySelector('.section--tabs').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
  
  // Event listeners para links de navegación
  document.querySelectorAll('.nav__link[data-tab]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const tabName = this.dataset.tab;
      switchTab(tabName);
      // Scroll suave a la sección de pestañas
      setTimeout(() => {
        document.querySelector('.section--tabs').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    });
  });
  
  // Event listeners para botones que abren pestañas
  document.querySelectorAll('[data-tab]').forEach(element => {
    if (element.tagName === 'A' && element.dataset.tab) {
      element.addEventListener('click', function(e) {
        if (this.href && !this.href.includes('#')) {
          return; // Si tiene href externo, dejar que funcione normalmente
        }
        e.preventDefault();
        const tabName = this.dataset.tab;
        switchTab(tabName);
        document.querySelector('.section--tabs').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  });
  
  // Manejar hash en la URL
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (['servicios', 'precios', 'preguntas'].includes(hash)) {
      switchTab(hash);
    }
  }
});

