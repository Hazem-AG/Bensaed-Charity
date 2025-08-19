    document.addEventListener('DOMContentLoaded', function() {
    // استبدال أيقونات Lucide
    lucide.createIcons();

    // قائمة الموبايل
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // عدادات متحركة
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; 

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target.toLocaleString('en-US');
        }
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats');
    if(statsSection) {
        observer.observe(statsSection);
    }

    // بيانات ورسومات بيانية
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('en-US');
                    }
                }
            }
        }
    };

    const years = ['2019', '2020', '2021', '2022', '2023', '2024'];
    
    const createChart = (canvasId, data) => {
        const ctx = document.getElementById(canvasId)?.getContext('2d');
        if(ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'عدد المستفيدين',
                        data: data,
                        borderColor: '#0ea9b6',
                        backgroundColor: 'rgba(14, 169, 182, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: chartOptions
            });
        }
    };

    createChart('ramadanChart1', [0, 1000, 1300, 1420, 1488, 1566]);
    createChart('ramadanChart2', [0, 560, 780, 1897, 1984, 2531]);
    createChart('zakatChart', [0, 100, 150, 160, 170, 200]);
    createChart('adhaChart', [0, 132, 170, 240, 250, 525]);
        createChart('adhaChart2', [0, 0, 0, 0, 525, 1250]);
    createChart('schoolChart', [0, 30, 50, 70, 133, 209]);
    createChart('winterChart', [102, 153, 204, 304, 320, 360]);
    
const monthlyCasesChartCtx = document.getElementById('monthlyCasesChart')?.getContext('2d');
if (monthlyCasesChartCtx) {
    // تدرج بنفس ألوان الموقع
    const gradient = monthlyCasesChartCtx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#0ea9b6'); // تركواز فاتح
    gradient.addColorStop(1, '#0c8a96'); // تركواز غامق

    new Chart(monthlyCasesChartCtx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'متوسط عدد المستفيدين شهريًا',
                data: [150, 220, 350, 500, 700, 950],
                backgroundColor: gradient,
                borderRadius: 12,
                borderSkipped: false,
                hoverBackgroundColor: '#0ea9b6', 
                hoverBorderColor: '#0c8a96'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#0c8a96',
                        font: {
                            size: 14,
                            family: 'Cairo, sans-serif',
                            weight: '600'
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#0c8a96',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 10,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        borderDash: [6, 4]
                    },
                    ticks: { 
                        color: '#444',
                        font: { size: 13, weight: '500' }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { 
                        color: '#444',
                        font: { size: 13, weight: '500' }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}


    // === كود تحسينات شريط التنقل ===
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('#desktop-nav .nav-link');

    // 1. تغيير شكل الهيدر عند التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. تمييز الرابط النشط عند التمرير
    const observerOptions2 = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions2);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // === كود السلايدر للصور في الهوم مع انتقال سلس ===
    const slides = [
        "1.jpg",
        "2.png",
        "3.png"
    ];
    let currentSlide = 0;
    const homeImg = document.querySelector("#home img");

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        homeImg.classList.add("opacity-0"); // اخفاء تدريجي
        setTimeout(() => {
            homeImg.src = slides[currentSlide];
            homeImg.classList.remove("opacity-0"); // إظهار تدريجي
        }, 500);
    }

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); // كل 5 ثواني تتغير الصورة
});
// تفعيل Scroll سلس عند الضغط على روابط الـ nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// إظهار وإخفاء الأقسام تدريجيًا
const fadeSections = document.querySelectorAll("main section");

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");   // يظهر تدريجي
        } 
    });
}, { threshold: 0.2 });

fadeSections.forEach(section => {
    fadeObserver.observe(section);
});
document.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
 lucide.createIcons();

    // تغيير لون شريط التنقل عند التمرير
    const navbar = document.getElementById("navbar");
    const desktopNav = document.getElementById("desktop-nav");
    const mobileButton = document.getElementById("mobile-menu-button");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("bg-white", "shadow-md");
        desktopNav.classList.remove("text-white");
        desktopNav.classList.add("text-gray-800");
        mobileButton.classList.remove("text-white");
        mobileButton.classList.add("text-gray-800");
      } else {
        navbar.classList.remove("bg-white", "shadow-md");
        desktopNav.classList.remove("text-gray-800");
        desktopNav.classList.add("text-white");
        mobileButton.classList.remove("text-gray-800");
        mobileButton.classList.add("text-white");
      }
    });

    // قائمة الموبايل
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  
    
    document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('egypt-map', { zoomControl: false }).setView([26.8206, 30.8025], 6);

  // Tiles فاتحة وأنيقة
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // زووم كنترول
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // أيقونة Gradient + أيقونة قلب
  const pinIcon = L.divIcon({
  className: "custom-pin bounce",
  html: `<div style="
      width:48px; height:48px; 
      border-radius:50%; 
      background: linear-gradient(135deg, #0ea9b6, #0a6c79); 
      display:flex; align-items:center; justify-content:center; 
      color:#fff; font-size:20px;
      box-shadow:0 4px 12px rgba(0,0,0,0.3);
    ">🤝</div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});

  // المواقع
 const contributions = [
  { city: "عرب شركس", coords: [30.178007006449594, 31.18501336835836], help: " تم عمل محطه تحليه مياه " },
  { city: " عرب مره ", coords: [30.167729820317273, 31.183454308046144], help: " تم عمل محطه تحليه مياه   " },
  { city: "قريه ابوسنه", coords: [30.153087187916025, 31.22224020802629], help: " تم عمل محطه تحليه مياه  " },
  { city: " بني سويف ", coords: [29.06730277688671, 31.100833698179326], help: " تم عمل وصلات مياه في قري محافظة بني سويف لخدمه الاهالي  " },
];

// إنشاء البنات مع البوب أب
contributions.forEach(loc => {
  L.marker(loc.coords, { icon: pinIcon })
    .addTo(map)
    .bindPopup(`
      <div style="min-width:180px; font-family: 'Cairo', sans-serif; text-align:center;">
        <h3 style="margin:0; font-size:16px; color:#0ea9b6;">${loc.city}</h3>
        <p style="margin:4px 0; font-size:14px; color:#333;">${loc.help}</p>
      </div>
    `);
});
});