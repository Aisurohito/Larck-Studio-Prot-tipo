const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function () {
    const button = this.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "Enviando...";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Mensagem Enviada!";
      button.style.background = "#10b981";

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = "";
        this.reset();
      }, 2000);
    }, 1500);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetSelector = this.getAttribute("href");
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const scrollSection = document.querySelector(".about-section");
const scrollBox = document.querySelector(".scroll-anim-box");

if (scrollSection && scrollBox) {
  const updateScrollAnimation = () => {
    const sectionTop = scrollSection.offsetTop;
    const sectionHeight = scrollSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = sectionHeight - viewportHeight;

    if (maxScroll <= 0) {
      scrollBox.style.opacity = 0;
      scrollBox.style.transform = "translateX(-120%)";
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset;
    const insideScroll = scrollY - sectionTop;
    let progress = insideScroll / maxScroll;
    progress = Math.max(0, Math.min(1, progress));

    const visibility = 1 - Math.abs(progress - 0.5) / 0.5;
    const translateX = (progress * 2 - 1) * 120;

    scrollBox.style.opacity = visibility.toFixed(3);
    scrollBox.style.transform = `translateX(${translateX}%)`;
  };

  window.addEventListener("scroll", updateScrollAnimation, { passive: true });
  window.addEventListener("resize", updateScrollAnimation);
  updateScrollAnimation();
}

const projectsWrapper = document.querySelector(".projects-wrapper");

if (projectsWrapper) {
  const projectsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          projectsWrapper.classList.add("is-visible");
        } else {
          const rect = entry.boundingClientRect;
          if (rect.top > window.innerHeight) {
            projectsWrapper.classList.remove("is-visible");
          }
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  projectsObserver.observe(projectsWrapper);
}

const track = document.querySelector(".projects-track");
const prevBtn = document.querySelector(".projects-arrow.prev");
const nextBtn = document.querySelector(".projects-arrow.next");
const dotsContainer = document.querySelector(".projects-dots");

if (track && prevBtn && nextBtn && dotsContainer) {
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let autoSlideTimer;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("projects-dot");
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Ir para o projeto ${index + 1}`);
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateSlider(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      updateSlider(currentIndex + 1);
    }, 5000);
  }

  prevBtn.addEventListener("click", () => updateSlider(currentIndex - 1));
  nextBtn.addEventListener("click", () => updateSlider(currentIndex + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateSlider(index));
  });

  startAutoSlide();
}