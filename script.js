// scroll to top button
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//SP版切り替えができるハンバーガーメニュー
function openNav() {
  var menu = document.getElementById("toggle");
  menu.classList.toggle("visible");

  // Ajoute ou enlève la classe "open" pour transformer l'icône du hamburger en X
  var hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("open");

  // Ajouter un événement sur chaque lien pour fermer le menu quand l'utilisateur clique dessus
  var links = document.querySelectorAll(".links-small a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      // Ferme le menu en enlevant la classe "visible" et le "open" sur l'icône
      menu.classList.remove("visible");
      hamburger.classList.remove("open");
    });
  });
}
// window.onscroll = function () {
//   myFunction();
// };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

window.onscroll = function () {
  myFunction();
};

// ページ内リンクの際にスムーズスクロールになる
//→その際にページのheaderタグの高さを自動で算出しスクロール位置を調整
const smoothScroll = document.querySelectorAll('a[href^="#"]');

smoothScroll.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let href = btn.getAttribute("href");
    let targetElement = document.getElementById(href.replace("#", ""));

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect().top;
      const offset = window.scrollY;
      const gap = 100;
      const target = rect + offset - gap;

      window.scrollTo({
        top: target,
        behavior: "smooth",
      });
    }
  });
});



//ページのスクロールに合わせてsectionが表示される
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section:not(#home)"); // Sélectionne toutes les sections
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // Ajoute la classe "visible"
        observer.unobserve(entry.target); // Optionnel : arrête d'observer après l'animation
      }
    });
  }, { threshold: 0.1 }); // 10% de la section visible avant activation

  sections.forEach(section => observer.observe(section)); // Observe chaque section
});


/*works category button*/
document.addEventListener("DOMContentLoaded", () => {
  const categoryLinks = document.querySelectorAll(".work__category a");
  const worksItems = document.querySelectorAll(".work_item");
  const defaultCategory = "coding"; // Catégorie par défaut

  function filterWorks(category) {
    worksItems.forEach((item) => {
      item.style.display = item.getAttribute("data-category").includes(category)
        ? "block"
        : "none";
    });

    // Mettre à jour l'état visuel des liens de catégorie
    categoryLinks.forEach((link) => {
      if (link.getAttribute("data-category") === category) {
        link.classList.add("active"); // Ajoute une classe pour styliser la catégorie active
      } else {
        link.classList.remove("active");
      }
    });
  }

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.getAttribute("data-category");
      filterWorks(category);
    });
  });

  // Sélectionner automatiquement la catégorie "coding" au chargement
  const defaultLink = document.querySelector(
    `.work__category a[data-category="${defaultCategory}"]`
  );
  if (defaultLink) {
    filterWorks(defaultCategory);
  }
});


