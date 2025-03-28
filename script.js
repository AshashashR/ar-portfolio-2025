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
  links.forEach(function(link) {
      link.addEventListener("click", function() {
          // Ferme le menu en enlevant la classe "visible" et le "open" sur l'icône
          menu.classList.remove("visible");
          hamburger.classList.remove("open");
      });
  });
}
window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

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
document.addEventListener("DOMContentLoaded", () => {
  const hiddenElements = document.querySelectorAll(".hidden");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  hiddenElements.forEach((el) => observer.observe(el));
});

//Modal window
document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelectorAll(".work_item");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalTitleLink = document.getElementById("modal-title-link");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalDescription = document.getElementById("modal-description");
  const modalImage = document.getElementById("modal-image");
  const modalSlider = document.getElementById("modal-slider");
  const closeModal = document.querySelector(".close");
  const modalVideoContainer = document.getElementById("modal-video-container");
  const modalVideo = document.getElementById("modal-video");
  const modalVideoSource = document.getElementById("modal-video-source");
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
      const titleLink = project.getAttribute("data-title-link");
      const description = project.getAttribute("data-description");
      const imageSources = project.getAttribute("data-images")
        ? project.getAttribute("data-images").split(",")
        : [];
      const subtitle = project.getAttribute("data-subtitle");
      const imageSrc = project.getAttribute("data-image");
      const link = project.getAttribute("data-link");
      let videoUrl = project.getAttribute("data-video"); // Récupérer la vidéo

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
      const titleLink = project.getAttribute("data-title-link");
      const description = project.getAttribute("data-description");
      const subtitle = project.getAttribute("data-subtitle");
      const imageSrc = project.getAttribute("data-image");
      const link = project.getAttribute("data-link");

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


//traduction EN/JP 
const translations = {
  ja: {
    title: "🇫🇷フランス・パリ出身で、<br>福岡市に拠点を置いています。🇯🇵",
    description: `私はAshleyと申します。現在、日本の企業でコーダとして働いており、複数のECサイトの運営に携わっています。<br><br>
      日本に来てから7年間は、主にカスタマーサービス（販売員・営業）や翻訳の仕事をしていましたが、2021年にキャリアチェンジを決意し、プログラミングの勉強を始めました。<br><br>
      もともと創造力があり、問題解決が得意で、コミュニケーション能力も高い方だと自負しています。これらのスキルはIT業界で活躍する上でとても重要だと感じています。
      常に新しい視点で物事を考えることを大切にしており、特にウェブ開発の分野では日々学ぶことが尽きません。この新しいキャリアにとてもやりがいを感じ、楽しく仕事をしています！`,
    button: "🇬🇧",
    coding: "コーディング",
    promotion: "販促物デザイン",
    video: "動画編集"
  },

  en: {
    title: "From Paris, France. 🇫🇷<br> Based in Fukuoka, Japan. 🇯🇵",
    description: `My name is Ashley and I am a web developer.<br>
      I am currently working as a web developer in a Japanese company that owns several e-commerce shops.
      <br><br>
      During my seven years in Japan, I mostly worked in the sectors of customer service (sales representative) and translation.<br><br>
      I decided it was time for a career change in 2021, therefore I began studying web programming.
      I've always been creative and an excellent problem solver with high communication skills, and I believe it's one of the many qualities
      required to thrive in IT. I am always trying to think outside the box and I am still learning new things, especially in web development and I really enjoy this new career change !`,
    button: "🇯🇵",
    coding: "Coding",
    promotion: "Promotional Design",
    video: "Video Editing"
  }
};

let currentLang = "ja";  // Définit la langue par défaut en japonais

// Sélectionner TOUS les boutons de langue (PC et mobile)
const langButtons = document.querySelectorAll(".lang_button");

// Fonction pour changer la langue
function toggleLanguage() {
  currentLang = currentLang === "ja" ? "en" : "ja";  // Basculer entre "ja" et "en"

  // Appliquer la traduction
  document.getElementById("about_subtitle").style.opacity = "0";
  document.getElementById("about_text").style.opacity = "0";

  setTimeout(() => {
    document.getElementById("about_subtitle").innerHTML = translations[currentLang].title;
    document.getElementById("about_text").innerHTML = translations[currentLang].description;

    // Mettre à jour les catégories de travail
    document.querySelectorAll('.work__category a').forEach(link => {
      const category = link.getAttribute('data-category');
      link.innerHTML = translations[currentLang][category];  // Mettre à jour le texte des catégories
    });

    // Mettre à jour les classes du body (ou un autre parent)
    if (currentLang === "en") {
      document.body.classList.add("english");  // Ajouter la classe pour l'anglais
      document.body.classList.remove("japanese");  // Retirer la classe pour le japonais
    } else {
      document.body.classList.add("japanese");  // Ajouter la classe pour le japonais
      document.body.classList.remove("english");  // Retirer la classe pour l'anglais
    }

    // Mettre à jour TOUS les boutons de langue (version PC et mobile)
    langButtons.forEach(button => {
      if (button.id === "lang-toggle-pc") {
        // Sur PC, on affiche les drapeaux 🇬🇧 ou 🇯🇵
        button.innerHTML = currentLang === "ja" ? "🇬🇧" : "🇯🇵"; 
      } else if (button.id === "lang-toggle-mobile") {
        // Sur mobile, afficher le drapeau 🇯🇵 ou 🇬🇧
        button.innerHTML = currentLang === "ja" ? "🇬🇧" : "🇯🇵"; 
      }
    });

    // Effet de fade-in
    document.getElementById("about_subtitle").style.opacity = "1";
    document.getElementById("about_text").style.opacity = "1";
  }, 300);
}

// Ajouter l'événement pour TOUS les boutons de langue
langButtons.forEach(button => {
  button.addEventListener("click", toggleLanguage);
});

// Initialiser la langue à "ja" (japonais) lors du chargement
window.addEventListener('load', function() {
  document.getElementById("about_subtitle").innerHTML = translations[currentLang].title;
  document.getElementById("about_text").innerHTML = translations[currentLang].description;

  // Mettre à jour les boutons au début
  langButtons.forEach(button => {
    if (button.id === "lang-toggle-pc") {
      button.innerHTML = currentLang === "ja" ? "🇬🇧" : "🇯🇵";  // Afficher les drapeaux sur PC
    } else if (button.id === "lang-toggle-mobile") {
      button.innerHTML = currentLang === "ja" ? "🇬🇧" : "🇯🇵";  // Afficher les drapeaux sur mobile
    }
  });

  // Mettre à jour les catégories dès le début
  document.querySelectorAll('.work__category a').forEach(link => {
    const category = link.getAttribute('data-category');
    link.innerHTML = translations[currentLang][category];  // Mettre à jour le texte des catégories
  });

  // Appliquer la classe initiale
  if (currentLang === "en") {
    document.body.classList.add("english");
    document.body.classList.remove("japanese");
  } else {
    document.body.classList.add("japanese");
    document.body.classList.remove("english");
  }
});
