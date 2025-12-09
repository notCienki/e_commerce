document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const dot = document.querySelector('.dot');

  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    toggle.checked = true;
    dot.classList.add('translate-x-6');
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.documentElement.classList.add('dark');
      dot.classList.add('translate-x-6');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      dot.classList.remove('translate-x-6');
      localStorage.setItem('theme', 'light');
    }
  });
});
