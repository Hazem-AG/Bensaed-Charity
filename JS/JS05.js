document.addEventListener('DOMContentLoaded', function(){
    const popup=document.querySelector('.glass-popup');
    const closeBtn=document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function(){
        popup.style.animation='fadeOut 0.5s forwards';
        setTimeout(()=>{popup.style.display='none';},500);
    });
    const style=document.createElement('style');
    style.textContent=`@keyframes fadeOut{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(30px) scale(0.95);}}`;
    document.head.appendChild(style);
});
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.querySelector('.popup-overlay');
    const glassPopup = document.querySelector('.glass-popup');
    const closeBtn = document.querySelector('.close-btn');

    // ظهور النافذة بعد ثانيتين
    setTimeout(() => {
        popupOverlay.classList.add('show');   
        glassPopup.classList.add('slide-in'); 
    }, 2000);

    // إغلاق النافذة
    closeBtn.addEventListener('click', () => {
        glassPopup.classList.remove('slide-in');
        glassPopup.classList.add('slide-out'); 
        setTimeout(() => { popupOverlay.classList.remove('show'); }, 500);
    });
});

