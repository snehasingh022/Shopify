document.addEventListener('DOMContentLoaded', () => {
  // --- Image thumbnails and main image switch ---
  const mainImage = document.getElementById('mainImage');
  const thumbnailContainer = document.getElementById('thumbnailContainer');
  const colorSwatches = document.querySelectorAll('.colorbox div');

  const colorToImages = {
    beige: [
      "https://spanx.com/cdn/shop/files/cwl_jeans_chalk_primary-min.png?v=1743773162&width=1000",
      "https://spanx.com/cdn/shop/files/cwl_jeans_chalk_cropped-min.png?v=1743773162&width=1000",
      "https://spanx.com/cdn/shop/files/21284R-ChalkWash_PDP_031_HNMD_v2.jpg?v=1743773162&width=1000",
      "https://spanx.com/cdn/shop/files/21284R-ChalkWash_PDP_058_HNMD.jpg?v=1743773162&width=1000",
      "https://spanx.com/cdn/shop/files/21284R-ChalkWash_PDP_074_HNMD.jpg?v=1743773162&width=1000",
      "https://spanx.com/cdn/shop/files/21284R-ChalkWash_PDP_086_HNMD.jpg?v=1743773162&width=1000"
    ],
    white: [
      "https://spanx.com/cdn/shop/files/21283R-White_PDP_020_HNv2.jpg?v=1743773341&width=1000",
      "https://spanx.com/cdn/shop/files/cwl_jeans_white-min.png?v=1743773341&width=1000",
      "https://spanx.com/cdn/shop/files/21283R-White_PDP_051_HNv2.jpg?v=1743773341&width=1000",
      "https://spanx.com/cdn/shop/files/21283R-White_PDP_047_HN.jpg?v=1743773341&width=1000",
      "https://spanx.com/cdn/shop/files/21283R-White_PDP_073_HN.jpg?v=1743773341&width=1000",
      "https://spanx.com/cdn/shop/files/21283R-White_PDP_059_HN.jpg?v=1743773341&width=1000"
    ],
    blue: [
      "https://spanx.com/cdn/shop/files/cwl_jeans_stonewash-min.png?v=1743772956&width=1000",
      "https://spanx.com/cdn/shop/files/cwl_jeans_stonewash_cropped-min.png?v=1743772956&width=1000",
      "https://spanx.com/cdn/shop/files/21285R-StonewashBlue_PDP_003_HNv2.jpg?v=1743772956&width=1000",
      "https://spanx.com/cdn/shop/files/21285R-StonewashBlue_PDP_021_HNv2.jpg?v=1743772956&width=1000",
      "https://spanx.com/cdn/shop/files/21285R-StonewashBlue_PDP_032_HNv2.jpg?v=1743772956&width=1000",
      "https://spanx.com/cdn/shop/files/21285R-StonewashBlue_PDP_044_HN.jpg?v=1743772956&width=1000"
    ],
  };

  function loadThumbnails(images) {
    thumbnailContainer.innerHTML = '';
    images.forEach((src, index) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.alt = `Thumbnail ${index + 1}`;
      thumb.classList.add('thumbnail-img');
      if (index === 0) {
        thumb.classList.add('active-thumb');
        mainImage.src = src;
      }
      thumb.addEventListener('click', () => {
        mainImage.src = src;
        document.querySelectorAll('.thumbnail-img').forEach(t => t.classList.remove('active-thumb'));
        thumb.classList.add('active-thumb');
      });
      thumbnailContainer.appendChild(thumb);
    });
  }

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active-color'));
      swatch.classList.add('active-color');
      const selectedColor = swatch.getAttribute('data-color');
      if (colorToImages[selectedColor]) {
        loadThumbnails(colorToImages[selectedColor]);
        mainImage.alt = `${selectedColor} shirt`;
      }
    });
  });

  // Load first color images initially
  if (colorSwatches.length > 0) {
    colorSwatches[0].classList.add('active-color');
    loadThumbnails(colorToImages[colorSwatches[0].getAttribute('data-color')]);
  }

  // --- Dropdown toggle with plus/minus icons ---
  const minusButtons = document.querySelectorAll('.minus');
  minusButtons.forEach(button => {
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
      const dropDiv = button.closest('.drop');
      if (!dropDiv) return;

      // Assuming collapsible content is the next sibling element of dropDiv
      const contentDiv = dropDiv.nextElementSibling;
      if (!contentDiv) return;

      if (contentDiv.style.display === 'block') {
        contentDiv.style.display = 'none';
        button.src = "https://cdn-icons-png.flaticon.com/512/32/32195.png"; // plus icon
      } else {
        contentDiv.style.display = 'block';
        button.src = "https://www.pngarts.com/files/3/Minus-PNG-Free-Download.png"; // minus icon
      }
    });
  });

  // --- Size Chart Modal ---
  const sizeChartBtn = document.getElementById('sizeChartBtn');
  const sizeChartModal = document.getElementById('sizeChartModal');
  const sizeChartCloseBtn = sizeChartModal.querySelector('.modal-close');

  function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  sizeChartBtn.addEventListener('click', () => openModal(sizeChartModal));
  sizeChartCloseBtn.addEventListener('click', () => closeModal(sizeChartModal));

  sizeChartModal.addEventListener('click', (e) => {
    if (e.target === sizeChartModal) closeModal(sizeChartModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sizeChartModal.classList.contains('active')) {
      closeModal(sizeChartModal);
    }
  });

  // --- Compare Colours Modal ---
  const colors = [
    { name: 'beige', cssClass: 'beige' },
    { name: 'white', cssClass: 'white' },
    { name: 'blue', cssClass: 'blue' },
    { name: 'red', cssClass: 'red' },
    { name: 'green', cssClass: 'green' },
    { name: 'black', cssClass: 'black' },
  ];
  const compareBtn = document.getElementById('compareColoursBtn');
  const compareModal = document.getElementById('compareModal');
  const modalSwatches = document.getElementById('modalSwatches');
  const selectedDisplay = document.getElementById('selectedColoursDisplay');
  const compareCloseBtn = document.getElementById('closeCompareBtn');
  let selectedColors = new Set();

  function createModalSwatches() {
    modalSwatches.innerHTML = '';
    colors.forEach(color => {
      const div = document.createElement('div');
      div.classList.add(color.cssClass);
      div.title = color.name;
      div.setAttribute('data-color', color.name);
      div.addEventListener('click', () => {
        if (selectedColors.has(color.name)) {
          selectedColors.delete(color.name);
          div.classList.remove('selected');
        } else {
          selectedColors.add(color.name);
          div.classList.add('selected');
        }
        updateSelectedDisplay();
      });
      modalSwatches.appendChild(div);
    });
  }

  function updateSelectedDisplay() {
    selectedDisplay.innerHTML = '';
    if (selectedColors.size === 0) {
      selectedDisplay.textContent = 'No colours selected';
      return;
    }
    selectedColors.forEach(colorName => {
      const colorObj = colors.find(c => c.name === colorName);
      if (colorObj) {
        const div = document.createElement('div');
        div.classList.add(colorObj.cssClass);
        div.title = colorName;
        selectedDisplay.appendChild(div);
      }
    });
  }

  compareBtn.addEventListener('click', () => {
    compareModal.classList.add('active');
    selectedColors.clear();
    createModalSwatches();
    updateSelectedDisplay();
    document.body.style.overflow = 'hidden';
  });

  compareCloseBtn.addEventListener('click', () => {
    compareModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  compareModal.addEventListener('click', (e) => {
    if (e.target === compareModal) {
      compareModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && compareModal.classList.contains('active')) {
      compareModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const carousel = document.querySelector('.carousel-container');

const scrollAmount = 300; // Adjust as needed

leftArrow.addEventListener('click', () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

