(function(){
  document.addEventListener('DOMContentLoaded', function () {
    // Reveal observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    if (mobileToggle && nav) {
      mobileToggle.addEventListener('click', () => {
        const shown = nav.style.display === 'block';
        if (!shown) {
          nav.style.display = 'block';
          nav.style.position = 'absolute';
          nav.style.right = '20px';
          nav.style.top = '64px';
          nav.style.background = 'rgba(255,255,255,0.98)';
          nav.style.padding = '12px';
          nav.style.borderRadius = '10px';
          nav.style.boxShadow = '0 10px 30px rgba(2,6,23,0.08)';
        } else {
          nav.style.display = '';
          nav.style.position = '';
          nav.style.right = '';
          nav.style.top = '';
          nav.style.background = '';
          nav.style.padding = '';
          nav.style.borderRadius = '';
          nav.style.boxShadow = '';
        }
      });
    }

    // Anchor safety: redirect empty or missing targets to contact page
    document.querySelectorAll('a[href="#"], a[href=""], a[href="javascript:void(0)"]').forEach(a => {
      a.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'contact.html'; });
    });

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) { e.preventDefault(); window.location.href = 'contact.html'; }
      });
    });

    // Ensure forms have action attribute
    document.querySelectorAll('form').forEach(f => {
      if (!f.getAttribute('action') || f.getAttribute('action').trim() === '') {
        f.setAttribute('action','contact.html');
      }
    });

    // Close nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav) { nav.style.display = ''; }
    });
  });
})();