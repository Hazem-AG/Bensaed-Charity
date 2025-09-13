// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const form = document.getElementById('jobForm');
const formSections = document.querySelectorAll('.form-section');
const navItems = document.querySelectorAll('.nav-item');
const progressBar = document.getElementById('formProgress');
const loadingScreen = document.getElementById('loadingScreen');
const helpFab = document.getElementById('helpFab');
const helpModal = document.getElementById('helpModal');
const closeModal = document.getElementById('closeModal');
const resetBtn = document.getElementById('resetBtn');
const fileInput = document.getElementById('fileInput');
const dropArea = document.getElementById('dropArea');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const fileRemove = document.getElementById('fileRemove');
const uploadProgress = document.getElementById('uploadProgress');
const progressBarInner = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const uploadSuccess = document.getElementById('uploadSuccess');
const jobSelect = document.getElementById('job');
const otherJobSection = document.getElementById('otherJobSection');
const genderSelect = document.getElementById('gender');
const militarySection = document.getElementById('militarySection');

// Current active section
let currentSection = 0;

// Form data object
let formData = {
  personal: {},
  job: {},
  skills: {},
  conditions: {},
  experience: {},
  attachments: {}
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
      
      // Additional validation for specific fields
      if (input.id === 'phone' && !isValidPhone(input.value)) {
        showError(input, 'يرجى إدخال رقم هاتف صحيح');
        isValid = false;
      }
      
      if (input.id === 'age' && (input.value < 18 || input.value > 65)) {
        showError(input, 'يجب أن يكون العمر بين 18 و 65 سنة');
        isValid = false;
      }
      
      if (input.id === 'grad_year') {
        const currentYear = new Date().getFullYear();
        if (input.value < 2010 || input.value > currentYear) {
          showError(input, `سنة التخرج يجب أن تكون بين 2010 و ${currentYear}`);
          isValid = false;
        }
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
  // Hide all sections
  formSections.forEach(section => {
    section.classList.remove('active');
    section.classList.add('hidden');
  });
  
  // Remove active class from all nav items
  navItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Show selected section
  formSections[index].classList.remove('hidden');
  formSections[index].classList.add('active');
  
  // Update current section
  currentSection = index;
  
  // Update progress bar
  updateProgressBar();
  
  // Scroll to top of form
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

// File upload functionality
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
  dropArea.classList.add('dragover');
}

function unhighlight() {
  dropArea.classList.remove('dragover');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

fileInput.addEventListener('change', function() {
  handleFiles(this.files);
});

function handleFiles(files) {
  if (files.length > 0) {
    const file = files[0];
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      Swal.fire({
        icon: 'error',
        title: 'نوع ملف غير مدعوم',
        text: 'يرجى اختيار ملف PDF فقط',
        confirmButtonText: 'حسناً'
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'حجم الملف كبير جداً',
        text: 'الحد الأقصى لحجم الملف هو 5MB',
        confirmButtonText: 'حسناً'
      });
      return;
    }
    
    // Show upload progress
    uploadProgress.style.display = 'block';
    fileInfo.style.display = 'none';
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Show success message
        uploadProgress.style.display = 'none';
        uploadSuccess.style.display = 'flex';
        
        // Show file info after a delay
        setTimeout(() => {
          uploadSuccess.style.display = 'none';
          fileInfo.style.display = 'flex';
          fileName.textContent = file.name;
          fileSize.textContent = formatFileSize(file.size);
          
          // Save file info to form data
          formData.attachments.cv = {
            name: file.name,
            size: file.size,
            type: file.type
          };
        }, 1500);
      }
      
      // Update progress bar
      progressBarInner.style.width = `${progress}%`;
      progressText.textContent = `جاري الرفع... ${Math.round(progress)}%`;
    }, 200);
  }
}

fileRemove.addEventListener('click', function() {
  fileInfo.style.display = 'none';
  fileInput.value = '';
  delete formData.attachments.cv;
});

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Conditional fields
jobSelect.addEventListener('change', function() {
  if (this.value === 'other') {
    otherJobSection.classList.remove('hidden');
  } else {
    otherJobSection.classList.add('hidden');
  }
});

genderSelect.addEventListener('change', function() {
  if (this.value === 'ذكر') {
    militarySection.classList.remove('hidden');
  } else {
    militarySection.classList.add('hidden');
  }
});

// Form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate all sections
  let isFormValid = true;
  
  for (let i = 0; i < formSections.length; i++) {
    navigateToSection(i);
    if (!validateCurrentSection()) {
      isFormValid = false;
      break;
    }
    
    // Save section data
    saveSectionData(i);
  }
  
  // Validate privacy agreement
  const privacyCheckbox = document.getElementById('privacy');
  if (!privacyCheckbox.checked) {
    document.getElementById('privacy-error').style.display = 'block';
    isFormValid = false;
    // Scroll to privacy section
    document.getElementById('privacy').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    document.getElementById('privacy-error').style.display = 'none';
  }
  
  if (isFormValid) {
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send the formData to your server here
      console.log('Form data:', formData);
      
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'تم إرسال الطلب بنجاح!',
        text: 'شكراً لك على تقديم طلب الانضمام إلى فريقنا. سنقوم بمراجعة طلبك والاتصال بك في أقرب وقت ممكن.',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#32A7B4'
      }).then(() => {
        // Reset form
        form.reset();
        fileInfo.style.display = 'none';
        otherJobSection.classList.add('hidden');
        militarySection.classList.add('hidden');
        navigateToSection(0);
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        lucide.createIcons();
      });
    }, 2000);
  } else {
    // Scroll to first error
    const firstError = document.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
      fileInfo.style.display = 'none';
      otherJobSection.classList.add('hidden');
      militarySection.classList.add('hidden');
      formData = {
        personal: {},
        job: {},
        skills: {},
        conditions: {},
        experience: {},
        attachments: {}
      };
      
      // Reset all error messages
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

// Input validation on blur
document.querySelectorAll('input, select, textarea').forEach(input => {
  input.addEventListener('blur', function() {
    if (this.hasAttribute('required') && !this.value.trim()) {
      showError(this, 'هذا الحقل مطلوب');
    } else {
      hideError(this);
      
      // Additional validation
      if (this.id === 'phone' && this.value && !isValidPhone(this.value)) {
        showError(this, 'يرجى إدخال رقم هاتف صحيح');
      }
      
      if (this.id === 'age' && this.value && (this.value < 18 || this.value > 65)) {
        showError(this, 'يجب أن يكون العمر بين 18 و 65 سنة');
      }
      
      if (this.id === 'grad_year' && this.value) {
        const currentYear = new Date().getFullYear();
        if (this.value < 2010 || this.value > currentYear) {
          showError(this, `سنة التخرج يجب أن تكون بين 2010 و ${currentYear}`);
        }
      }
    }
  });
});

// Enhance form inputs with auto-formatting
document.getElementById('phone').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.startsWith('0')) {
    value = value.substring(1);
  }
  if (value.length > 0) {
    value = '0' + value;
  }
  e.target.value = value;
});

// Add animation to form elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated', 'animate__fadeInUp');
    }
  });
}, observerOptions);

document.querySelectorAll('.form-group, .section-header, .file-upload-area').forEach(el => {
  observer.observe(el);
});