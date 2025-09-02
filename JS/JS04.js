// تهيئة مكتبة AOS للحركات عند التمرير
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
            
            // تهيئة أيقونات Lucide
            lucide.createIcons();
            
            // تأثير التمرير المخصص للعناصر
            const scrollElements = document.querySelectorAll('.fade-in, .staggered-item');
            
            const elementInView = (el, dividend = 1) => {
                const elementTop = el.getBoundingClientRect().top;
                return (
                    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
                );
            };
            
            const displayScrollElement = (element) => {
                element.classList.add('visible', 'animated');
            };
            
            const handleScrollAnimation = () => {
                scrollElements.forEach((el) => {
                    if (elementInView(el, 1.2)) {
                        displayScrollElement(el);
                    }
                });
            };
            
            window.addEventListener('scroll', () => {
                handleScrollAnimation();
            });
            
            // تشغيل مرة أولى عند التحميل
            handleScrollAnimation();
            
            // تأثيرات متتالية للعناصر في القائمة
            const listItems = document.querySelectorAll('.values-list li');
            listItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        });