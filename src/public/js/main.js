document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const dot = document.querySelector('.dot');

  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    toggle.checked = true;
    dot.classList.add('translate-x-6');
  }

  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;
    document.documentElement.classList.toggle('dark', isDark);
    dot.classList.toggle('translate-x-6', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const carouselId = carousel.dataset.carousel;
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector(`.carousel-prev[data-carousel="${carouselId}"]`);
    const nextBtn = document.querySelector(`.carousel-next[data-carousel="${carouselId}"]`);
    const dots = document.querySelectorAll(`[data-dot^="${carouselId}-"]`);

    const showImage = (index) => {
      images.forEach((img, i) => {
        img.classList.toggle('hidden', i !== index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('bg-white', i === index);
        dot.classList.toggle('bg-white/50', i !== index);
      });
    };

    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
  });

  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const { productId, productName, productPrice, productImage } = button.dataset;

      try {
        const response = await fetch('/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, productName, productPrice, productImage })
        });

        if (response.redirected) {
          window.location.href = response.url;
          return;
        }

        const data = await response.json();

        if (data.success) {
          const originalText = button.textContent;
          button.textContent = '✓ Dodano!';
          button.classList.replace('bg-blue-600', 'bg-green-600');

          setTimeout(() => {
            button.textContent = originalText;
            button.classList.replace('bg-green-600', 'bg-blue-600');
          }, 1500);
        }
      } catch (error) {
        console.error('Błąd:', error);
        button.textContent = '✗ Błąd';
        setTimeout(() => {
          button.textContent = 'Dodaj do koszyka';
        }, 1500);
      }
    });
  });
});
