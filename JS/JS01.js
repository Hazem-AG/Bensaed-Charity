    document.addEventListener('DOMContentLoaded', function() {
    // استبدال أيقونات Lucide
    lucide.createIcons();

   // قائمة الموبايل
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = mobileMenu.querySelectorAll('a');

// فتح/قفل القائمة بالزر
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    if (mobileMenu.classList.contains('hidden')) {
        // القائمة مقفولة → رجع السكرول
        document.body.classList.add('no-scroll');
    } else {
        // القائمة مفتوحة → وقف السكرول
        document.body.classList.remove('no-scroll');
    }
});

// قفل القائمة عند الضغط على اللينكات
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('no-scroll'); // رجع السكرول
    });
});



    // عدادات متحركة
    const counters = document.querySelectorAll('.counter-value');
    const speed = 100; 

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

    createChart('ramadanChart1', [250, 1000, 1300, 1420, 1488, 1566]);
    createChart('ramadanChart2', [150, 560, 780, 1897, 1984, 2531]);
    createChart('zakatChart', [50, 100, 150, 160, 170, 200]);
    createChart('adhaChart', [60, 132, 170, 240, 250, 525]);
        createChart('adhaChart2', [150, 250, 350, 450, 525, 1250]);
    createChart('schoolChart', [30, 30, 50, 70, 133, 209]);
    createChart('winterChart', [102, 153, 204, 304, 320, 360]);
    
const monthlyCasesChartCtx = document.getElementById('monthlyCasesChart')?.getContext('2d');
if (monthlyCasesChartCtx) {
    // تدرج شفاف "زجاجي"
    const gradient = monthlyCasesChartCtx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(14, 169, 182, 0.7)'); // تركواز فاتح شفاف
    gradient.addColorStop(1, 'rgba(12, 138, 150, 0.5)'); // تركواز غامق شفاف

    new Chart(monthlyCasesChartCtx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'متوسط عدد المستفيدين شهريًا',
                data: [150, 220, 350, 500, 700, 950],
                backgroundColor: gradient,
                borderRadius: 0,
                borderSkipped: false,
                borderWidth: 0,
                hoverBackgroundColor: 'rgba(14, 169, 182, 0.9)', 
                hoverBorderColor: 'rgba(12, 138, 150, 0.9)',
                barPercentage: 0.6,
                categoryPercentage: 0.5,
                shadowOffsetX: 0,
                shadowOffsetY: 4,
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.15)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgba(12, 138, 150, 0.9)',
                        font: {
                            size: 14,
                            family: 'Cairo, sans-serif',
                            weight: '600'
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(12, 138, 150, 0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 12,
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
                        color: 'rgba(0,0,0,0.7)',
                        font: { size: 13, weight: '500' }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { 
                        color: 'rgba(0,0,0,0.7)',
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

    // 2. تمييز الرابط  عند التمرير
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
        "./src/IMG/1.jpg",
        "./src/IMG/2.png",
        "./src/IMG/3.png"
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
    }, 4000); // 
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
}, { threshold: 0.02, rootMargin: "0px 0px -50px 0px" });

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
  
    
    