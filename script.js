/**
 * CareIntel AI - Interactive Enterprise Healthcare Operations Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initCounters();
  initTimelineProgress();
  initCommandCenterChart();
  initMobileNav();
});

/* 1. Navbar Scroll Effect */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Number Counter Animation with Intersection Observer */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 50; // smooth speed

        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 25);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* 3. Timeline Progress Line on Scroll */
function initTimelineProgress() {
  const timelineSection = document.getElementById('how-it-works');
  const progressFill = document.getElementById('timelineProgress');

  if (!timelineSection || !progressFill) return;

  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const percentage = Math.min(Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0), 1);
      progressFill.style.width = `${percentage * 100}%`;
    }
  });
}

/* 4. Canvas Chart Rendering for Command Center */
function initCommandCenterChart() {
  const canvas = document.getElementById('patientFlowChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Handle DPI scaling for crisp display
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 240 * dpr;
  ctx.scale(dpr, dpr);

  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const values = [35, 82, 128, 95, 110, 74, 42];

  const padding = 40;
  const chartWidth = rect.width - padding * 2;
  const chartHeight = 180;
  const stepX = chartWidth / (hours.length - 1);
  const maxVal = 140;

  // Draw smooth curve
  ctx.beginPath();
  values.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = chartHeight - (val / maxVal) * chartHeight + 20;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      const prevX = padding + (i - 1) * stepX;
      const prevY = chartHeight - (values[i - 1] / maxVal) * chartHeight + 20;
      const cpX1 = prevX + stepX / 2;
      const cpY1 = prevY;
      const cpX2 = prevX + stepX / 2;
      const cpY2 = y;
      ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y);
    }
  });

  // Gradient stroke
  const strokeGrad = ctx.createLinearGradient(0, 0, rect.width, 0);
  strokeGrad.addColorStop(0, '#0F62FE');
  strokeGrad.addColorStop(1, '#06B6D4');
  ctx.strokeStyle = strokeGrad;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Area fill gradient
  ctx.lineTo(padding + (hours.length - 1) * stepX, chartHeight + 20);
  ctx.lineTo(padding, chartHeight + 20);
  ctx.closePath();

  const fillGrad = ctx.createLinearGradient(0, 0, 0, chartHeight);
  fillGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  fillGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Draw Data Points
  values.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = chartHeight - (val / maxVal) * chartHeight + 20;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#06B6D4';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0B132B';
    ctx.stroke();
  });
}

