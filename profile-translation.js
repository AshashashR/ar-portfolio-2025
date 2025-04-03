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


//ページのスクロールに合わせてsectionが表示される
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // Sélectionne toutes les sections
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Ajoute la classe "visible"
          observer.unobserve(entry.target); // Optionnel : arrête d'observer après l'animation
        }
      });
    }, { threshold: 0.1 }); // 20% de la section visible avant activation
  
    sections.forEach(section => observer.observe(section)); // Observe chaque section
  });
  


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

// 📌 Dictionnaire des traductions
const translations = {
  ja: {
    profile_text_1: `ご覧いただきありがとうございます！<br>日本の企業でコーダとして働いており、複数のECサイトの運営に携わっております、Ashleyと申します。`,
    profile_text_2: `日本に来てから7年間は、主にカスタマーサービス（販売員・営業）や翻訳の仕事をしていましたが、<br>
                      2021年にキャリアチェンジを決意し、プログラミングの勉強を始めました。`,
    profile_text_3: `もともと創造力があり、問題解決が得意で、コミュニケーション能力にも自信があります。<br>
                      これらのスキルは、IT業界で活躍する上で非常に重要だと感じています。<br>
                      常に新しい視点を大切にし、特にウェブ開発の分野では日々学ぶことが尽きません。
                      この新しいキャリアに大きなやりがいを感じながら、楽しく仕事をしています！`,

    history_year_1: `1990年`,
    history_title_1: `パリ・フランス生まれ育ち
                        <p>
                            幼い頃から創作に強い関心を持っていました。小さい頃はよく絵を描き、漫画のさまざまなシナリオを考えていました。
                            絵に対する情熱を深めたいと思い、中学卒業後、美術系の高校に進学しました。
                        </p>`,
    history_year_2: `2009年`,
    history_title_2: `パリ・シテ大学（旧パリ大学、旧パリ・ディドロパリ第七大学）東アジア言語文化学部日本語科　入学
                        <p>
                            美術高校を卒業した後、将来何をしたいのかはっきりと分かりませんでした。<br>
                            絵を描くことが「情熱」というよりも「趣味」に近いものだと気づきましたが、それでも「何かを創りたい」という気持ちは変わりませんでした。
                            高校時代には独学でギターを始め、音楽に強い興味を持つようになりました。そこで、音楽を学び、楽典の基礎を身につけるために、パリ第8大学の音楽学科に入学しました。
                            しかし、結局そこには1年しか在籍しませんでした。<br><br>
                            その後、バイトに明け暮れながら、何をすべきか分からず迷っていましたが、私の絵に対する興味は、幼い頃から親しんできた漫画やアニメを通じて日本と深く結びついていました。<br>
                            そして、私は決意しました―― <br>
                            「日本語を学びたい！もっと日本の文化についてもっと知りたい！」 <br><br>
                            こうして、パリ・シテ大学 東アジア言語文化学部日本語科に進学しました。
                        </p>`,
    history_year_3: `2015年`,
    history_title_3: `パリ・シテ大学 社会人間学部 東アジア言語文化学科 日本語専攻 卒業、日本へのワーキングホリデー決定
                        <p>
                            2012年に学士号を取得した後、進学するかどうか迷っていました。<br>
                            最終的に、近所のスーパーでアルバイトをしながら、日本でのワーキングホリデーに向けて貯金することに決めました。<br>
                            <br>
                            そして、2015年2月、ついに日本へ旅立ち、東京での生活をスタートさせました。<br>
                            長年の準備を経て、ついに『日本で暮らす』という夢が叶いました！
                            <br>
                            東京での最初の数年間は、さまざまな仕事を経験しました。
                            家庭教師としてフランス語を教えたり、クレープ屋さんでウェイトレスをしたり、日本在住の外国人向けの不動産会社で営業職を務めたりしました。
                        </p>`,
    history_year_4: `2021年`,
    history_title_4: `WEB制作アシスタントとして働く
                        <p>
                            以前から、日本語・英語・フランス語を生かせる仕事に就きたいと考えていました。<br>
                            しかし、2020年のコロナ禍の影響で、多くの企業が閉業を余儀なくされ、とくに観光業界は大きな打撃を受けました。そのため、将来について真剣に考え直し、プログラミングの道へ進むことを決意しました。
                            <br>
                            2021年2月、プログラミングスクールに入学し、ゼロから学習をスタートしました。学ぶうちにフロントエンドに魅力を感じ、この分野でキャリアを積むことを決意しました。<br>

                            そして、2021年8月に卒業し、同年11月からEC企業でWEB制作アシスタントとして働き始めました。
                        </p>`,
    history_year_5: `2022年`,
    history_title_5: `東京から福岡へ移住、WEBコーダーとして活動
                        <p>
                            EC業界でさまざまな経験を積む中で、さらに知識を深め、コーディングやプログラミングのスキルを向上させたいと考え、WEB制作会社への転職を決意しました。 
                            しかし、次第に東京での生活に息苦しさを感じるようになり、新たな環境を求めていたところ、福岡のEC企業からWEBコーダーとして内定をいただき、2022年12月に福岡へ移住しました。
                        </p>`,
  },

  en: {
    profile_text_1: `Thank you for visiting my portfolio!<br>My name is Ashley, and I work as a coder in a Japanese company, managing multiple e-commerce sites.`,
    profile_text_2: `For seven years in Japan, I mainly worked in customer service (sales & business) and translation.
                      In 2021, I decided to change my career path and started studying programming.`,
    profile_text_3: `I have always been creative, a problem solver, and a good communicator and these are essential skills in the IT industry.
                      I enjoy gaining new perspectives and learning continuously, especially in web development.
                      This career change has been incredibly fulfilling, and I’m loving every moment of it!`,

    history_year_1: `1990`,
    history_title_1: `Born and raised in Paris, France <p>From a young age, I had a strong passion for creativity. As a child, I often drew and imagined various scenarios for manga stories. 
                Wanting to deepen my passion for art, I decided to attend an art-focused high school after graduating from middle school.</p>`,
    history_year_2: `2009`,
    history_title_2: `Paris Cité University (formerly Paris Diderot University – Paris 7) Department of East Asian Languages and Cultures – Japanese Studies
     <p>After graduating from art high school, I wasn’t entirely sure what I wanted to do in the future.<br>
                            I realized that drawing felt more like a hobby than a true passion, yet my desire to create remained unchanged.
                            During high school, I taught myself guitar and became deeply interested in music. Hoping to study music theory and develop a stronger foundation, I enrolled in the Music Department at Paris 8 University. However, I only stayed there for a year.<br><br>
                            After that, I spent my time working part-time jobs while feeling lost about what path to take. 
                            My interest in drawing had always been closely connected to Japan through the manga and anime I grew up with.<br>
                            That’s when I made a decision—<br>
                            "I want to learn Japanese! I want to know more about Japanese culture!" <br><br>
                            With that determination, I enrolled in the Japanese Studies program at Paris Cité University.</p>`,
    history_year_3: `2015`,
    history_title_3: `Graduated from Paris Cité University – Faculty of Social and Human Sciences, Major in Japanese Studies, decided to go to Japan on a Working Holiday <p>After earning my degree in 2012, I was unsure whether to continue my studies.<br>
                            In the end, I decided to save up for a working holiday in Japan while working part-time at a local supermarket.<br>
                            <br>
                            Then, in February 2015, I finally set off for Japan and began my life in Tokyo. <br>After years of preparation, my dream of "living in Japan" had come true!
                            <br>
                            During my first few years in Tokyo, I worked various jobs: teaching French as a private tutor, working as a waitress at a crepe shop, and even serving as a sales representative at a real estate company for foreign residents in Japan.</p>`,
    history_year_4: `2021`,
    history_title_4: `Started working as a Web Creative Assistant <p>For a long time, I wanted to find a job where I could make use of my Japanese, English, and French language skills.<br>
                            However, due to the impact of the COVID-19 pandemic in 2020, many businesses were forced to close, with the tourism industry being hit especially hard. This made me reconsider my future seriously, and I decided to pursue programming.
                            <br>
                            In February 2021, I enrolled in a programming school and started learning from scratch. As I studied, I became particularly fascinated by front-end development and decided to build a career in this field.<br>

                            After graduating in August 2021, I started working as a Web Creative Assistant at an e-commerce company in November of the same year.</p>`,
    history_year_5: `2022`,
    history_title_5: `Moved from Tokyo to Fukuoka, working as a Web Coder <p>While gaining experience in the e-commerce industry, I wanted to further improve my coding and programming skills. 
                    This led me to pursue a job at a web development company. However, over time, I started feeling constrained by life in Tokyo and found myself longing for a new environment.
                    At that moment, I received a job offer as a coder from an e-commerce company in Fukuoka. 
                    I decided to take the opportunity and moved to Fukuoka in December 2022.</p>`,
  },
};

