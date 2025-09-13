    lucide.createIcons();

    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Help modal
    const helpFab = document.getElementById('helpFab');
    const helpModal = document.getElementById('helpModal');
    const closeModal = document.getElementById('closeModal');
    
    helpFab.addEventListener('click', function() {
        helpModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function() {
        helpModal.style.display = 'none';
    });

    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    const registrantType = document.getElementById('registrantType');
    const caseFields = document.getElementById('caseFields');
    const benefactorFields = document.getElementById('benefactorFields');
    const submitSection = document.getElementById('submitSection');

    const maritalStatus = document.getElementById('maritalStatus');
    const marriedReasonSection = document.getElementById('marriedReasonSection');
    const marriedReasonInput = document.getElementById('marriedReason');
    
    const childCountInput = document.getElementById('childCount');
    const childrenDataSection = document.getElementById('childrenDataSection');
    
    const isPatientSelect = document.getElementById('isPatient');
    const patientInfoSection = document.getElementById('patientInfoSection');

    const beneficiaryMaritalStatus = document.getElementById('beneficiaryMaritalStatus');
    const benefactorMarriedReasonSection = document.getElementById('benefactorMarriedReasonSection');
    const benefactorMarriedReasonInput = document.getElementById('benefactorMarriedReason');

    const form = document.getElementById('caseForm');
    const resetBtn = document.getElementById('resetBtn');

    registrantType.addEventListener('change', (event) => {
        caseFields.classList.add('hidden');
        benefactorFields.classList.add('hidden');
        submitSection.classList.add('hidden');
        
        if (event.target.value === 'case') {
            caseFields.classList.remove('hidden');
            submitSection.classList.remove('hidden');
            setRequiredFields(caseFields, true);
            setRequiredFields(benefactorFields, false);
        } else if (event.target.value === 'benefactor') {
            benefactorFields.classList.remove('hidden');
            submitSection.classList.remove('hidden');
            setRequiredFields(caseFields, false);
            setRequiredFields(benefactorFields, true);
        }
    });
    
    function setRequiredFields(section, isRequired) {
        section.querySelectorAll('input, select, textarea').forEach(el => {
            if (el.id !== 'marriedReason' && el.id !== 'benefactorMarriedReason' && el.id !== 'patientName' && el.id !== 'patientType' && el.id !== 'patientRelation') {
                 el.required = isRequired;
            }
        });
    }

    maritalStatus.addEventListener('change', (event) => {
        if (event.target.value === 'متزوجة') {
            marriedReasonSection.classList.remove('hidden');
            marriedReasonInput.required = true;
        } else {
            marriedReasonSection.classList.add('hidden');
            marriedReasonInput.required = false;
        }
    });

    beneficiaryMaritalStatus.addEventListener('change', (event) => {
        if (event.target.value === 'متزوجة') {
            benefactorMarriedReasonSection.classList.remove('hidden');
            benefactorMarriedReasonInput.required = true;
        } else {
            benefactorMarriedReasonSection.classList.add('hidden');
            benefactorMarriedReasonInput.required = false;
        }
    });

    childCountInput.addEventListener('input', (event) => {
        const count = parseInt(event.target.value, 10);
        childrenDataSection.innerHTML = '';
        if (count > 0 && count <= 10) {
            childrenDataSection.classList.remove('hidden');
            for (let i = 1; i <= count; i++) {
                const childDiv = document.createElement('div');
                childDiv.classList.add('border', 'border-gray-200', 'p-4', 'rounded-lg', 'mb-4', 'fade-in');
                childDiv.innerHTML = `
                    <h4 class="font-bold mb-4 flex items-center gap-2"><i data-lucide="user"></i> بيانات الطفل رقم ${i}</h4>
                    <div class="form-group">
                        <label class="form-label" for="childName${i}"><i data-lucide="signature"></i>اسم الطفل</label>
                        <input type="text" id="childName${i}" name="childName${i}" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="childRelation${i}"><i data-lucide="users"></i>قرابته للحالة</label>
                        <input type="text" id="childRelation${i}" name="childRelation${i}" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="childAge${i}"><i data-lucide="calendar-days"></i>سنه</label>
                        <input type="number" id="childAge${i}" name="childAge${i}" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="childDegree${i}"><i data-lucide="book-open"></i>مؤهله</label>
                        <input type="text" id="childDegree${i}" name="childDegree${i}" class="form-input" required>
                    </div>
                `;
                childrenDataSection.appendChild(childDiv);
                lucide.createIcons();
            }
        } else {
            childrenDataSection.classList.add('hidden');
        }
    });
    
    isPatientSelect.addEventListener('change', (event) => {
        if (event.target.value === 'نعم') {
            patientInfoSection.classList.remove('hidden');
            patientInfoSection.querySelectorAll('input').forEach(input => input.required = true);
        } else {
            patientInfoSection.classList.add('hidden');
            patientInfoSection.querySelectorAll('input').forEach(input => input.required = false);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'جاري الإرسال...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        const registrant = registrantType.value;
        if (registrant === 'case') {
            const childrenData = [];
            for (let i = 1; i <= parseInt(childCountInput.value, 10); i++) {
                childrenData.push({
                    name: document.getElementById(`childName${i}`).value,
                    relation: document.getElementById(`childRelation${i}`).value,
                    age: document.getElementById(`childAge${i}`).value,
                    degree: document.getElementById(`childDegree${i}`).value,
                });
            }
            data.children = childrenData;

            if (isPatientSelect.value === 'نعم') {
                data.patient = {
                    name: document.getElementById('patientName').value,
                    type: document.getElementById('patientType').value,
                    relation: document.getElementById('patientRelation').value,
                };
            }
            data.requests = document.getElementById('caseRequests').value;
        } else if (registrant === 'benefactor') {
            data.requests = document.getElementById('benefactorRequests').value;
        }

        setTimeout(() => {
            console.log('Form Submitted!', data);
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'تم الإرسال بنجاح!',
                text: 'شكراً لك على تسجيل الحالة. سيتم مراجعة البيانات في أقرب وقت.',
                confirmButtonText: 'حسناً',
                confirmButtonColor: '#32A7B4'
            }).then(() => {
                resetForm();
            });
        }, 2000); // Simulate network delay
    });

    resetBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'سيتم مسح جميع البيانات المدخلة في الاستمارة',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32A7B4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، امسح الاستمارة',
            cancelButtonText: 'إلغاء'
        }).then((result) => {
            if (result.isConfirmed) {
                resetForm();
                Swal.fire({
                    title: 'تم المسح!',
                    text: 'تم مسح الاستمارة بنجاح',
                    icon: 'success',
                    confirmButtonColor: '#32A7B4',
                    confirmButtonText: 'حسناً'
                });
            }
        });
    });

    function resetForm() {
        form.reset();
        caseFields.classList.add('hidden');
        benefactorFields.classList.add('hidden');
        submitSection.classList.add('hidden');
        childrenDataSection.innerHTML = '';
        marriedReasonSection.classList.add('hidden');
        benefactorMarriedReasonSection.classList.add('hidden');
        patientInfoSection.classList.add('hidden');
        isPatientSelect.value = '';
        maritalStatus.value = '';
        beneficiaryMaritalStatus.value = '';
    }