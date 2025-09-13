 document.addEventListener('DOMContentLoaded', () => {
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            timelineItems.forEach(item => {
                observer.observe(item);
            });
        });