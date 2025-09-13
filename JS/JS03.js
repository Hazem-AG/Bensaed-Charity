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
    // سلايدرات Swiper.js
    // -------------------------------
    // سلايدر مجلس الأمناء
    initSwiper(".trustees-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // سلايدر فريق العمل
    initSwiper(".team-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // سلايدر الحملات
    initSwiper(".myCampaigns", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
    
    // سلايدر الإنجازات
    initSwiper(".achievements-swiper-container", {
        slidesPerView: 1, 
        spaceBetween: 24, 
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
        },
    });

    // سلايدر المشاريع والأنشطة
    initSwiper(".projects-swiper-container", {
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
        },
    });
    
    // سلايدر طرق التبرع
    initSwiper(".donation-swiper-container", {
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
            768: { slidesPerView: 3 },
        },
    });
    
    // سلايدر شركاؤنا
    initSwiper(".partners-swiper-container", {
        slidesPerView: 2, // عرض شعارين على الموبايل
        spaceBetween: 24,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
        },
    });

    // سلايدر قسم "كن جزءًا من قصتنا"
initSwiper(".contact-forms-swiper", {
    slidesPerView: 1, // عرض بطاقة واحدة على الجوال
    spaceBetween: 24, // المسافة بين البطاقات
    breakpoints: {
        768: { slidesPerView: 2 }, // عرض بطاقتين على الأجهزة اللوحية
        1024: { slidesPerView: 3 }, // عرض 3 بطاقات على أجهزة الكمبيوتر
    },
});

});


// ================================
// دوال مساعدة
// ================================

/**
 * دالة لنسخ النص من عنصر محدد.
 * @param {string} id - معرّف (ID) العنصر المراد نسخ نصه.
 */
function copyText(id) {
    const textElement = document.getElementById(id);
    if (textElement) {
        const text = textElement.innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert(`تم نسخ: ${text}`);
        }).catch(err => {
            console.error('فشل النسخ:', err);
        });
    }
}

/**
 * دالة عامة لتشغيل Swiper.js
 * @param {string} selector - محدد (Selector) الكاروسيل.
 * @param {object} config - إعدادات Swiper.js.
 */
function initSwiper(selector, config) {
    new Swiper(selector, {
        ...config, 
        navigation: {
            nextEl: `${selector} .swiper-button-next`,
            prevEl: `${selector} .swiper-button-prev`,
        },
    });
}