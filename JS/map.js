document.addEventListener('DOMContentLoaded', function () {
            // تحسين الخريطة بإعدادات أكثر تقدمًا
            const map = L.map('egypt-map', {
                zoomControl: false,
                dragging: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                fadeAnimation: true,
                zoomAnimation: true,
                    touchZoom: false          
            }).setView([30.178403971784263, 31.20699048623591], 11);
            
            // استخدام طبقة خرائط أكثر جمالاً
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19,
                minZoom: 10
            }).addTo(map);
            
            // إضافة طبقة تضاريس خفيفة
            L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a>',
                opacity: 0.1
            }).addTo(map);
            
            // تحسين عناصر التحكم في الخريطة
            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);
            
            // تحسين شكل Marker
            const pinIcon = L.divIcon({
                className: "custom-pin",
                html: `<div style="
                    width: 20px; 
                    height: 20px; 
                    border-radius: 50% 50% 50% 0; 
                    background: linear-gradient(135deg, #0ea9b6, #0a6c79); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: #fff; 
                    font-size: 12px;
                    transform: rotate(-45deg);
                "><div style="transform: rotate(45deg);">🤝</div></div>`,
                iconSize: [20, 20],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });
            
            const contributions = [
    { 
        city: "عرب شركس", 
        coords: [30.178007006449594, 31.18501336835836], 
        help: "تم عمل محطة تحلية مياه",
        details: "مساعدة حالات مستحقة بشكل شهري او موسمي"
    },
    { 
        city: "عرب مره", 
        coords: [30.167729820317273, 31.183454308046144], 
        help: "تم عمل محطة تحلية مياه",
        details: "مساعدة حالات مستحقة بشكل شهري او موسمي"
    },
    { 
        city: "قريه ابوسنه", 
        coords: [30.153087187916025, 31.22224020802629], 
        help: "تم عمل محطة تحلية مياه",
        details: "مساعدة حالات مستحقة بشكل شهري او موسمي"
    },

    // 🟢 المناطق الجديدة من الجدول:
    { city: "قليوب البلد", coords: [30.17887009165943, 31.207619094692973], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "قليوب المحطة", coords: [30.181605887305512, 31.226267012152277], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "عزبة الاجينة", coords: [30.186487516196777, 31.244083405107293], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "عزبة السعادنة", coords: [30.176049487294062, 31.238986204846018], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "ناي", coords: [30.203854387869864, 31.254540831708272], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "كوم اشفين", coords: [30.17897563776406, 31.253084774269695], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "بلقس", coords: [30.174203558021766, 31.283568687396595], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "بهتيم", coords: [30.13973240742383, 31.27617637327422], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "عزبة امام", coords: [30.175444716474956, 31.243200001105553], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "ميت حلفا", coords: [30.16312202605104, 31.235314757448325], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "ميت نما", coords: [30.146720456733064, 31.22896328651647], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "قلما", coords: [30.217752991033354, 31.206784976443192], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "حلابة", coords: [30.20440185986894, 31.190562976261692], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "الصباح", coords: [30.22821011168187, 31.192794574170264], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "كفر السبيل", coords: [30.21931050499659, 31.18781639422038], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "صنافير", coords: [30.22146131721924, 31.168847812112343], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "شلقان", coords: [30.190158657035266, 31.162067187697847], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "سنديون", coords: [30.249578129255948, 31.206392771463918], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "سندبيس", coords: [30.255097549838293, 31.165684921475286], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "نوي", coords: [30.231937695125545, 31.266769408043643], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "القناطر الخيرية", coords: [30.192966038631834, 31.130788623080768], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "أبو الغيط", coords: [30.156734421752333, 31.185620417868314], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "الحادثة", coords: [30.18158172267044, 31.17176455881484], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "عزبة عبدالله باشا", coords: [30.19188909922236, 31.189666044791903], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "كفر ابو جمعة", coords: [30.206833245437984, 31.21818848262529], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "عرب عراقي", coords: [30.200049166364938, 31.232989709134284], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" },
    { city: "عزبة عرب الحجار", coords: [30.19852891259031, 31.241166848454316], help: "مساعدة حالات مستحقة بشكل شهري او موسمي", details: "" }
];

            
            const markers = [];
            const areaList = document.getElementById('areas');
            
            // إضافة علامات للمناطق مع تحسين البوب أب
            contributions.forEach((loc, index) => {
                const marker = L.marker(loc.coords, { icon: pinIcon })
                    .addTo(map)
                    .bindPopup(`
                        <div id="popup-a" style="min-width:220Px; text-align:center; padding:10px;">
                            <h3 class="popup-title">${loc.city}</h3>
                            <p class="popup-desc" style="margin-bottom:8px;">${loc.help}</p>
                            <p class="popup-desc" style="font-size:12px; color:#666;">${loc.details}</p>
                            <div style="margin-top:10px; height:4px; background:linear-gradient(to right, #0ea9b6, #0a6c79); border-radius:2px;"></div>
                        </div>
                    `);
                
                markers.push(marker);
                
                // إنشاء بطاقة المنطقة مع تحسين التصميم
                const card = document.createElement('div');
                card.className = 'area-card';
                card.innerHTML = `
                    <span>${loc.city}</span> 
                    <i class="fas fa-map-marker-alt"></i>
                `;
                
                card.addEventListener('click', () => {
                    // إزالة النشاط من جميع البطاقات
                    document.querySelectorAll('.area-card').forEach(c => c.classList.remove('active'));
                    
                    // إضافة النشاط للبطاقة المحددة
                    card.classList.add('active');
                    
                    // تكبير الخريطة والتحرك للمنطقة
                    map.setView(loc.coords, 16);
                    
                    // فتح نافذة المعلومات بعد تأخير بسيط
                    setTimeout(() => {
                        marker.openPopup();
                    }, 400);
                });
                
                areaList.appendChild(card);
                
                // إضافة تأثير عند فتح البوب أب
                marker.on('popupopen', () => {
                    document.querySelectorAll('.area-card').forEach(c => c.classList.remove('active'));
                    document.querySelectorAll('.area-card')[index].classList.add('active');
                });
            });
            
            // ضبط حدود الخريطة لمنع التكبير/التصغير خارج المنطقة
            const bounds = L.latLngBounds(
    [22, 25],   // جنوب غرب مصر
    [31.7, 36]  // شمال شرق مصر
);
map.setMaxBounds(bounds);

map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});

        });