let currentLang = localStorage.getItem("selectedLanguage") || "ja"; // Récupère la langue stockée ou "ja" par défaut

// 📌 Sélectionner TOUS les boutons de langue (PC & mobile)
const langButtons = document.querySelectorAll(".lang_button");

// 📌 Fonction pour changer la langue avec une transition fluide
function toggleLanguage() {
  currentLang = currentLang === "ja" ? "en" : "ja"; // Bascule entre "ja" et "en"
  localStorage.setItem("selectedLanguage", currentLang); // 🔹 Sauvegarde la langue sélectionnée

  // Appliquer la classe de langue AVANT de changer le texte
  document.body.classList.toggle("english", currentLang === "en");
  document.body.classList.toggle("japanese", currentLang === "ja");

  updateTexts();
}

// 📌 Fonction pour animer le changement de texte en douceur
function fadeText(element, newText) {
  element.style.transition = "opacity 0.3s ease, transform 0.3s ease"; // Ajout transition
  element.style.opacity = "0";
  element.style.transform = "translateY(10px)";

  setTimeout(() => {
    element.innerHTML = newText; // Mise à jour du texte
    element.offsetHeight; // ⚡ Force le recalcul du DOM
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }, 300); // Attendre avant de changer le texte
}

// 📌 Fonction pour mettre à jour les textes
function updateTexts() {
  // 🔹 Mise à jour des textes de la section "Profile"
  document.querySelectorAll(".profile__text").forEach((p, index) => {
    const key = `profile_text_${index + 1}`;
    if (translations[currentLang][key]) {
      fadeText(p, translations[currentLang][key]); // Applique l'effet de transition
    }
  });

  // 🔹 Mise à jour des textes de la section "History"
  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    if (translations[currentLang][key]) {
      fadeText(element, translations[currentLang][key]); // Applique l'effet de transition
    }
  });

  // 🔹 Mettre à jour le texte des boutons de langue
  langButtons.forEach((button) => {
    button.innerHTML = currentLang === "ja" ? "🇬🇧" : "🇯🇵";
  });
}

// 📌 Ajouter l'événement de changement de langue à tous les boutons
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleLanguage();
  });
});

// 📌 Initialiser la langue au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  // Appliquer la bonne classe de langue
  document.body.classList.add(currentLang === "ja" ? "japanese" : "english");

  updateTexts(); // Charger les textes avec la langue sauvegardée
});

