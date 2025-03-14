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