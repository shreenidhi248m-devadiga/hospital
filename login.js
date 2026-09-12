/**
 * CareIntel AI - Enterprise Authentication & Role-Based Access Control (RBAC) Logic
 */

let selectedRole = 'patient';

const roleData = {
  patient: {
    headline: 'Access your healthcare journey.',
    features: ['Appointments', 'Digital Queue', 'Medical Records', 'Follow-ups'],
    isPersonnelOnly: false
  },
  doctor: {
    headline: 'Your clinical workspace.',
    features: ['Patient Overview', 'AI-Assisted Summaries', 'Consultations', 'Follow-ups'],
    isPersonnelOnly: true
  },
  staff: {
    headline: 'Manage hospital operations efficiently.',
    features: ['Appointments', 'Queue Management', 'Patient Requests', 'Notifications'],
    isPersonnelOnly: true
  },
  admin: {
    headline: 'Control your hospital operations.',
    features: ['Users', 'Doctors', 'Departments', 'Analytics'],
    isPersonnelOnly: true
  }
};

/* 1. Role Selection Switcher */
function selectRole(role, element) {
  selectedRole = role;

  // Highlight selected role card
  document.querySelectorAll('.role-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');

  // Update Dynamic Banner Context
  const data = roleData[role];
  const headlineEl = document.getElementById('roleHeadline');
  const featuresEl = document.getElementById('roleFeatures');
  const warningEl = document.getElementById('personnelWarning');

  if (headlineEl) headlineEl.innerText = data.headline;
  if (featuresEl) {
    featuresEl.innerHTML = data.features.map(f => `<span class="role-feature-pill">${f}</span>`).join('');
  }

  if (warningEl) {
    warningEl.style.display = data.isPersonnelOnly ? 'block' : 'none';
  }
}

/* 2. Password Visibility Toggle */
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('passwordInput');
  const toggleBtn = document.getElementById('togglePasswordBtn');

  if (!passwordInput || !toggleBtn) return;

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.innerHTML = '<i data-lucide="eye-off" style="width: 18px;"></i>';
  } else {
    passwordInput.type = 'password';
    toggleBtn.innerHTML = '<i data-lucide="eye" style="width: 18px;"></i>';
  }
  if (window.lucide) lucide.createIcons();
}

/* 3. Form Validation & Login Submission */
function handleLoginSubmit(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const globalError = document.getElementById('globalErrorAlert');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');

  // Reset errors
  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');
  emailError.classList.remove('active');
  passwordError.classList.remove('active');
  globalError.style.display = 'none';

  let isValid = true;

  // Validate Email / User ID
  const emailVal = emailInput.value.trim();
  if (!emailVal) {
    emailInput.classList.add('is-invalid');
    emailError.innerText = 'Please enter your email or user ID.';
    emailError.classList.add('active');
    isValid = false;
  } else if (emailVal.includes('@') && !validateEmailFormat(emailVal)) {
    emailInput.classList.add('is-invalid');
    emailError.innerText = 'Enter a valid email address.';
    emailError.classList.add('active');
    isValid = false;
  }

  // Validate Password
  const passVal = passwordInput.value.trim();
  if (!passVal) {
    passwordInput.classList.add('is-invalid');
    passwordError.innerText = 'Please enter your password.';
    passwordError.classList.add('active');
    isValid = false;
  }

  if (!isValid) return;

  // Test error trigger (if user inputs "error")
  if (emailVal === 'error') {
    globalError.style.display = 'block';
    return;
  }

  // Loading State
  submitBtn.disabled = true;
  btnText.innerHTML = '<span class="spinner"></span> Signing in...';

  // Simulate RBAC Authentication Delay
  setTimeout(() => {
    btnText.innerHTML = '✓ Authentication successful';
    submitBtn.style.background = 'var(--success)';

    // Transition to corresponding role-based workspace section on landing page
    setTimeout(() => {
      let targetHash = '#hero';
      switch (selectedRole) {
        case 'patient':
          targetHash = '#patient-experience';
          break;
        case 'doctor':
          targetHash = '#doctor-experience';
          break;
        case 'staff':
        case 'admin':
          targetHash = '#command-center';
          break;
      }
      window.location.href = `index.html${targetHash}`;
    }, 800);
  }, 1200);
}

function validateEmailFormat(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* 4. Social & Helper Event Handlers */
function handleSocialLogin(provider) {
  alert(`Connecting to ${provider} OAuth Enterprise Single Sign-On...`);
}

function handleForgotPassword(event) {
  event.preventDefault();
  alert('Password reset link sent to your registered email address or hospital administrator.');
}

function handleSignUp(event) {
  event.preventDefault();
  if (selectedRole === 'patient') {
    alert('Redirecting to Patient Self-Registration Portal...');
  } else {
    alert('Hospital Personnel accounts must be provisioned by your IT Security Administrator.');
  }
}
