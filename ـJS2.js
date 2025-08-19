document.addEventListener('DOMContentLoaded', function() {
  const titles = [
    "نصنع الأمل، ونبني المستقبل",
    "رسالتنا: دعم الأسر المحتاجة",
    "قيمنا: الشفافية والتمكين",
    "نحقق التنمية المستدامة لمجتمع أفضل"
  ];

  const subtitles = [
    "نحن نعمل معًا من أجل مجتمع أفضل، حيث نمد يد العون لكل محتاج.",
    "تقديم الدعم الشامل للأفراد والأسر المحتاجة عبر برامج مبتكرة.",
    "نسعى لبناء مجتمع متكافل يتمتع فيه الجميع بالعدالة والكرامة.",
    "كل مشروع نقوم به يهدف لتحسين جودة حياة الأفراد."
  ];

  let index = 0;
  const titleEl = document.getElementById('hero-title');
  const subtitleEl = document.getElementById('hero-subtitle');

  function showText() {
    // اخفاء الحالي
    titleEl.classList.remove('show');
    subtitleEl.classList.remove('show');

    setTimeout(() => {
      // تغيير النصوص
      titleEl.textContent = titles[index];
      subtitleEl.textContent = subtitles[index];

      // اظهار بانسيابية
      titleEl.classList.add('show');
      subtitleEl.classList.add('show');

      // تحديث المؤشر
      index = (index + 1) % titles.length;
    }, 1000); // مدة الانيميشن
  }

  // إضافة الكلاسات
  titleEl.classList.add('fade-up');
  subtitleEl.classList.add('fade-up', 'fade-delay');

  // أول تشغيل
  showText();

  // تكرار كل 6 ثواني
  setInterval(showText, 3000);
});
