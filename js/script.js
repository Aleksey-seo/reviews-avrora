(() => {
  const images = [
    "/img/GalleryBtn/photo_2025.svg",
    "/img/GalleryBtn/1200x900n.webp",
    "/img/GalleryBtn/1200x900n (1).webp",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80",
    "/img/GalleryBtn/1200x900n.webp",
    "/img/GalleryBtn/1200x900n (1).webp"
  ];

  const openGalleryButtons = document.querySelectorAll(".openGalleryBtn");
  const galleryModal = document.getElementById("galleryModal");
  const closeGalleryBtn = document.getElementById("closeGalleryBtn");
  const thumbPrevBtn = document.getElementById("thumbPrevBtn");
  const thumbNextBtn = document.getElementById("thumbNextBtn");
  const galleryThumbs = document.getElementById("galleryThumbs");
  const galleryMainImage = document.getElementById("galleryMainImage");
  const galleryStage = document.getElementById("galleryStage");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");

  let currentIndex = 0;
  let wheelLocked = false;

  function normalizeIndex(index) {
    if (index < 0) return images.length - 1;
    if (index >= images.length) return 0;
    return index;
  }

  function renderThumbs() {
    galleryThumbs.innerHTML = images
      .map((src, index) => {
        const activeClass = index === currentIndex ? "active" : "";
        return `
          <li class="gallery-thumbs__item ${activeClass}" data-index="${index}">
            <img class="gallery-thumbs__img" src="${src}" alt="Миниатюра ${index + 1}">
          </li>
        `;
      })
      .join("");
  }

  function updateMainImage() {
    galleryMainImage.style.opacity = "0.4";

    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => {
      galleryMainImage.src = images[currentIndex];
      galleryMainImage.style.opacity = "1";
    };

    const thumbs = galleryThumbs.querySelectorAll(".gallery-thumbs__item");
    thumbs.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentIndex);
    });

    const activeThumb = galleryThumbs.querySelector(".gallery-thumbs__item.active");
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }
  }

  function setSlide(index) {
    currentIndex = normalizeIndex(index);
    updateMainImage();
  }

  function nextSlide() {
    setSlide(currentIndex + 1);
  }

  function prevSlide() {
    setSlide(currentIndex - 1);
  }

  function openGallery(startIndex = 0) {
    currentIndex = normalizeIndex(startIndex);
    renderThumbs();
    updateMainImage();

    galleryModal.classList.add("active");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeGallery() {
    galleryModal.classList.remove("active");
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    closeLightbox();
  }

  function openLightbox() {
    lightboxImage.src = images[currentIndex];
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
  }

  openGalleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      openGallery(index);
    });
  });

  closeGalleryBtn.addEventListener("click", closeGallery);

  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeGallery();
    }
  });

  thumbPrevBtn.addEventListener("click", prevSlide);
  thumbNextBtn.addEventListener("click", nextSlide);

  galleryThumbs.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery-thumbs__item");
    if (!thumb) return;

    const index = Number(thumb.dataset.index);
    setSlide(index);
  });

  galleryStage.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();

      if (wheelLocked) return;
      wheelLocked = true;

      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }

      setTimeout(() => {
        wheelLocked = false;
      }, 180);
    },
    { passive: false }
  );

  galleryMainImage.addEventListener("click", openLightbox);

  closeLightboxBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    const galleryOpened = galleryModal.classList.contains("active");
    const lightboxOpened = lightbox.classList.contains("active");

    if (!galleryOpened && !lightboxOpened) return;

    if (e.key === "Escape") {
      if (lightboxOpened) {
        closeLightbox();
      } else {
        closeGallery();
      }
    }

    if (galleryOpened && !lightboxOpened) {
      if (e.key === "ArrowDown") nextSlide();
      if (e.key === "ArrowUp") prevSlide();
    }
  });
})();