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

  // Image Carousel
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const carouselId = carousel.dataset.carousel;
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector(`.carousel-prev[data-carousel="${carouselId}"]`);
    const nextBtn = document.querySelector(`.carousel-next[data-carousel="${carouselId}"]`);
    const dots = document.querySelectorAll(`[data-dot^="${carouselId}-"]`);

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('hidden', i !== index);
      });

      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.remove('bg-white/50');
          dot.classList.add('bg-white');
        } else {
          dot.classList.remove('bg-white');
          dot.classList.add('bg-white/50');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
    }
  });
});
