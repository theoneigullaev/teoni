document.addEventListener("DOMContentLoaded", () => {

  /* === Прелоадер === */
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("site-content");
    if (!preloader || !content) return;
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.remove();
        content.style.opacity = "1";
      }, 800);
    }, 1000);
  });

  /* === 3D эффект карточек === */
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 15;
      const rotateY = (rect.width / 2 - x) / 15;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  /* === Слайдер === */
  const slides = document.querySelectorAll(".slide");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  let current = 0;
  const showSlide = n => slides.forEach((s, i) => s.classList.toggle("active", i === n));

  next?.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });
  prev?.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  /* === Модалка "Подробнее" === */
  const modal = document.getElementById("modal");
  const closeModal = modal?.querySelector(".close");
  const modalForm = modal?.querySelector("form");

  document.querySelectorAll(".btn-slide").forEach(btn => {
    btn.addEventListener("click", () => {
      if (modal) modal.style.display = "flex";
    });
  });

  closeModal?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  modalForm?.addEventListener("submit", e => {
    e.preventDefault();
    modal.style.display = "none";
    modalForm.reset();
    alert("Заявка отправлена!");
  });

  /* === Модалка карты === */
  const mapModal = document.getElementById("mapModal");
  const mapFrame = document.getElementById("mapFrame");
  const closeMap = mapModal?.querySelector(".close-map");

  document.querySelectorAll(".btn-map").forEach(btn => {
    btn.addEventListener("click", () => {
      const tour = btn.closest(".tour");
      if (!tour || !mapModal || !mapFrame) return;
      const location = tour.dataset.location;
      mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
      mapModal.style.display = "flex";
    });
  });

  closeMap?.addEventListener("click", () => {
    mapModal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === mapModal) mapModal.style.display = "none";
  });

  /* === Счётчик пассажиров === */
  const counter = document.getElementById("passengerCounter");
  if (counter) {
    let started = false;
    const startCounter = () => {
      if (started) return;
      started = true;
      let count = 0;
      const target = 700000;
      const step = Math.ceil(target / 200);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        counter.textContent = count.toLocaleString("ru-RU");
      }, 20);
    };

    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) startCounter();
    }, { threshold: 0.5 }).observe(counter);
  }

});
