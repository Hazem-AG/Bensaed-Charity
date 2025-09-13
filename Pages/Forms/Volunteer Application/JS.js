// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const form = document.getElementById('jobForm');
const formSections = document.querySelectorAll('.form-section');
const progressBar = document.getElementById('formProgress');
const loadingScreen = document.getElementById('loadingScreen');
const helpFab = document.getElementById('helpFab');
const helpModal = document.getElementById('helpModal');
const closeModal = document.getElementById('closeModal');
const resetBtn = document.getElementById('resetBtn');

// Current active section
let currentSection = 0;

// Form data object
let formData = {
  personal: {},
  skills: {}
};

// Show loading screen initially
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
});

// Next/Previous buttons
document.querySelectorAll('.btn-next').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const nextSection = e.target.closest('.btn-next').dataset.next;
    if (validateCurrentSection()) {
      navigateToSectionByName(nextSection);
    }
  });
});

document.querySelectorAll('.btn-prev').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const prevSection = e.target.closest('.btn-prev').dataset.prev;
    navigateToSectionByName(prevSection);
  });
});

// Form validation
function validateCurrentSection() {
  const currentSectionElement = formSections[currentSection];
  const inputs = currentSectionElement.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      showError(input, 'هذا الحقل مطلوب');
      isValid = false;
    } else {
      hideError(input);

      if (input.id === 'phone' && !isValidPhone(input.value)) {
        showError(input, 'يرجى إدخال رقم هاتف صحيح');
        isValid = false;
      }

      if (input.id === 'age' && (input.value < 18 || input.value > 65)) {
        showError(input, 'يجب أن يكون العمر بين 18 و 65 سنة');
        isValid = false;
      }
    }
  });

  return isValid;
}

function showError(input, message) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  input.classList.add('error');
}

function hideError(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
  input.classList.remove('error');
}

function isValidPhone(phone) {
  const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
  return phoneRegex.test(phone);
}

// Navigation functions
function navigateToSection(index) {
  formSections.forEach(section => {
    section.classList.remove('active');
    section.classList.add('hidden');
  });

  formSections[index].classList.remove('hidden');
  formSections[index].classList.add('active');

  currentSection = index;
  updateProgressBar();

  formSections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function navigateToSectionByName(sectionName) {
  const sectionIndex = Array.from(formSections).findIndex(section => section.id === sectionName);
  if (sectionIndex !== -1) {
    navigateToSection(sectionIndex);
  }
}

function updateProgressBar() {
  const progress = ((currentSection + 1) / formSections.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  let isFormValid = true;

  for (let i = 0; i < formSections.length; i++) {
    navigateToSection(i);
    if (!validateCurrentSection()) {
      isFormValid = false;
      break;
    }
    saveSectionData(i);
  }

  if (isFormValid) {
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;

    setTimeout(() => {
      console.log('Form data:', formData);

      Swal.fire({
        icon: 'success',
        title: 'تم إرسال الطلب بنجاح!',
        text: 'شكراً لك على تقديم طلب الانضمام إلى فريقنا. سنقوم بمراجعة طلبك والاتصال بك في أقرب وقت ممكن.',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#32A7B4'
      }).then(() => {
        form.reset();
        navigateToSection(0);

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        lucide.createIcons();
      });
    }, 2000);
  }
});

function saveSectionData(sectionIndex) {
  const section = formSections[sectionIndex];
  const inputs = section.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    if (input.name) {
      const sectionName = formSections[sectionIndex].id.replace('Section', '');
      if (!formData[sectionName]) formData[sectionName] = {};
      formData[sectionName][input.name] = input.value;
    }
  });
}

// Form reset
resetBtn.addEventListener('click', function() {
  Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'سيتم مسح جميع البيانات المدخلة في النموذج',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#32A7B4',
    cancelButtonColor: '#d33',
    confirmButtonText: 'نعم، مسح النموذج',
    cancelButtonText: 'إلغاء'
  }).then((result) => {
    if (result.isConfirmed) {
      form.reset();
      formData = { personal: {}, skills: {} };

      document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
      });

      document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
      });

      navigateToSection(0);

      Swal.fire({
        title: 'تم المسح!',
        text: 'تم مسح النموذج بنجاح',
        icon: 'success',
        confirmButtonColor: '#32A7B4',
        confirmButtonText: 'حسناً'
      });
    }
  });
});

// Help modal functionality
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