/* 5. Doctor Experience Tab Switching */
function switchDoctorTab(tabName, element) {
  const navItems = document.querySelectorAll('.doc-nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  element.classList.add('active');

  const mainPanel = document.getElementById('docMainPanel');
  
  let contentHtml = '';

  switch (tabName) {
    case 'overview':
      contentHtml = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
          <div>
            <h3 style="font-size: 1.3rem; color: var(--navy-900);">Patient: Arjun Kumar</h3>
            <p style="font-size: 0.85rem;">Chief Complaint: Mild chest discomfort & post-exertional fatigue (3 days)</p>
          </div>
          <span class="status-badge in-progress" style="padding: 6px 14px; font-size: 0.85rem;">Active Consultation</span>
        </div>
        <div class="ai-summary-glow-card">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
            <i data-lucide="sparkles" style="color: var(--blue-600);"></i>
            <strong style="color: var(--navy-900); font-size: 0.95rem;">CareIntel AI Synthesis:</strong>
          </div>
          <p style="font-size: 0.9rem; color: var(--navy-800); line-height: 1.6;">
            • <strong>Key Insights:</strong> Patient has a history of mild hypertension. Recent lipid panel (uploaded Sep 11) shows LDL: 142 mg/dL, HDL: 44 mg/dL.<br>
            • <strong>Allergies:</strong> Penicillin (Moderate skin rash).<br>
            • <strong>AI Recommendation:</strong> Baseline ECG suggested; review BP medication dosage and order fasting blood glucose.
          </p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="background: var(--bg-main); padding: 16px; border-radius: var(--radius-sm);">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Vitals (Recorded 10:15 AM)</div>
            <div style="font-size: 1.1rem; font-weight: 700; margin-top: 6px;">BP: 132/84 mmHg | HR: 76 bpm | SpO2: 98%</div>
          </div>
          <div style="background: var(--bg-main); padding: 16px; border-radius: var(--radius-sm);">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Consultation Draft</div>
            <div style="font-size: 0.875rem; color: var(--navy-800); margin-top: 6px;">Autofilled by AI Voice Note assistant. Ready for doctor sign-off.</div>
          </div>
        </div>
      `;
      break;

    case 'history':
      contentHtml = `
        <h3 style="font-size: 1.2rem; color: var(--navy-900); margin-bottom: 12px;">Past Medical History & Surgeries</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm);">
            <strong>2024:</strong> Mild Essential Hypertension (Prescribed Telmisartan 40mg)
          </div>
          <div style="padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm);">
            <strong>2021:</strong> Appendectomy (Laparoscopic, City General Hospital)
          </div>
        </div>
      `;
      break;

    case 'reports':
      contentHtml = `
        <h3 style="font-size: 1.2rem; color: var(--navy-900); margin-bottom: 12px;">Uploaded Lab Reports & Scans</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm);">
            <div>
              <strong>Comprehensive Lipid Panel (PDF)</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Uploaded Sep 11, 2026 • AI OCR Extraction Complete</div>
            </div>
            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.75rem;" onclick="openDemoModal('report-view')">View AI Extraction</button>
          </div>
        </div>
      `;
      break;

    case 'summary':
      contentHtml = `
        <h3 style="font-size: 1.2rem; color: var(--navy-900); margin-bottom: 12px;">Deep AI Clinical Intelligence</h3>
        <div class="ai-summary-glow-card">
          <p style="line-height: 1.7; font-size: 0.925rem;">
            <strong>Primary Symptom Cluster:</strong> Post-exertional chest heaviness without radiation to arm or neck. No shortness of breath.<br>
            <strong>Risk Factors:</strong> Elevated LDL (142 mg/dL), sedentary desk job, family history of CAD.<br>
            <strong>Suggested Diagnostic Plan:</strong> Treadmill Stress Test (TMT), 2D Echocardiogram, HbA1c screening.
          </p>
        </div>
      `;
      break;

    case 'prescription':
      contentHtml = `
        <h3 style="font-size: 1.2rem; color: var(--navy-900); margin-bottom: 12px;">E-Prescription & Pharmacy Dispatch</h3>
        <div style="background: var(--bg-main); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 16px;">
          <div style="font-weight: 700; margin-bottom: 8px;">Recommended Rx Draft (AI Assist):</div>
          <ol style="margin-left: 20px; font-size: 0.9rem;">
            <li>Telmisartan 40mg — 1 Tablet Daily (Morning)</li>
            <li>Atorvastatin 10mg — 1 Tablet Daily (Night)</li>
            <li>Sublingual Nitroglycerin (PRN for acute chest discomfort)</li>
          </ol>
        </div>
        <button class="btn btn-primary" onclick="showToast('E-Prescription sent to hospital pharmacy & patient phone!')">Authorize & Sign Prescription</button>
      `;
      break;
  }

  mainPanel.innerHTML = contentHtml;
  if (window.lucide) lucide.createIcons();
}

/* 6. Mobile Menu Toggle */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#FFFFFF';
      navLinks.style.padding = '20px';
      navLinks.style.boxShadow = 'var(--shadow-lg)';
    });
  }
}

/* 7. Interactive Modal Dialog */
function openDemoModal(type) {
  const modal = document.getElementById('demoModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  switch (type) {
    case 'get-started':
      title.innerText = 'Welcome to CareIntel AI';
      body.innerHTML = `
        <p style="margin-bottom: 16px;">Select your role to launch the interactive demonstration portal:</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <button class="btn btn-primary" onclick="closeDemoModal(); showToast('Redirecting to Patient Portal Demonstration...');">
            <i data-lucide="user"></i> Patient Experience Portal
          </button>
          <button class="btn btn-secondary" onclick="closeDemoModal(); showToast('Redirecting to Doctor Clinical Workstation...');">
            <i data-lucide="stethoscope"></i> Doctor Clinical Suite
          </button>
          <button class="btn btn-secondary" onclick="closeDemoModal(); showToast('Redirecting to Hospital Admin Command Center...');">
            <i data-lucide="building-2"></i> Hospital Administrator Command
          </button>
        </div>
      `;
      break;

    case 'report-view':
      title.innerText = 'AI Document Parsing Summary';
      body.innerHTML = `
        <div style="background: var(--bg-main); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
          <div style="font-weight: 700; color: var(--navy-900); margin-bottom: 8px;">Document: Lipid_Profile_Report_Kumar.pdf</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Parsed in 1.2s using CareIntel Medical Vision Engine</div>
          
          <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid var(--border-light); text-align: left;">
              <th style="padding: 6px;">Biomarker</th>
              <th style="padding: 6px;">Result</th>
              <th style="padding: 6px;">Reference</th>
              <th style="padding: 6px;">Status</th>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-light);">
              <td style="padding: 6px;">Total Cholesterol</td>
              <td style="padding: 6px; font-weight: 700;">215 mg/dL</td>
              <td style="padding: 6px;">&lt; 200 mg/dL</td>
              <td style="padding: 6px; color: var(--warning); font-weight: 700;">Elevated</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-light);">
              <td style="padding: 6px;">LDL (Bad Cholesterol)</td>
              <td style="padding: 6px; font-weight: 700;">142 mg/dL</td>
              <td style="padding: 6px;">&lt; 100 mg/dL</td>
              <td style="padding: 6px; color: var(--danger); font-weight: 700;">High</td>
            </tr>
            <tr>
              <td style="padding: 6px;">HDL (Good Cholesterol)</td>
              <td style="padding: 6px; font-weight: 700;">44 mg/dL</td>
              <td style="padding: 6px;">&gt; 40 mg/dL</td>
              <td style="padding: 6px; color: var(--success); font-weight: 700;">Normal</td>
            </tr>
          </table>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="closeDemoModal()">Close Summary</button>
      `;
      break;

    case 'patient-experience':
      title.innerText = 'Generate Live Patient Token';
      body.innerHTML = `
        <p style="margin-bottom: 14px;">Simulate check-in to generate an instant digital queue token:</p>
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px;">Department</label>
          <select id="simDept" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-light);">
            <option>Cardiology OPD</option>
            <option>General Medicine</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
          </select>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="generateTokenSim()">Generate Digital Token</button>
      `;
      break;

    default:
      title.innerText = 'CareIntel AI Enterprise Platform';
      body.innerHTML = `
        <p style="margin-bottom: 16px;">Thank you for exploring CareIntel AI. Our enterprise platform provides end-to-end hospital automation and ambient clinical intelligence.</p>
        <button class="btn btn-primary" style="width: 100%;" onclick="closeDemoModal()">Return to Overview</button>
      `;
      break;
  }

  modal.classList.add('active');
  if (window.lucide) lucide.createIcons();
}

function closeDemoModal() {
  const modal = document.getElementById('demoModal');
  modal.classList.remove('active');
}

function generateTokenSim() {
  const dept = document.getElementById('simDept').value;
  const tokenNum = Math.floor(100 + Math.random() * 900);
  closeDemoModal();
  showToast(`Token #${tokenNum} Generated for ${dept}! Live SMS alert sent.`);
}

/* 8. Toast Notifications */
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.background = 'var(--navy-900)';
  toast.style.color = '#FFFFFF';
  toast.style.padding = '14px 22px';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
  toast.style.zIndex = '3000';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '600';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  toast.style.border = '1px solid rgba(6, 182, 212, 0.3)';
  toast.innerHTML = `<i data-lucide="sparkles" style="color: var(--cyan-400); width: 18px;"></i> ${message}`;
  
  document.body.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* 9. Interactive User Photo Upload Handlers */
function triggerPhotoUpload(inputId) {
  const input = document.getElementById(inputId);
  if (input) input.click();
}

function handlePhotoUpload(event, previewId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const previewContainer = document.getElementById(previewId);
    if (previewContainer) {
      previewContainer.innerHTML = `<img src="${e.target.result}" alt="Uploaded Photo">`;
      previewContainer.style.borderStyle = 'solid';
      showToast('Photo uploaded successfully!');
    }
  };
  reader.readAsDataURL(file);
}

