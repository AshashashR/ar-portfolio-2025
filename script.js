//SP版切り替えができるハンバーガーメニュー
const toggle = document.querySelector('#toggle');

function openNav(){
    toggle.classList.toggle('visible');
}

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// ページ内リンクの際にスムーズスクロールになる
//→その際にページのheaderタグの高さを自動で算出しスクロール位置を調整
const smoothScroll = document.querySelectorAll('a[href^="#"]');

smoothScroll.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let href = btn.getAttribute('href');
        let targetElement = document.getElementById(href.replace('#', ''));

        if (targetElement) {
            const rect = targetElement.getBoundingClientRect().top;
            const offset = window.scrollY;
            const gap = 100;
            const target = rect + offset - gap;

            window.scrollTo({
                top: target,
                behavior: 'smooth',
            });
        }
    });
});

//ページのスクロールに合わせてsectionが表示される
document.addEventListener("DOMContentLoaded", () => {
  const hiddenElements = document.querySelectorAll(".hidden");
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
          }
      });
  }, { threshold: 0.1 });
  
  hiddenElements.forEach(el => observer.observe(el));
});

//Modal window
document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelectorAll(".work_item");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalTitleLink = document.getElementById("modal-title-link");
  const modalSubtitle = document.getElementById("modal-subtitle");
  const modalDescription = document.getElementById("modal-description");
  const modalImage= document.getElementById("modal-image");
  const closeModal = document.querySelector(".close");

  projects.forEach(project => {
      project.addEventListener("click", () => {
          const title = project.getAttribute("data-title");
          const description = project.getAttribute("data-description");
          const subtitle = project.getAttribute("data-subtitle");
          const imageSrc = project.getAttribute("data-image");
          const link = project.getAttribute("data-link");

          modalTitle.textContent = title;
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
      }, 400); // Correspond au temps de l’animation CSS
  }

  closeModal.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (e) => {
      if (e.target === modal) {
          closeModalFunc();
      }
  });
});
