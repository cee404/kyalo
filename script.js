document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const cartCountEl = document.getElementById('cart-count');
  const greetingEl = document.getElementById('greeting');
  const dateEl = document.getElementById('date');
  const contactForm = document.getElementById('contact-form');

  // Theme
  const sunSVG = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.03 2.05l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM17 13h3v-2h-3v2zM12 8a4 4 0 100 8 4 4 0 000-8zm-1 13h2v-3h-2v3zM4.24 19.16l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM20.83 19.16l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79z"/>
    </svg>`;

  const moonSVG = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>`;

  function updateThemeIcon(isDark) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isDark ? moonSVG : sunSVG;
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  }

  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') document.body.classList.add('dark-mode');
  updateThemeIcon(document.body.classList.contains('dark-mode'));
  if (themeToggle) themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const nowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    updateThemeIcon(nowDark);
  });

  // Greeting + date
  if (greetingEl) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    greetingEl.textContent = `${greeting}! Welcome to Sweet Delight Bakery.`;
  }
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Cart & Add-to-cart
  const CART_KEY = 'sd_cart_count';
  function updateCartDisplay() {
    const count = parseInt(localStorage.getItem(CART_KEY) || '0', 10);
    if (cartCountEl) cartCountEl.textContent = `Cart (${count})`;
  }
  updateCartDisplay();

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(localStorage.getItem(CART_KEY) || '0', 10);
      localStorage.setItem(CART_KEY, String(prev + 1));
      updateCartDisplay();
      btn.textContent = 'Added';
      setTimeout(() => btn.textContent = 'Add to Cart', 1200);
    });
  });

  // Contact form handling (basic)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const msgEl = document.getElementById('form-message');
      if (!name || !email || !message) {
        if (msgEl) msgEl.textContent = 'Please fill in all fields.';
        return;
      }
      // Simulate submit
      if (msgEl) msgEl.textContent = 'Thanks — your message has been sent!';
      contactForm.reset();
    });
  }
});
