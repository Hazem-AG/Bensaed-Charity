document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // سلايدر مجلس الأمناء
  new Swiper(".trustees-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".trustees-swiper .swiper-button-next",
      prevEl: ".trustees-swiper .swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // سلايدر فريق العمل
  new Swiper(".team-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".team-swiper .swiper-button-next",
      prevEl: ".team-swiper .swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
});
function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("تم نسخ: " + text);
    });
  }
  