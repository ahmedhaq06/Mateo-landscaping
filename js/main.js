/**
 * MATEO LANDSCAPING LLC - INTERACTIVE & 3D ANIMATION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================================================
  // 1. STICKY NAVBAR & MOBILE MENU
  // ===================================================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#FFFFFF';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(184, 134, 11, 0.2)';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }
    });
  }

  // ===================================================================
  // 2. 3D TILT HOVER EFFECT ON PORTFOLIO GALLERY CARDS
  // ===================================================================
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse x position inside card
      const y = e.clientY - rect.top;  // Mouse y position inside card
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt degrees (Max 12 degrees)
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ===================================================================
  // 3. INTERACTIVE BEFORE / AFTER SLIDER DRAG LOGIC
  // ===================================================================
  const baContainer = document.querySelector('.ba-slider-container');
  const baBeforeImg = document.querySelector('.ba-image-before');
  const baBeforeInnerImg = document.querySelector('.ba-image-before img');
  const baHandle = document.querySelector('.ba-handle');

  if (baContainer && baBeforeImg && baHandle) {
    let isDragging = false;

    // Set inner image width equal to container width for aligned overlay
    const syncImageWidth = () => {
      if (baBeforeInnerImg) {
        baBeforeInnerImg.style.width = `${baContainer.offsetWidth}px`;
      }
    };
    syncImageWidth();
    window.addEventListener('resize', syncImageWidth);

    const updateSlider = (clientX) => {
      const rect = baContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      
      // Clamp between 0 and container width
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      baBeforeImg.style.width = `${percentage}%`;
      baHandle.style.left = `${percentage}%`;
    };

    // Mouse events
    baContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events for mobile
    baContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // ===================================================================
  // 4. 3D MATERIAL SHOWCASE PERSPECTIVE CARD FLIPPER
  // ===================================================================
  const materialData = {
    travertine: {
      title: "Ivory Travertine Pavers",
      desc: "Architectural natural travertine stone selected for superior heat dissipation. Remains comfortable to walk on barefoot even in 115°F Arizona summer heat.",
      img: "images/gallery-1.jpg",
      heat: "115°F Stay-Cool",
      durability: "50+ Years",
      maintenance: "Low / Sealed",
      ideal: "Pool Decks & Patios"
    },
    turf: {
      title: "Heat-Shield Synthetic Turf",
      desc: "Commercial-grade artificial turf with cooling infill and UV protection. Gives your yard a lush, green luxury golf-course look with zero watering or mowing.",
      img: "images/gallery-2.jpg",
      heat: "Cool-Play Infill",
      durability: "20+ Years",
      maintenance: "Zero Watering",
      ideal: "Pet & Play Yards"
    },
    coping: {
      title: "Non-Slip Pool Coping Tile",
      desc: "Bullnose travertine coping tile custom carved for swimming pool perimeters. Non-porous texture ensures non-slip safety for family and guests.",
      img: "images/gallery-2.jpg",
      heat: "Non-Slip Surface",
      durability: "Lifetime",
      maintenance: "Chemical Resistant",
      ideal: "Pool Perimeters"
    },
    bbq: {
      title: "Stacked Sonoran Stone BBQ",
      desc: "Hand-stacked stone masonry barbecue islands built with firebrick interiors and stainless steel grill inserts for high-end outdoor entertaining.",
      img: "images/gallery-1.jpg",
      heat: "Firebrick Core",
      durability: "Lifetime",
      maintenance: "Easy Clean",
      ideal: "Outdoor Kitchens"
    }
  };

  const matTabs = document.querySelectorAll('.mat-tab');
  const matCard = document.querySelector('.mat-3d-card');

  if (matTabs && matCard) {
    matTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-mat');
        const data = materialData[key];

        if (!data) return;

        // Active tab styling
        matTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Trigger 3D flip animation
        matCard.classList.add('flipping');

        setTimeout(() => {
          // Update card contents while hidden
          matCard.querySelector('h3').textContent = data.title;
          matCard.querySelector('p').textContent = data.desc;
          matCard.querySelector('img').src = data.img;
          matCard.querySelector('img').alt = data.title;
          
          const specVals = matCard.querySelectorAll('.spec-val');
          if (specVals.length >= 4) {
            specVals[0].textContent = data.heat;
            specVals[1].textContent = data.durability;
            specVals[2].textContent = data.maintenance;
            specVals[3].textContent = data.ideal;
          }

          // Unflip card
          matCard.classList.remove('flipping');
        }, 400);
      });
    });
  }

  // ===================================================================
  // 5. MULTI-STEP LEAD FORM SLIDER WIZARD
  // ===================================================================
  let currentStep = 1;
  const totalSteps = 4;

  const stepPanels = document.querySelectorAll('.form-step-panel');
  const stepNodes = document.querySelectorAll('.step-node');
  const progressBar = document.querySelector('.wizard-progress-bar');
  const btnWizardBack = document.querySelector('.btn-wizard-back');
  const btnWizardNext = document.querySelector('.btn-wizard-next');
  const btnWizardSubmit = document.querySelector('.btn-wizard-submit');
  const leadForm = document.getElementById('outdoorLeadForm');
  const toast = document.getElementById('toastMsg');

  const updateWizardStep = (step) => {
    currentStep = step;

    // Show panel
    stepPanels.forEach((panel, idx) => {
      panel.classList.toggle('active', idx + 1 === step);
    });

    // Update Nodes
    stepNodes.forEach((node, idx) => {
      const stepNum = idx + 1;
      node.classList.remove('active', 'completed');
      if (stepNum < step) {
        node.classList.add('completed');
        node.innerHTML = '✓';
      } else if (stepNum === step) {
        node.classList.add('active');
        node.innerHTML = stepNum;
      } else {
        node.innerHTML = stepNum;
      }
    });

    // Progress bar width (25%, 50%, 75%, 100%)
    if (progressBar) {
      progressBar.style.width = `${(step / totalSteps) * 100}%`;
    }

    // Button visibility
    if (btnWizardBack) {
      btnWizardBack.style.visibility = step === 1 ? 'hidden' : 'visible';
    }

    if (btnWizardNext && btnWizardSubmit) {
      if (step === totalSteps) {
        btnWizardNext.style.display = 'none';
        btnWizardSubmit.style.display = 'inline-flex';
      } else {
        btnWizardNext.style.display = 'inline-flex';
        btnWizardSubmit.style.display = 'none';
      }
    }
  };

  // Validate step inputs
  const validateStep = (step) => {
    const activePanel = document.querySelector(`.form-step-panel[data-step="${step}"]`);
    if (!activePanel) return true;

    const requiredInputs = activePanel.querySelectorAll('[required]');
    let valid = true;

    requiredInputs.forEach(input => {
      if (input.type === 'radio') {
        const group = activePanel.querySelectorAll(`input[name="${input.name}"]`);
        const checked = Array.from(group).some(r => r.checked);
        if (!checked) valid = false;
      } else {
        if (!input.value.trim()) valid = false;
      }
    });

    if (!valid) {
      alert('Please fill out the required fields before proceeding to the next step.');
    }

    return valid;
  };

  if (btnWizardNext) {
    btnWizardNext.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          updateWizardStep(currentStep + 1);
        }
      }
    });
  }

  if (btnWizardBack) {
    btnWizardBack.addEventListener('click', () => {
      if (currentStep > 1) {
        updateWizardStep(currentStep - 1);
      }
    });
  }

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateStep(currentStep)) return;

      const submitBtn = btnWizardSubmit;
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending to Mateo...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!';
        
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 5000);
        }

        setTimeout(() => {
          leadForm.reset();
          updateWizardStep(1);
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);

      }, 1400);
    });
  }

  // ===================================================================
  // 6. FAQ ACCORDION HANDLER
  // ===================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
});