//Modal window WORK section
document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelectorAll(".work_item");
  const modal = document.getElementById("modal");
  // const modalTitle = document.getElementById("modal-title");
  const modalTitleLink = document.getElementById("modal-title-link");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image");
  const modalSlider = document.getElementById("modal-slider");
  const closeModal = document.querySelector(".close");
  const modalVideoContainer = document.getElementById("modal-video-container");
  const modalVideo = document.getElementById("modal-video");
  // const modalVideoSource = document.getElementById("modal-video-source");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  let slides = [];
  

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  projects.forEach((project) => {
    project.addEventListener("click", () => {
      // const titleLink = project.getAttribute("data-title-link");
      // const description = project.getAttribute("data-description");
      const imageSources = project.getAttribute("data-images")
        ? project.getAttribute("data-images").split(",")
        : [];
      const subtitle = project.getAttribute("data-subtitle");
      const imageSrc = project.getAttribute("data-image");
      const link = project.getAttribute("data-link");
      let videoUrl = project.getAttribute("data-video"); // Récupérer la vidéo

      const projectIndex = project.getAttribute("data-index"); // Assure-toi que chaque projet ait un 'data-index'

      const titleKey = `project_title_${projectIndex}`;
      const descriptionKey = `project_description_${projectIndex}`;

      const titleLink = translations[currentLang][titleKey];
      const description = translations[currentLang][descriptionKey];

      modalTitleLink.textContent = titleLink;
      modalTitleLink.href = link;
      // modalTitle.textContent = title;
      // modalTitleLink.style.display = "inline-block";
      modalSubtitle.textContent = subtitle;
      modalDescription.textContent = description;
      modalImage.src = imageSrc; // Change l'image
      modalImage.style.display = "block";

      // Cacher l'image principale si un slider est activé
      if (imageSources.length > 1) {
        modalImage.style.display = "none"; // Cacher l'image principale si plusieurs images
      } else {
        modalImage.src = imageSrc; // Sinon, afficher l'image principale
        modalImage.style.display = "block";
      }

      // Gestion de la vidéo
      if (videoUrl) {
        // Vérifie si l'URL est une URL Vimeo et la convertit en URL d'intégration
        const vimeoIdMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
        if (vimeoIdMatch) {
          videoUrl = `https://player.vimeo.com/video/${vimeoIdMatch[1]}`;
        }

        modalVideo.src = videoUrl;
        modalVideoContainer.style.display = "block";
        modalImage.style.display = "none";
      } else {
        modalVideoContainer.style.display = "none";
      }

      // Vider le slider avant d'ajouter de nouvelles images
      modalSlider.innerHTML = "";

      if (imageSources.length > 1) {
        // Ajouter dynamiquement les images seulement s'il y en a plusieurs
        imageSources.forEach((src, index) => {
          const img = document.createElement("img");
          img.src = src.trim();
          img.classList.add("slide");
          if (index === 0) img.classList.add("active");
          modalSlider.appendChild(img);
        });

        // Afficher le slider et les boutons de navigation
        modalSlider.style.display = "flex";
        prevButton.style.display = "block";
        nextButton.style.display = "block";
      } else if (imageSources.length === 1) {
        // Si une seule image, l'afficher sans slider
        const img = document.createElement("img");
        img.src = imageSources[0].trim();
        img.classList.add("slide", "active");
        modalSlider.appendChild(img);

        // Cacher le slider et les boutons de navigation
        modalSlider.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
      } else {
        // Si aucune image, cacher le slider
        modalSlider.style.display = "none";
        prevButton.style.display = "none";
        nextButton.style.display = "none";
      }

      // Mettre à jour la liste des slides
      slides = document.querySelectorAll(".slide");
      currentIndex = 0;

      // Assure que la modal s'affiche à chaque clic
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("show");
      }, 10); // Petit délai pour déclencher l'animation
    });
  });

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  function closeModalFunc() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      modalVideo.pause(); // Stopper la vidéo quand on ferme la modal
    }, 400);
  }

  closeModal.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
});

//Modal window personal work
document.addEventListener("DOMContentLoaded", () => {
  const portfolioProjects = document.querySelectorAll(".portfolio_item");
  const modal = document.getElementById("modal");
  const modalTitleLink = document.getElementById("modal-title-link");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".close");

  portfolioProjects.forEach((project) => {
    project.addEventListener("click", () => {
      // const titleLink = project.getAttribute("data-title-link");
      // const description = project.getAttribute("data-description");
      const subtitle = project.getAttribute("data-subtitle");
      const imageSrc = project.getAttribute("data-image");
      const link = project.getAttribute("data-link");

      const portfolioIndex = project.getAttribute("data-index"); // Assure-toi que chaque projet ait un 'data-index'

      const titleKey = `portfolio_title_${portfolioIndex}`;
      const descriptionKey = `portfolio_description_${portfolioIndex}`;

      const titleLink = translations[currentLang][titleKey];
      const description = translations[currentLang][descriptionKey];

      modalTitleLink.textContent = titleLink;
      modalTitleLink.href = link;
      modalSubtitle.textContent = subtitle;
      modalDescription.textContent = description;
      modalImage.src = imageSrc; // Change l'image
      modalImage.style.display = "block";

      // Assure que la modal s'affiche à chaque clic
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("show");
      }, 10); // Petit délai pour déclencher l'animation
    });
  });

  function closeModalFunc() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  }

  closeModal.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
});

