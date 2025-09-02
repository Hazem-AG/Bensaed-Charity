// ================================
// تشغيل عند تحميل DOM
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // القائمة المتنقلة
  // -------------------------------
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // -------------------------------
  // سلايدر مجلس الأمناء
  // -------------------------------
  initSwiper(".trustees-swiper", 3);

  // -------------------------------
  // سلايدر فريق العمل
  // -------------------------------
  initSwiper(".team-swiper", 3);

  // -------------------------------
  // سلايدر الحملات
  // -------------------------------
  new Swiper(".myCampaigns", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 }, 
      1024: { slidesPerView: 3 }, 
    },
  });
});

// ================================
// دوال مساعدة
// ================================

// دالة نسخ النص
function copyText(id) {
  const textElement = document.getElementById(id);
  if (textElement) {
    const text = textElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("تم نسخ: " + text);
    });
  }
}


function initSwiper(selector, defaultSlides) {
  new Swiper(selector, {
    slidesPerView: defaultSlides,
    spaceBetween: 30,
    navigation: {
      nextEl: `${selector} .swiper-button-next`,
      prevEl: `${selector} .swiper-button-prev`,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: defaultSlides },
    },
  });
}
