// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  let scene3D = null;
  let activeViewId = "home";

  // 1. INITIALIZE 3D BACKGROUND SCENE
  try {
    if (window.SpiritualThreeScene) {
      scene3D = new window.SpiritualThreeScene("bg-canvas");
    }
  } catch (error) {
    console.error("Failed to initialize 3D scene:", error);
  }

  // 2. RUNTIME PAGE ROUTER
  const pageViews = document.querySelectorAll(".page-view");
  const navLinks = document.querySelectorAll(".nav-link, .dropdown-item");

  function handleRoute() {
    let hash = window.location.hash.substring(1);
    if (!hash || hash === "") hash = "home";

    // Validate that the target view exists
    const targetView = document.getElementById(hash);
    if (!targetView) return;

    // Check if view is actually changing
    if (activeViewId === hash) {
      // Still update Three.js view just in case
      if (scene3D) scene3D.setCameraView(hash);
      return;
    }

    const currentActiveView = document.getElementById(activeViewId);

    // Dynamic Entrance Staggered Cards Animation function
    const triggerCardsEntrance = (container) => {
      const cards = container.querySelectorAll(".package-card, .gallery-card, .hotel-card, .airline-card, .faq-item");
      if (cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(cards, 
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.07, ease: "power2.out" }
        );
      }
    };

    // GSAP Page Transition Animation
    if (currentActiveView) {
      gsap.to(currentActiveView, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        onComplete: () => {
          currentActiveView.classList.remove("active-view");
          
          targetView.classList.add("active-view");
          gsap.fromTo(targetView, 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", onComplete: () => triggerCardsEntrance(targetView) }
          );
        }
      });
    } else {
      targetView.classList.add("active-view");
      gsap.fromTo(targetView, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", onComplete: () => triggerCardsEntrance(targetView) }
      );
    }

    // Scroll back to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update Three.js camera position & triggers
    activeViewId = hash;
    if (scene3D) {
      scene3D.setCameraView(hash);
    }

    // Update Nav active classes
    navLinks.forEach(link => {
      if (link.getAttribute("data-view") === hash) {
        link.classList.add("active");
        // For sub-menus, highlight parent dropdown too
        const parentDropdown = link.closest(".dropdown");
        if (parentDropdown) {
          parentDropdown.querySelector(".nav-link").classList.add("active");
        }
      } else {
        link.classList.remove("active");
        const parentDropdown = link.closest(".dropdown");
        if (parentDropdown) {
          const hasActiveChild = parentDropdown.querySelectorAll(".dropdown-item.active").length > 0;
          if (!hasActiveChild) {
            parentDropdown.querySelector(".nav-link").classList.remove("active");
          }
        }
      }
    });

    // Close mobile menu if open
    const navMenu = document.getElementById("nav-menu");
    const hamburger = document.getElementById("hamburger");
    if (navMenu.classList.contains("active-menu")) {
      navMenu.classList.remove("active-menu");
      hamburger.classList.remove("active-hamburger");
    }
  }

  window.addEventListener("hashchange", handleRoute);
  // Trigger initial route
  handleRoute();

  // Scroll navbar highlight & 3D camera / flight scroll listeners
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // 3D scene scroll trigger animations
    if (activeViewId === "home" && scene3D) {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = pageHeight > 0 ? window.scrollY / pageHeight : 0;

      // Rotate camera target slightly based on scroll position
      if (scene3D.kaaba) {
        scene3D.targetCameraPos.y = 3.5 + window.scrollY * 0.006;
        scene3D.targetCameraPos.z = 10 - window.scrollY * 0.005;
      }

      // Fly airplane across the sky once user scrolls past 150px
      if (window.scrollY > 150 && !scene3D.planeScrollTriggered) {
        scene3D.triggerPlaneFlight();
        scene3D.planeScrollTriggered = true;

        // Reset toggle lock after 8 seconds
        setTimeout(() => {
          scene3D.planeScrollTriggered = false;
        }, 8000);
      }
    }
  });

  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active-menu");
    hamburger.classList.toggle("active-hamburger");
  });

  // Mobile dropdown toggle inside menu
  const dropNavs = document.querySelectorAll(".nav-item.dropdown");
  dropNavs.forEach(drop => {
    drop.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        drop.classList.toggle("active-drop");
      }
    });
  });

  // 3. DYNAMIC CONTENT RENDERING FROM SITEDATA
  const data = window.siteData || { hajjPackages: [], umrahPackages: [], holyPlaces: [], flights: [], hotels: [], testimonials: [], faqs: [] };

  // Render Hajj Packages
  const hajjContainer = document.getElementById("hajj-packages-container");
  if (hajjContainer && data.hajjPackages.length > 0) {
    hajjContainer.innerHTML = data.hajjPackages.map(pkg => `
      <div class="package-card">
        <div class="package-card-inner">
          ${pkg.badge ? `<span class="package-badge">${pkg.badge}</span>` : ""}
          <h3 class="package-title">${pkg.name}</h3>
          <span class="package-duration">${pkg.duration} Duration</span>
          <div class="package-price">${pkg.price}</div>
          <ul class="package-details">
            <li><i class="fa fa-hotel"></i> ${pkg.hotel}</li>
            <li><i class="fa fa-plane"></i> ${pkg.flight}</li>
            <li><i class="fa fa-utensils"></i> ${pkg.food}</li>
            <li><i class="fa fa-bus"></i> ${pkg.transport}</li>
            <li><i class="fa fa-id-card"></i> ${pkg.visa}</li>
            <li><i class="fa fa-mosque"></i> ${pkg.ziyarat}</li>
          </ul>
          <a href="#booking" class="btn-gold btn-book-trigger" data-package-id="${pkg.id}" style="width: 100%; text-align: center;">Book Package</a>
        </div>
      </div>
    `).join("");
  }

  // Render Umrah Packages
  const umrahContainer = document.getElementById("umrah-packages-container");
  if (umrahContainer && data.umrahPackages.length > 0) {
    umrahContainer.innerHTML = data.umrahPackages.map(pkg => `
      <div class="package-card">
        <div class="package-card-inner">
          ${pkg.badge ? `<span class="package-badge">${pkg.badge}</span>` : ""}
          <h3 class="package-title">${pkg.name}</h3>
          <span class="package-duration">${pkg.duration} Duration</span>
          <div class="package-price">${pkg.price}</div>
          <ul class="package-details">
            <li><i class="fa fa-hotel"></i> ${pkg.hotel}</li>
            <li><i class="fa fa-plane"></i> ${pkg.flight}</li>
            <li><i class="fa fa-utensils"></i> ${pkg.food}</li>
            <li><i class="fa fa-bus"></i> ${pkg.transport}</li>
            <li><i class="fa fa-id-card"></i> ${pkg.visa}</li>
            <li><i class="fa fa-mosque"></i> ${pkg.ziyarat}</li>
          </ul>
          <a href="#booking" class="btn-gold btn-book-trigger" data-package-id="${pkg.id}" style="width: 100%; text-align: center;">Book Package</a>
        </div>
      </div>
    `).join("");
  }

  // Render Holy Places Gallery Cards
  const galleryContainer = document.getElementById("gallery-container");
  if (galleryContainer && data.holyPlaces.length > 0) {
    galleryContainer.innerHTML = data.holyPlaces.map(place => `
      <div class="gallery-card" data-coords-x="${place.coords.x}" data-coords-y="${place.coords.y}">
        <div class="gallery-bg" style="background-image: url('${place.image}');"></div>
        <div class="gallery-info">
          <span class="gallery-highlight">${place.highlight}</span>
          <h3 class="gallery-name">${place.name}</h3>
          <div class="gallery-loc"><i class="fa fa-location-dot"></i> ${place.location}</div>
          <p class="gallery-desc">${place.description}</p>
        </div>
      </div>
    `).join("");

    // Gallery Cards interaction with 3D space on click
    const cards = galleryContainer.querySelectorAll(".gallery-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const x = parseFloat(card.getAttribute("data-coords-x"));
        const y = parseFloat(card.getAttribute("data-coords-y"));
        
        if (scene3D && scene3D.kaaba) {
          // Temporarily slide camera around center toward target coordinate adjustments
          scene3D.targetCameraPos = { x: x * 8, y: 4 + y * 2, z: 8 - Math.abs(x) * 2 };
          scene3D.targetCameraLook = { x: 0, y: 1.5, z: 0 };
          
          // Flash a glow in 3D scene (adjusting light intensity)
          if (scene3D.dirLight) {
            gsap.to(scene3D.dirLight, {
              intensity: 2.5,
              duration: 0.3,
              yoyo: true,
              repeat: 1
            });
          }
        }
      });
    });
  }

  // Render Flights List
  const airlineContainer = document.getElementById("airline-container");
  if (airlineContainer && data.flights.length > 0) {
    const renderFlights = (filterName = "all") => {
      let filtered = data.flights;
      if (filterName !== "all") {
        filtered = data.flights.filter(f => f.logo === filterName);
      }
      airlineContainer.innerHTML = filtered.map(f => `
        <div class="airline-card">
          <div class="airline-header">
            <div class="airline-logo-box" style="color: ${f.logoColor};">
              <i class="fa fa-plane-up"></i>
              <h3 class="airline-name">${f.airline}</h3>
            </div>
            <div class="airline-rating"><i class="fa fa-star"></i> ${f.rating}</div>
          </div>
          <p style="font-size:0.85rem; color:var(--color-silver); margin-bottom: 0.8rem;">Classes: ${f.class}</p>
          <div class="airline-features">${f.features}</div>
        </div>
      `).join("");
    };

    renderFlights();

    // Flight search filtering listener
    const filterSelect = document.getElementById("airline-filter");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        renderFlights(e.target.value);
      });
    }
  }

  // Render Hotels List
  const hotelsContainer = document.getElementById("hotels-container");
  if (hotelsContainer && data.hotels.length > 0) {
    hotelsContainer.innerHTML = data.hotels.map(h => `
      <div class="hotel-card">
        <div class="hotel-image-mock"></div>
        <div class="hotel-info">
          <div class="hotel-stars">
            ${Array(h.stars).fill('<i class="fa fa-star"></i>').join("")}
            <span style="color:var(--color-silver); margin-left: 5px;">(${h.rating})</span>
          </div>
          <h3 class="hotel-name">${h.name}</h3>
          <div class="hotel-loc"><i class="fa fa-location-dot"></i> ${h.location}</div>
          <p class="hotel-desc">${h.description}</p>
          <span class="hotel-highlight">${h.highlight}</span>
        </div>
      </div>
    `).join("");
  }

  // Render Testimonials Carousel Slider
  const tSliderContainer = document.getElementById("testimonial-slider-container");
  const controlsContainer = document.getElementById("slider-controls-container");
  if (tSliderContainer && controlsContainer && data.testimonials.length > 0) {
    tSliderContainer.innerHTML = data.testimonials.map(t => `
      <div class="testimonial-slide">
        <div class="testimonial-box">
          <i class="fa fa-quote-left quote-icon"></i>
          <p class="testimonial-text">"${t.review}"</p>
          <div class="testimonial-avatar" style="background-image: url(${t.avatar}); background-size: cover; background-position: center;"></div>
          <h4 class="testimonial-name">${t.name}</h4>
          <span class="testimonial-details">${t.city} • ${t.package}</span>
        </div>
      </div>
    `).join("");

    controlsContainer.innerHTML = data.testimonials.map((_, idx) => `
      <div class="slider-dot ${idx === 0 ? "active-dot" : ""}" data-slide="${idx}"></div>
    `).join("");

    // Add slider interactive click events
    const dots = controlsContainer.querySelectorAll(".slider-dot");
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-slide"));
        
        // Translate the container to slide
        const percent = -33.333 * index;
        gsap.to(tSliderContainer, { x: `${percent}%`, duration: 0.5, ease: "power2.out" });

        // Update dot status
        dots.forEach(d => d.classList.remove("active-dot"));
        dot.classList.add("active-dot");
      });
    });
  }

  // Render FAQs Accordions
  const faqsContainer = document.getElementById("faqs-container");
  if (faqsContainer && data.faqs.length > 0) {
    faqsContainer.innerHTML = data.faqs.map(faq => `
      <div class="faq-item">
        <div class="faq-question">
          ${faq.q}
          <i class="fa fa-chevron-down"></i>
        </div>
        <div class="faq-answer">
          ${faq.a}
        </div>
      </div>
    `).join("");

    // Accordion interactive toggle logic
    const faqItems = faqsContainer.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const q = item.querySelector(".faq-question");
      q.addEventListener("click", () => {
        const isActive = item.classList.contains("faq-active");
        
        // Close all items
        faqItems.forEach(i => i.classList.remove("faq-active"));
        
        // Open target item
        if (!isActive) {
          item.classList.add("faq-active");
        }
      });
    });
  }

  // 4. LIVE BOOKING CALCULATION SYSTEM
  const bookingPkgSelect = document.getElementById("booking-package");
  const bookingTravelers = document.getElementById("booking-travelers");
  const bookingHotelUpgrade = document.getElementById("booking-hotel");
  const bookingClassUpgrade = document.getElementById("booking-class");

  const summaryBasePrice = document.getElementById("summary-base-price");
  const summaryHotelUpgrade = document.getElementById("summary-hotel-upgrade");
  const summaryFlightUpgrade = document.getElementById("summary-flight-upgrade");
  const summaryTravelersCount = document.getElementById("summary-travelers");
  const summaryGrandTotal = document.getElementById("summary-grand-total");

  // Load packages inside booking select dropdown dynamically
  if (bookingPkgSelect) {
    const allPackages = [...data.hajjPackages, ...data.umrahPackages];
    bookingPkgSelect.innerHTML = allPackages.map(pkg => `
      <option value="${pkg.id}" data-price="${pkg.rawPrice}">${pkg.name} (${pkg.price})</option>
    `).join("");

    // Helper to calculate cost
    function updateBookingSummary() {
      const selectedOption = bookingPkgSelect.options[bookingPkgSelect.selectedIndex];
      if (!selectedOption) return;

      const baseVal = parseFloat(selectedOption.getAttribute("data-price"));
      const travelersVal = Math.max(1, parseInt(bookingTravelers.value) || 1);
      
      let hotelAddVal = 0;
      if (bookingHotelUpgrade.value === "fairmont") hotelAddVal = 1500;
      if (bookingHotelUpgrade.value === "raffles") hotelAddVal = 2800;

      let flightAddVal = 0;
      if (bookingClassUpgrade.value === "business") flightAddVal = 1200;
      if (bookingClassUpgrade.value === "first") flightAddVal = 2900;

      const totalPerPerson = baseVal + hotelAddVal + flightAddVal;
      const grandTotal = totalPerPerson * travelersVal;

      // Update UI texts
      summaryBasePrice.textContent = `$${baseVal.toLocaleString()}`;
      summaryHotelUpgrade.textContent = hotelAddVal > 0 ? `+$${hotelAddVal.toLocaleString()} per traveler` : "Included";
      summaryFlightUpgrade.textContent = flightAddVal > 0 ? `+$${flightAddVal.toLocaleString()} per traveler` : "Included";
      summaryTravelersCount.textContent = travelersVal;
      summaryGrandTotal.textContent = `$${grandTotal.toLocaleString()}`;
    }

    // Attach listeners
    bookingPkgSelect.addEventListener("change", updateBookingSummary);
    bookingTravelers.addEventListener("input", updateBookingSummary);
    bookingHotelUpgrade.addEventListener("change", updateBookingSummary);
    bookingClassUpgrade.addEventListener("change", updateBookingSummary);

    // Initial calculation run
    updateBookingSummary();

    // Trigger update on selecting packages from packages view
    document.body.addEventListener("click", (e) => {
      const bookBtn = e.target.closest(".btn-book-trigger");
      if (bookBtn) {
        const id = bookBtn.getAttribute("data-package-id");
        bookingPkgSelect.value = id;
        updateBookingSummary();
      }
    });
  }

  // Submit main booking form & transition to confirmation ticket screen
  const bookingForm = document.getElementById("main-booking-form");
  const ticketReceipt = document.getElementById("ticket-receipt");
  if (bookingForm && ticketReceipt) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("booking-fullname").value;
      const email = document.getElementById("booking-email").value;
      const packageText = bookingPkgSelect.options[bookingPkgSelect.selectedIndex].text;
      const date = document.getElementById("booking-date").value;
      const departure = document.getElementById("booking-departure").value;
      const grandTotal = summaryGrandTotal.textContent;
      const refCode = "ANL-" + Math.floor(100000 + Math.random() * 900000);

      // Populate Digital Ticket Receipt
      ticketReceipt.innerHTML = `
        <div class="ticket-header">
          <span class="ticket-logo"><i class="fa fa-mosque" style="color:var(--color-gold-dark);"></i> AN-NOOR ELITE</span>
          <span style="font-size:0.75rem; color:#666; font-weight:bold;">BOOKING PASS</span>
        </div>
        <div class="ticket-body">
          <p><strong>Primary Passenger:</strong> <span>${name}</span></p>
          <p><strong>Passenger Email:</strong> <span>${email}</span></p>
          <p><strong>Selected Package:</strong> <span>${packageText}</span></p>
          <p><strong>Departure Date:</strong> <span>${date}</span></p>
          <p><strong>Departure Airport:</strong> <span>${departure}</span></p>
          <p><strong>Reference Code:</strong> <span style="font-family:monospace; font-weight:bold; color:var(--color-gold-dark);">${refCode}</span></p>
          <p class="total-price-row"><strong>Paid Grand Total:</strong> <span style="color:#0b2216; font-weight:bold;">${grandTotal}</span></p>
        </div>
      `;

      // Redirect view
      window.location.hash = "#booking-confirmation";
    });
  }

  // Digital Ticket PDF/Print mock save action
  const printBtn = document.getElementById("btn-print-ticket");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      alert("Spiritual Travel Pass saved! Your download will start momentarily.");
    });
  }

  // 5. SECURE INQUIRY FORM SUCCESS
  const contactForm = document.getElementById("contact-form-submit");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Inquiry successfully submitted! An elite scholar team representative will contact you in the next 12 hours. Check your inbox.");
      contactForm.reset();
    });
  }

  // Newsletter subscription
  const newsForm = document.getElementById("newsletter-form-submit");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Subscribed! JazakAllah Khair for joining An-Noor Elite newsletter list.");
      newsForm.reset();
    });
  }

  // 6. LOGIN/REGISTER PANEL CONTROLLER
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (tabLogin && tabRegister && loginForm && registerForm) {
    tabLogin.addEventListener("click", () => {
      tabLogin.classList.add("active-tab");
      tabRegister.classList.remove("active-tab");
      loginForm.classList.add("active-form");
      registerForm.classList.remove("active-form");
    });

    tabRegister.addEventListener("click", () => {
      tabRegister.classList.add("active-tab");
      tabLogin.classList.remove("active-tab");
      registerForm.classList.add("active-form");
      loginForm.classList.remove("active-form");
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Logged in successfully! Accessing VIP Dashboard.");
      window.location.hash = "#home";
    });

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Account created successfully! Welcome to An-Noor Elite registry.");
      window.location.hash = "#home";
    });
  }
});
