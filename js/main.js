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
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active', isActive);

      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isActive ? 'fas fa-xmark' : 'fas fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking any nav link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
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
  const totalSteps = 3;

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

  // ===================================================================
  // 7. SERVICE MATRIX INTERACTIVE SHOWCASE & CATEGORY FILTER HANDLER
  // ===================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const matrixItems = document.querySelectorAll('.matrix-item');
  const matrixDisplay = document.getElementById('matrixDisplay');
  const matrixIndexTag = document.getElementById('matrixIndexTag');
  const matrixTitle = document.getElementById('matrixTitle');
  const matrixDesc = document.getElementById('matrixDesc');
  const matrixBadges = document.getElementById('matrixBadges');
  const matrixTimeline = document.getElementById('matrixTimeline');
  const matrixWarranty = document.getElementById('matrixWarranty');
  const matrixBars = document.getElementById('matrixBars');

  if (matrixItems.length && matrixDisplay) {
    function activateMatrixItem(item) {
      matrixItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      const bg = item.getAttribute('data-bg');
      const index = item.getAttribute('data-index');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const badge1 = item.getAttribute('data-badge1');
      const badge2 = item.getAttribute('data-badge2');
      const timeline = item.getAttribute('data-timeline');
      const warranty = item.getAttribute('data-warranty');
      const barsCount = parseInt(item.getAttribute('data-bars')) || 5;

      if (bg) matrixDisplay.style.backgroundImage = `url('${bg}')`;
      if (index && matrixIndexTag) matrixIndexTag.textContent = index;
      if (title && matrixTitle) matrixTitle.textContent = title;
      if (desc && matrixDesc) matrixDesc.textContent = desc;
      if (timeline && matrixTimeline) matrixTimeline.textContent = timeline;
      if (warranty && matrixWarranty) matrixWarranty.textContent = warranty;

      if (badge1 && badge2 && matrixBadges) {
        matrixBadges.innerHTML = `
          <span class="matrix-badge">${badge1}</span>
          <span class="matrix-badge">${badge2}</span>
        `;
      }

      if (matrixBars) {
        let barsHtml = '';
        for (let i = 0; i < 5; i++) {
          barsHtml += `<div class="matrix-bar ${i < barsCount ? '' : 'empty'}"></div>`;
        }
        matrixBars.innerHTML = barsHtml;
      }
    }

    matrixItems.forEach(item => {
      item.addEventListener('mouseenter', () => activateMatrixItem(item));
      item.addEventListener('click', () => activateMatrixItem(item));
    });

    if (filterBtns.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-filter');

          // Update active button state
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          let firstVisibleItem = null;

          // Filter matrix items
          matrixItems.forEach(item => {
            const categories = item.getAttribute('data-category') || '';
            if (filter === 'all' || categories.includes(filter)) {
              item.classList.remove('hidden');
              if (!firstVisibleItem) firstVisibleItem = item;
            } else {
              item.classList.add('hidden');
            }
          });

          // Automatically activate first visible item in matrix showcase
          if (firstVisibleItem) {
            activateMatrixItem(firstVisibleItem);
          }
        });
      });
    }
  }

  // ===================================================================
  // 8. SMART SMOOTH PAGE NAVIGATION & ANCHOR SCROLL HANDLER
  // ===================================================================
  const internalLinks = document.querySelectorAll('a[href]');

  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ignore external links, mailto, tel, javascript, or target=_blank
      if (!href || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || link.getAttribute('target') === '_blank') {
        return;
      }

      // Check current page filename
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';

      // Case 1: Pure hash link on current page (e.g. #work, #services)
      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Case 2: Link with page and hash (e.g. index.html#work)
      if (href.includes('#')) {
        const parts = href.split('#');
        const targetPage = parts[0];
        const targetHash = parts[1];

        // If target page is the current page, scroll smoothly to target element
        if (targetPage === currentPath || (targetPage === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
          const targetEl = document.getElementById(targetHash);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
      }

      // Case 3: Navigation to a different page (e.g., financing.html, reviews.html)
      e.preventDefault();
      document.body.classList.add('page-exiting');

      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });

  // ===================================================================
  // 9. BACK TO TOP BUTTON HANDLER
  // ===================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===================================================================
  // ANIMATION 1: SCROLL-TRIGGERED SECTION REVEAL CASCADE
  // Watches all .reveal, .reveal-left, .reveal-scale elements and adds
  // .is-visible when they enter the viewport (once).
  // ===================================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  // ===================================================================
  // ANIMATION 2: ANIMATED COUNTER NUMBERS
  // Finds elements with data-count and data-suffix, counts up on reveal.
  // ===================================================================
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400; // ms
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });

  // ===================================================================
  // ANIMATION 3: PARALLAX HERO BACKGROUND
  // Shifts hero background-position-y at 40% scroll speed for depth.
  // Uses passive listener so it never blocks scrolling.
  // ===================================================================
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    let heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY <= heroHeight + 200) {
        heroSection.style.backgroundPositionY = `calc(50% + ${scrollY * 0.4}px)`;
      }
    }, { passive: true });

    // Recalculate on resize
    window.addEventListener('resize', () => {
      heroHeight = heroSection.offsetHeight;
    }, { passive: true });
  }

  // ===================================================================
  // ANIMATION 4: SERVICES SECTION STAGGERED ENTRANCE
  // When the services section enters view, stagger the filter tabs and
  // matrix sidebar items in one by one with 80ms delay per item.
  // ===================================================================
  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    const filterBtns = servicesSection.querySelectorAll('.filter-btn');
    const matrixItems = servicesSection.querySelectorAll('.matrix-item');

    // Set initial hidden state (JS-managed so it only applies when observer fires)
    filterBtns.forEach(btn => {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(-18px)';
      btn.style.transition = 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
    matrixItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-28px)';
      item.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    });

    let servicesAnimated = false;
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !servicesAnimated) {
          servicesAnimated = true;
          servicesObserver.disconnect();

          // Stagger filter tabs: 0ms, 80ms, 160ms, 240ms
          filterBtns.forEach((btn, i) => {
            setTimeout(() => {
              btn.style.opacity = '1';
              btn.style.transform = 'translateY(0)';
            }, i * 80);
          });

          // Stagger matrix items: start after last tab + small pause
          const baseDelay = filterBtns.length * 80 + 100;
          matrixItems.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, baseDelay + i * 80);
          });
        }
      },
      { threshold: 0.08 }
    );

    servicesObserver.observe(servicesSection);
  }

  // ===================================================================
  // 10. INTERACTIVE ARIZONA NEIGHBORHOOD MAP
  // ===================================================================
  const neighborhoodData = {
    'scottsdale': {
      city: 'Scottsdale',
      projects: '45+',
      title: 'Scottsdale Luxury Travertine Estates',
      desc: "Arizona's premier luxury zip codes — Scottsdale is where we do our most iconic resort-style work: custom travertine pool decks, pavered driveways, and full outdoor kitchen islands that rival five-star resorts.",
      timeline: '5–8 Days',
      material: 'Ivory Travertine',
      image: 'images/pavers-project.jpg',
      link: 'scottsdale.html'
    },
    'paradise-valley': {
      city: 'Paradise Valley',
      projects: '30+',
      title: 'Paradise Valley Resort Backyards',
      desc: "The most exclusive zip code in Arizona. Our Paradise Valley clients demand perfection — and we deliver: seamless travertine coping, desert-native xeriscape borders, and full lighting systems for year-round evening entertaining.",
      timeline: '4–6 Days',
      material: 'Custom Travertine Coping',
      image: 'images/gallery-1.jpg',
      link: 'paradise-valley.html'
    },
    'fountain-hills': {
      city: 'Fountain Hills',
      projects: '20+',
      title: 'Fountain Hills Desert Oasis Yards',
      desc: "Perched above the Valley with stunning Sonoran Desert views, Fountain Hills homeowners choose us for synthetic turf lawns, flagstone patios, and desert-themed hardscaping that frames their million-dollar scenery.",
      timeline: '3–5 Days',
      material: 'Heat-Shield Synthetic Turf',
      image: 'images/turf-project.jpg',
      link: 'scottsdale.html'
    },
    'arcadia': {
      city: 'Arcadia',
      projects: '25+',
      title: 'Arcadia Craftsman Patio & Lawn Installs',
      desc: "Arcadia's iconic Craftsman homes deserve outdoor spaces to match. We install lush synthetic turf lawns, flagstone patio extensions, and low-voltage desert lighting that seamlessly blend modern luxury with neighborhood character.",
      timeline: '4–5 Days',
      material: 'Flagstone & Premium Turf',
      image: 'images/gallery-2.jpg',
      link: 'scottsdale.html'
    },
    'gilbert': {
      city: 'Gilbert',
      projects: '35+',
      title: 'Gilbert Family Backyard Transformations',
      desc: "Gilbert families trust us to transform their backyards into private resort escapes — synthetic putting greens, interlocking paver patios, built-in BBQ stations, and custom fire pit seating areas the whole family can enjoy year-round.",
      timeline: '5–7 Days',
      material: 'Interlocking Pavers',
      image: 'images/gallery-3.jpg',
      link: 'gilbert.html'
    },
    'chandler': {
      city: 'Chandler',
      projects: '28+',
      title: 'Chandler Outdoor Kitchen & Entertainment',
      desc: "Chandler's booming luxury neighborhoods demand outdoor kitchens worthy of a Food Network show. We build stacked stone BBQ islands, cedar pergolas, and travertine entertaining floors that hold up under Arizona's most punishing summers.",
      timeline: '6–10 Days',
      material: 'Stacked Natural Stone',
      image: 'images/bbq-kitchen-project.jpg',
      link: 'chandler.html'
    }
  };

  const azPins = document.querySelectorAll('.az-map-pin');
  const nbhdPanelDefault = document.getElementById('nbhdPanelDefault');
  const nbhdPanelCard = document.getElementById('nbhdPanelCard');
  const nbhdCardImage = document.getElementById('nbhdCardImage');
  const nbhdCardCity = document.getElementById('nbhdCardCity');
  const nbhdCardProjects = document.getElementById('nbhdCardProjects');
  const nbhdCardTitle = document.getElementById('nbhdCardTitle');
  const nbhdCardDesc = document.getElementById('nbhdCardDesc');
  const nbhdCardTimeline = document.getElementById('nbhdCardTimeline');
  const nbhdCardMaterial = document.getElementById('nbhdCardMaterial');
  const nbhdCardCta = document.getElementById('nbhdCardCta');
  const nbhdCtaCity = document.getElementById('nbhdCtaCity');

  if (azPins.length && nbhdPanelDefault) {
    function activateNeighborhoodPin(pin) {
      // Update active state
      azPins.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');

      const cityKey = pin.getAttribute('data-city');
      const data = neighborhoodData[cityKey];
      if (!data) return;

      // Populate panel card
      if (nbhdCardImage) nbhdCardImage.src = data.image;
      if (nbhdCardCity) nbhdCardCity.textContent = data.city;
      if (nbhdCardProjects) nbhdCardProjects.textContent = data.projects;
      if (nbhdCardTitle) nbhdCardTitle.textContent = data.title;
      if (nbhdCardDesc) nbhdCardDesc.textContent = data.desc;
      if (nbhdCardTimeline) nbhdCardTimeline.textContent = data.timeline;
      if (nbhdCardMaterial) nbhdCardMaterial.textContent = data.material;
      if (nbhdCtaCity) nbhdCtaCity.textContent = data.city;
      if (nbhdCardCta) nbhdCardCta.href = '#lead-form';

      // Swap panels with animation
      if (nbhdPanelDefault) nbhdPanelDefault.style.display = 'none';
      if (nbhdPanelCard) {
        nbhdPanelCard.style.display = 'flex';
        // Re-trigger animation
        nbhdPanelCard.style.animation = 'none';
        nbhdPanelCard.offsetHeight; // force reflow
        nbhdPanelCard.style.animation = '';
      }
    }

    azPins.forEach(pin => {
      pin.addEventListener('click', () => activateNeighborhoodPin(pin));
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateNeighborhoodPin(pin);
        }
      });
    });
  }

  // ===================================================================
  // 11. CINEMA-STYLE PROJECT SHOWCASE MODAL
  // ===================================================================
  const modalGalleryCards = document.querySelectorAll('.gallery-card[data-modal-title]');
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalLocationLabel = document.getElementById('modalLocationLabel');
  const modalCarouselTrack = document.getElementById('modalCarouselTrack');
  const modalCarouselCounter = document.getElementById('modalCarouselCounter');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectDesc = document.getElementById('modalProjectDesc');
  const modalTagsRow = document.getElementById('modalTagsRow');
  const modalTimeline = document.getElementById('modalTimeline');
  const modalSqft = document.getElementById('modalSqft');
  const modalMaterials = document.getElementById('modalMaterials');
  const modalCtaBtn = document.getElementById('modalCtaBtn');

  let currentSlide = 0;
  let totalSlides = 0;

  function openProjectModal(card) {
    const title = card.getAttribute('data-modal-title');
    const location = card.getAttribute('data-modal-location');
    const timeline = card.getAttribute('data-modal-timeline');
    const materials = card.getAttribute('data-modal-materials');
    const sqft = card.getAttribute('data-modal-sqft');
    const tagsStr = card.getAttribute('data-modal-tags') || '';
    const desc = card.getAttribute('data-modal-desc');
    const imagesStr = card.getAttribute('data-modal-images') || '';
    const images = imagesStr.split(',').map(s => s.trim()).filter(Boolean);

    // Populate content
    if (modalLocationLabel) modalLocationLabel.textContent = location;
    if (modalProjectTitle) modalProjectTitle.textContent = title;
    if (modalProjectDesc) modalProjectDesc.textContent = desc;
    if (modalTimeline) modalTimeline.textContent = timeline;
    if (modalSqft) modalSqft.textContent = sqft;
    if (modalMaterials) modalMaterials.textContent = materials;

    // Build tags
    if (modalTagsRow) {
      modalTagsRow.innerHTML = tagsStr.split(',').map(tag =>
        `<span class="modal-tag">${tag.trim()}</span>`
      ).join('');
    }

    // Build carousel
    if (modalCarouselTrack) {
      modalCarouselTrack.innerHTML = images.map(src =>
        `<div class="modal-carousel-slide"><img src="${src}" alt="${title}" loading="lazy"></div>`
      ).join('');
    }

    totalSlides = images.length;
    currentSlide = 0;
    updateCarouselCounter();

    // Show modal — CSS transitions handle the animation via .is-open class
    if (modalOverlay) {
      modalOverlay.style.display = 'flex';
      requestAnimationFrame(() => {
        modalOverlay.classList.add('is-open');
      });
      document.body.style.overflow = 'hidden';
    }

    // Set CTA
    if (modalCtaBtn) {
      modalCtaBtn.href = `#lead-form`;
      modalCtaBtn.addEventListener('click', () => closeProjectModal(), { once: true });
    }
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-open');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 320);
  }

  function updateCarouselCounter() {
    if (modalCarouselCounter && totalSlides > 0) {
      modalCarouselCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }
    if (modalCarouselTrack) {
      modalCarouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }

  if (modalGalleryCards.length && modalOverlay) {
    modalGalleryCards.forEach(card => {
      card.addEventListener('click', () => openProjectModal(card));
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    // Close on overlay click (outside drawer)
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
        closeProjectModal();
      }
    });
  }

});
