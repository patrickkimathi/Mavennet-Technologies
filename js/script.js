// ======================================
// GLOBAL DOM LOADING HELPER
// ======================================
document.addEventListener("DOMContentLoaded", () => {
  // Smooth initialization log
  console.log("✅ Portfolio Script Loaded Successfully");

  // ===============================
  // 1️⃣ MOBILE MENU TOGGLE
  // ===============================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  document.querySelectorAll(".services-menu > button").forEach(button => {
    button.addEventListener("click", () => {
      const servicesMenu = button.closest(".services-menu");
      const isOpen = servicesMenu.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  const today = new Date();
  const todayValue = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  document.querySelectorAll('input[type="date"]').forEach(dateInput => {
    dateInput.min = todayValue;
  });

  // ===============================
  // 1️⃣.5️⃣ HERO CAROUSEL - SLIDING BACKGROUND IMAGES
  // ===============================
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;

  function showSlide(index) {
    if (slides.length > 0) {
      slides.forEach(slide => slide.classList.remove("active"));
      indicators.forEach(indicator => indicator.classList.remove("active"));

      slides[index].classList.add("active");
      if (indicators[index]) {
        indicators[index].classList.add("active");
      }
    }
  }

  function nextSlide() {
    if (slides.length > 0) {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  }

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  // Auto-advance carousel every 5 seconds (only if slides exist)
  let carouselInterval = null;
  if (slides.length > 1) {
    carouselInterval = setInterval(nextSlide, 5000);

    // Add click handlers to indicators
    indicators.forEach(indicator => {
      indicator.addEventListener("click", () => {
        const slideIndex = parseInt(indicator.dataset.slide);
        goToSlide(slideIndex);
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  if (slides.length > 0) {
    showSlide(0);
  }

  // Initialize first slide
  if (slides.length) {
    showSlide(0);
  }

  // ===============================
  // 2️⃣ SMOOTH SCROLL FOR ANCHORS
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===============================
  // 3️⃣ HERO TEXT FADE-IN ON LOAD
  // ===============================
  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    heroText.style.opacity = "0";
    heroText.style.transform = "translateY(30px)";

    setTimeout(() => {
      heroText.style.transition = "all 1s ease-out";
      heroText.style.opacity = "1";
      heroText.style.transform = "translateY(0)";
    }, 200);
  }

  // ===============================
  // 4️⃣ SCROLL REVEAL FOR CARDS
  // ===============================
  const cards = document.querySelectorAll(".card");

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add("show");
      }
    });
  }

  if (cards.length) {
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }

  const revealElements = document.querySelectorAll("[data-reveal]");
  if (revealElements.length) {
    function revealVisibleElements() {
      revealElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
          element.classList.add("is-visible");
        }
      });
    }

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealElements.forEach(element => revealObserver.observe(element));
    window.addEventListener("scroll", revealVisibleElements, { passive: true });
    revealVisibleElements();
  }

  // ===============================
  // 5️⃣ CONTACT FORM VALIDATION
  // ===============================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('input[type="text"]');
      const email = contactForm.querySelector('input[type="email"]');
      const company = contactForm.querySelector('#company');
      const message = contactForm.querySelector("textarea");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;

      if (name.value.trim().length < 3) {
        alert("⚠️ Please enter a valid name (at least 3 characters).");
        isValid = false;
      }

      if (!emailPattern.test(email.value.trim())) {
        alert("⚠️ Please enter a valid email address.");
        isValid = false;
      }

      if (message.value.trim().length < 10) {
        alert("⚠️ Your message should be at least 10 characters long.");
        isValid = false;
      }

      if (isValid) {
        const subject = `Contact request from ${name.value.trim()}`;
        const body = `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nCompany: ${company.value.trim() || 'N/A'}\n\nMessage:\n${message.value.trim()}`;
        const mailtoLink = `mailto:mavennetech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        contactForm.reset();
      }
    });
  }

  // ===============================
  // 5️⃣ BOOKING FORM VALIDATION
  // ===============================
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = bookingForm.querySelector('#name');
      const email = bookingForm.querySelector('#email');
      const course = bookingForm.querySelector('#course');
      const date = bookingForm.querySelector('#date');
      const message = bookingForm.querySelector('#message');

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;

      if (name.value.trim().length < 3) {
        alert("⚠️ Please enter a valid name (at least 3 characters). ");
        isValid = false;
      }

      if (!emailPattern.test(email.value.trim())) {
        alert("⚠️ Please enter a valid email address.");
        isValid = false;
      }

      if (!course.value) {
        alert("⚠️ Please select a course to book.");
        isValid = false;
      }

      if (!date.value) {
        alert("⚠️ Please select a preferred date.");
        isValid = false;
      } else if (date.value < todayValue) {
        alert("⚠️ Please select today or a future date.");
        isValid = false;
      }

      if (message.value.trim().length < 10) {
        alert("⚠️ Please tell me more about your goals in at least 10 characters.");
        isValid = false;
      }

      if (isValid) {
        const subject = `Training booking request: ${course.value}`;
        const body = `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nCourse: ${course.value}\nPreferred Date: ${date.value}\n\nMessage:\n${message.value.trim()}`;
        const mailtoLink = `mailto:mavennetech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        bookingForm.reset();
      }
    });
  }

  const reviewForm = document.getElementById("reviewForm");
  const approvedReviews = document.getElementById("approvedReviews");
  const pendingReviews = document.getElementById("pendingReviews");
  const reviewFormStatus = document.getElementById("reviewFormStatus");

  if (reviewForm && approvedReviews && pendingReviews) {
    const pendingReviewKey = "mavennetPendingReviews";
    const approvedReviewKey = "mavennetApprovedReviews";
    let pendingReviewList = JSON.parse(localStorage.getItem(pendingReviewKey) || "[]");
    let approvedReviewList = JSON.parse(localStorage.getItem(approvedReviewKey) || "[]");

    if (!Array.isArray(pendingReviewList)) pendingReviewList = [];
    if (!Array.isArray(approvedReviewList)) approvedReviewList = [];

    function reviewStars(rating) {
      return "★".repeat(rating) + "☆".repeat(5 - rating);
    }

    function renderApprovedReviews() {
      approvedReviews.replaceChildren();
      if (!approvedReviewList.length) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "review-empty";
        emptyMessage.textContent = "No verified reviews yet. Be the first to share your experience.";
        approvedReviews.appendChild(emptyMessage);
        return;
      }

      approvedReviewList.forEach(review => {
        const item = document.createElement("article");
        item.className = "review-item";
        const meta = document.createElement("div");
        meta.className = "review-meta";
        const author = document.createElement("strong");
        author.textContent = `${review.name} - ${review.service}`;
        const stars = document.createElement("span");
        stars.className = "review-stars";
        stars.textContent = reviewStars(review.rating);
        stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
        meta.append(author, stars);
        const comment = document.createElement("p");
        comment.textContent = review.comment;
        item.append(meta, comment);
        approvedReviews.appendChild(item);
      });
    }

    function renderPendingReviews() {
      pendingReviews.replaceChildren();
      if (!pendingReviewList.length) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "review-empty";
        emptyMessage.textContent = "There are no reviews waiting for verification.";
        pendingReviews.appendChild(emptyMessage);
        return;
      }

      pendingReviewList.forEach(review => {
        const item = document.createElement("article");
        item.className = "pending-review";
        const meta = document.createElement("div");
        meta.className = "review-meta";
        const author = document.createElement("strong");
        author.textContent = `${review.name} - ${review.service}`;
        const stars = document.createElement("span");
        stars.className = "review-stars";
        stars.textContent = reviewStars(review.rating);
        meta.append(author, stars);
        const comment = document.createElement("p");
        comment.textContent = review.comment;
        const actions = document.createElement("div");
        actions.className = "pending-review-actions";
        const approveButton = document.createElement("button");
        approveButton.type = "button";
        approveButton.textContent = "Approve";
        approveButton.addEventListener("click", () => {
          approvedReviewList.unshift(review);
          pendingReviewList = pendingReviewList.filter(itemReview => itemReview.id !== review.id);
          saveReviews();
        });
        const rejectButton = document.createElement("button");
        rejectButton.type = "button";
        rejectButton.textContent = "Reject";
        rejectButton.addEventListener("click", () => {
          pendingReviewList = pendingReviewList.filter(itemReview => itemReview.id !== review.id);
          saveReviews();
        });
        actions.append(approveButton, rejectButton);
        item.append(meta, comment, actions);
        pendingReviews.appendChild(item);
      });
    }

    function saveReviews() {
      localStorage.setItem(pendingReviewKey, JSON.stringify(pendingReviewList));
      localStorage.setItem(approvedReviewKey, JSON.stringify(approvedReviewList));
      renderApprovedReviews();
      renderPendingReviews();
    }

    reviewForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!reviewForm.checkValidity()) {
        reviewForm.reportValidity();
        return;
      }
      const formData = new FormData(reviewForm);
      pendingReviewList.unshift({
        id: `review-${Date.now()}`,
        name: formData.get("name").trim(),
        service: formData.get("service"),
        rating: Number(formData.get("rating")),
        comment: formData.get("comment").trim()
      });
      saveReviews();
      reviewForm.reset();
      reviewFormStatus.textContent = "Thank you. Your review is waiting for verification.";
    });

    renderApprovedReviews();
    renderPendingReviews();
  }

  // ===============================
  // 6️⃣ DARK MODE TOGGLE
  // ===============================
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (darkModeToggle) {
    // Load saved theme
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
      darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", () => {
      if (darkModeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }

  // ===============================
  // 7️⃣ BACK TO TOP BUTTON
  // ===============================
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      backToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===============================
  // 8️⃣ PROJECTS PAGE – TAB SWITCHING
  // ===============================
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        button.classList.add("active");
        const target = document.getElementById(button.dataset.tab);
        if (target) {
          target.classList.add("active");
          target.classList.add("fade-in");
          setTimeout(() => target.classList.remove("fade-in"), 500);
        }
      });
    });
  }

  // ===============================
  // 9️⃣ PROJECTS REVEAL ON SCROLL
  // ===============================
  const projectSections = document.querySelectorAll(".tab-content");

  function revealProjectsOnScroll() {
    const trigger = window.innerHeight * 0.9;
    projectSections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < trigger) {
        section.classList.add("show");
      }
    });
  }

  if (projectSections.length) {
    window.addEventListener("scroll", revealProjectsOnScroll);
    revealProjectsOnScroll();
  }

  // ===============================
  // 🔟 READ MORE / LESS BUTTONS
  // ===============================
  const readMoreBtns = document.querySelectorAll(".read-more-btn");
  readMoreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.previousElementSibling;
      const isVisible = content.style.display === "block";
      content.style.display = isVisible ? "none" : "block";
      btn.textContent = isVisible ? "Read more..." : "Read less...";
    });
  });

  // ===============================
  // 1️⃣1️⃣ THIRD-PARTY LIBRARIES INIT
  // ===============================
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  if (typeof lightbox !== "undefined") {
    lightbox.option({ resizeDuration: 200, wrapAround: true });
  }

  if (typeof Typed !== "undefined") {
    new Typed(".typed-text", {
      strings: ["Developer.", "Data Analyst.", "Creator."],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });
  }

  if (typeof CountUp !== "undefined") {
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach(stat => {
      const endValue = parseInt(stat.getAttribute("data-target"), 10);
      const counter = new CountUp(stat, endValue);
      if (!counter.error) counter.start();
    });
  }

  if (typeof Isotope !== "undefined") {
    const iso = new Isotope(".portfolio-container", {
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
        iso.arrange({ filter: filterValue });
        filterButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  if (window.$ && $(".justified-gallery").length) {
    $(".justified-gallery").justifiedGallery({
      rowHeight: 200,
      lastRow: "nojustify",
      margins: 5,
    });
  }

  // ===============================
  // 1️⃣2️⃣ LMS TRAINING PACKAGE FUNCTIONALITY
  // ===============================
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const packageModules = document.querySelectorAll(".package-modules");
  const moduleCheckboxes = document.querySelectorAll(".module-checkbox");

  // Toggle Package Modules
  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const packageName = btn.getAttribute("data-package");
        const packageElement = btn.closest(".training-package");
        const modulesContainer = packageElement.querySelector(".package-modules");
        
        // Toggle expanded class
        btn.classList.toggle("expanded");
        modulesContainer.classList.toggle("hidden");
        
        // Add smooth animation
        if (!modulesContainer.classList.contains("hidden")) {
          modulesContainer.style.maxHeight = modulesContainer.scrollHeight + "px";
        } else {
          modulesContainer.style.maxHeight = "0";
        }
      });
    });
  }

  // Update Progress on Checkbox Change
  if (moduleCheckboxes.length) {
    moduleCheckboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        const packageName = checkbox.getAttribute("data-package");
        updatePackageProgress(packageName);
        
        // Save progress to localStorage
        saveProgress(packageName);
      });
    });
  }

  // Calculate and Update Progress
  function updatePackageProgress(packageName) {
    const packageElement = document.querySelector(`.training-package [data-package="${packageName}"]`).closest(".training-package");
    const checkboxes = packageElement.querySelectorAll(`.module-checkbox[data-package="${packageName}"]`);
    const checkedCount = packageElement.querySelectorAll(`.module-checkbox[data-package="${packageName}"]:checked`).length;
    
    const progressPercentage = Math.round((checkedCount / checkboxes.length) * 100);
    
    const progressBar = packageElement.querySelector(".progress-fill");
    const progressText = packageElement.querySelector(".progress-text");
    
    progressBar.style.width = progressPercentage + "%";
    progressText.textContent = progressPercentage + "% Complete";
    
    // Add celebration animation at 100%
    if (progressPercentage === 100) {
      packageElement.classList.add("completed");
      showCelebration(packageElement);
    } else {
      packageElement.classList.remove("completed");
    }
  }

  // Show Celebration Animation
  function showCelebration(element) {
    const progressBar = element.querySelector(".progress-bar-container");
    progressBar.style.animation = "pulse 0.6s ease";
    setTimeout(() => {
      progressBar.style.animation = "";
    }, 600);
  }

  // Save Progress to localStorage
  function saveProgress(packageName) {
    const packageElement = document.querySelector(`.training-package [data-package="${packageName}"]`).closest(".training-package");
    const checkboxes = packageElement.querySelectorAll(`.module-checkbox[data-package="${packageName}"]`);
    const checkedModules = [];
    
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        checkedModules.push(index);
      }
    });
    
    localStorage.setItem(`training_progress_${packageName}`, JSON.stringify(checkedModules));
  }

  // Load Progress from localStorage
  function loadProgress(packageName) {
    const saved = localStorage.getItem(`training_progress_${packageName}`);
    if (saved) {
      const checkedIndices = JSON.parse(saved);
      const packageElement = document.querySelector(`.training-package [data-package="${packageName}"]`).closest(".training-package");
      const checkboxes = packageElement.querySelectorAll(`.module-checkbox[data-package="${packageName}"]`);
      
      checkedIndices.forEach(index => {
        if (checkboxes[index]) {
          checkboxes[index].checked = true;
        }
      });
      
      updatePackageProgress(packageName);
    }
  }

  // Load all saved progress on page load
  const allPackages = ["excel", "sheets", "powerbi", "tableau", "python", "sql", "marketing"];
  allPackages.forEach(pkg => {
    loadProgress(pkg);
  });

  // ===============================
  // 1️⃣3️⃣ MODULE TOPICS EXPAND/COLLAPSE
  // ===============================
  const moduleExpandBtns = document.querySelectorAll(".module-expand-btn");
  
  if (moduleExpandBtns.length) {
    moduleExpandBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const moduleItem = btn.closest(".module-item");
        const moduleTopics = moduleItem.querySelector(".module-topics");
        
        // Toggle expanded state
        btn.classList.toggle("active");
        moduleTopics.classList.toggle("hidden");
      });
    });
  }

  // Add CSS for animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    
    .training-package.completed .progress-bar-container {
      background: linear-gradient(90deg, rgba(0, 86, 214, 0.05) 0%, rgba(255, 122, 0, 0.05) 100%);
    }
  `;
  document.head.appendChild(style);

  // ===============================
  // 🛒 E-COMMERCE SHOPPING CART FUNCTIONALITY
  // ===============================
  
  // Shopping Cart Data
  let shoppingCart = [];
  
  // DOM Elements
  const cartButtons = document.querySelectorAll(".btn-add-cart");
  const cartOverlay = document.getElementById("cartOverlay");
  const shoppingCartElement = document.getElementById("shoppingCart");
  const closeCartBtn = document.getElementById("closeCart");
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const continueShoppingBtn = document.getElementById("continueShopping");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeCheckoutBtn = document.getElementById("closeCheckout");
  const checkoutForm = document.getElementById("checkoutForm");
  const orderSummaryElement = document.getElementById("orderSummary");
  const checkoutTotalElement = document.getElementById("checkoutTotal");
  const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
  const cardPaymentFields = document.getElementById("cardPaymentFields");
  const cardPaymentInputs = cardPaymentFields ? cardPaymentFields.querySelectorAll("input") : [];

  function updatePaymentMethod() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const isCardPayment = selectedMethod === "card";

    if (cardPaymentFields) {
      cardPaymentFields.hidden = !isCardPayment;
    }

    cardPaymentInputs.forEach(input => {
      input.disabled = !isCardPayment;
    });
  }

  paymentMethodInputs.forEach(input => {
    input.addEventListener("change", updatePaymentMethod);
  });
  updatePaymentMethod();

  // Add to Cart Button Handlers
  cartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const courseName = button.getAttribute("data-course");
      const coursePrice = parseInt(button.getAttribute("data-price"));
      
      addToCart(courseName, coursePrice);
      showCartNotification(button);
      openCart();
    });
  });

  function addToCart(courseName, coursePrice) {
    // Check if item already exists
    const existingItem = shoppingCart.find(item => item.name === courseName);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      shoppingCart.push({
        name: courseName,
        price: coursePrice,
        quantity: 1
      });
    }
    
    updateCart();
  }

  function removeFromCart(courseName) {
    shoppingCart = shoppingCart.filter(item => item.name !== courseName);
    updateCart();
  }

  function formatCurrency(amount) {
    return `KES ${amount.toLocaleString("en-KE")}`;
  }

  function updateCart() {
    // Clear and rebuild cart items display
    cartItemsContainer.innerHTML = "";
    
    if (shoppingCart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
      checkoutBtn.disabled = true;
    } else {
      shoppingCart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
          </div>
          <button class="cart-item-remove" data-course="${item.name}">×</button>
        `;
        
        cartItem.querySelector(".cart-item-remove").addEventListener("click", () => {
          removeFromCart(item.name);
        });
        
        cartItemsContainer.appendChild(cartItem);
      });
      
      checkoutBtn.disabled = false;
    }
    
    // Update summary
    updateCartSummary();
  }

  function updateCartSummary() {
    const subtotal = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.015);
    const total = subtotal + tax;
    
    subtotalElement.textContent = formatCurrency(subtotal);
    taxElement.textContent = formatCurrency(tax);
    totalElement.textContent = formatCurrency(total);
    
    // Update checkout modal total
    checkoutTotalElement.textContent = formatCurrency(total);
  }

  function showCartNotification(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span>✓ Added!</span>';
    button.style.background = '#10b981';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
    }, 1500);
  }

  function openCart() {
    shoppingCartElement.classList.add("active");
    cartOverlay.classList.add("active");
  }

  function closeCart() {
    shoppingCartElement.classList.remove("active");
    cartOverlay.classList.remove("active");
  }

  // Cart Control Buttons
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", closeCart);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      closeCart();
      openCheckout();
    });
  }

  // ===============================
  // 💳 CHECKOUT FUNCTIONALITY
  // ===============================
  
  function openCheckout() {
    if (!checkoutModal || !orderSummaryElement) return;

    // Update order summary
    const orderItems = shoppingCart.map(item => `
      <div class="summary-row">
        <span>${item.name}</span>
        <span>$${(item.price / 100).toFixed(2)}</span>
      </div>
    `).join("");
    
    orderSummaryElement.innerHTML = orderItems;
    checkoutModal.classList.add("active");
  }

  function closeCheckout() {
    if (checkoutModal) {
      checkoutModal.classList.remove("active");
    }
  }

  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener("click", closeCheckout);
  }

  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) {
        closeCheckout();
      }
    });
  }

  // Checkout Form Submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Validate form
    const inputs = checkoutForm.querySelectorAll("input:not(:disabled)");
    let isValid = true;
    
    inputs.forEach(input => {
      if (input.type !== "radio" && !input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#e74c3c";
      } else {
        input.style.borderColor = "";
      }
    });
    
    if (!isValid) {
      alert("Please fill in all fields");
      return;
    }
    
    // Get form data
    const formData = new FormData(checkoutForm);
    const paymentMethod = checkoutForm.querySelector('input[name="paymentMethod"]:checked')?.value;
    const paymentLabel = paymentMethod === "mpesa" ? "M-Pesa" : "Card";
    const orderData = {
      courses: shoppingCart,
      customerInfo: {
        name: document.getElementById("checkoutName").value,
        email: document.getElementById("checkoutEmail").value,
        address: document.getElementById("checkoutAddress").value,
        city: document.getElementById("checkoutCity").value
      },
      paymentMethod,
      timestamp: new Date().toLocaleString()
    };
    
    // Save order to localStorage
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    
    // Show success message
    const paymentMessage = paymentMethod === "mpesa"
      ? "Please send your M-Pesa payment to +254 797 666 890."
      : "Your card payment option has been recorded for processing.";
    alert(`✓ Order placed successfully!\\n\\nPayment method: ${paymentLabel}\\n${paymentMessage}\\n\\nThank you for your purchase. Your courses have been added to your account. Check your email at ${document.getElementById("checkoutEmail").value} for login credentials and course access links.\\n\\nOrder ID: ${Date.now()}`);
    
    // Reset and close
    shoppingCart = [];
    updateCart();
    closeCheckout();
    checkoutForm.reset();
    });
  }

  // ===============================
  // 🔍 SEARCH AND FILTER (Optional)
  // ===============================
  
  const searchInput = document.getElementById("searchCourses");
  const sortSelect = document.getElementById("sortCourses");
  const courseCards = document.querySelectorAll(".course-card");
  const courseSearchMessage = document.getElementById("courseSearchMessage");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 1);
      const scoredCards = Array.from(courseCards).map((card, index) => {
        const searchableText = card.textContent.toLowerCase();
        const score = searchWords.reduce((total, word) => {
          return total + (searchableText.includes(word) ? 1 : 0);
        }, 0);

        return { card, index, score };
      });

      if (!searchTerm) {
        scoredCards.forEach(({ card }) => {
          card.style.display = "";
        });
        if (courseSearchMessage) {
          courseSearchMessage.style.display = "none";
          courseSearchMessage.textContent = "";
        }
        return;
      }

      const matchingCards = scoredCards
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score || a.index - b.index);
      const cardsToShow = matchingCards.length > 0
        ? matchingCards
        : scoredCards.filter(({ card }) => card.classList.contains("course-card-request") === false).slice(0, 3);

      scoredCards.forEach(({ card }) => {
        card.style.display = cardsToShow.some(result => result.card === card) ? "" : "none";
      });

      if (courseSearchMessage) {
        const hasExactMatch = matchingCards.some(({ card }) =>
          card.querySelector("h3").textContent.toLowerCase().includes(searchTerm)
        );
        courseSearchMessage.style.display = hasExactMatch ? "none" : "block";
        courseSearchMessage.textContent = hasExactMatch
          ? ""
          : `Sorry, we currently do not offer \"${searchInput.value.trim()}\", but we have something amazing for you:`;
      }
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const sortValue = e.target.value;
      const cardsArray = Array.from(courseCards);
      const container = document.querySelector(".courses-container");
      
      if (sortValue === "price-low") {
        cardsArray.sort((a, b) => {
          const priceA = parseInt(a.getAttribute("data-price"), 10);
          const priceB = parseInt(b.getAttribute("data-price"), 10);
          if (Number.isNaN(priceA)) return 1;
          if (Number.isNaN(priceB)) return -1;
          return priceA - priceB;
        });
      } else if (sortValue === "price-high") {
        cardsArray.sort((a, b) => {
          const priceA = parseInt(a.getAttribute("data-price"), 10);
          const priceB = parseInt(b.getAttribute("data-price"), 10);
          if (Number.isNaN(priceA)) return 1;
          if (Number.isNaN(priceB)) return -1;
          return priceB - priceA;
        });
      }
      // "featured" and "newest" keep original order
      
      // Reorder DOM
      cardsArray.forEach(card => {
        container.appendChild(card);
      });
    });
  }

  const blogPostsGrid = document.getElementById("blogPostsGrid");
  const blogPostForm = document.getElementById("blogPostForm");

  if (blogPostsGrid && blogPostForm) {
    const defaultBlogPosts = [
      {
        id: "superstore-dashboard",
        title: "Superstore Sales Dashboard: A Power BI Project",
        category: "Data & Analytics",
        date: "2025-10-08",
        excerpt: "In this project, I built a Superstore Sales Dashboard using Power BI to explore sales performance, profitability, customer behavior, and operational efficiency.",
        content: "The dashboard transforms the open-source Superstore dataset from Kaggle into actionable business insights, showcasing my skills in data modeling, DAX, and data storytelling.\n\nProject Objective\nThe dashboard analyzes Superstore sales data to uncover trends influencing profitability and customer satisfaction. It includes metrics like total sales, profit margins, shipping mode performance, and order duration distribution.\n\nKey visuals include KPI Cards, Donut Charts, Bar Charts, Combo Charts, and Histograms. Each offers insight into sales patterns, top-performing categories, and customer segments.\n\nTools: Power BI, DAX, Power Query\n\nThis project demonstrates how to transform raw datasets into powerful business intelligence dashboards for better decision-making.\n\nSpecial thanks to Future Interns for providing the learning environment and to Kaggle for making high-quality open datasets accessible."
      },
      {
        id: "web-trends-2025",
        title: "Web Development Trends in 2025",
        category: "Digital Growth",
        date: "2025-02-15",
        excerpt: "As technology evolves, so do the trends shaping modern web development. In 2025, developers are embracing smarter tools, AI-driven experiences, and highly responsive designs to improve performance and accessibility.",
        content: "AI-Powered Websites: Personalized content through machine learning algorithms.\n\nLow-Code Platforms: Faster deployment with tools like Webflow and Bubble.\n\nServerless Architecture: More scalable, cost-effective backend solutions.\n\nCybersecurity Focus: Enhanced protocols to protect user data and privacy.\n\nThese trends enable developers to build user-centered, secure, and efficient digital experiences. Staying ahead of these innovations ensures competitive advantage in the fast-paced web industry."
      },
      {
        id: "ui-ux-design",
        title: "Why UI/UX Design Matters",
        category: "Design",
        date: "2025-03-10",
        excerpt: "UI/UX design plays a crucial role in creating intuitive digital products that meet user needs. A seamless experience can significantly boost engagement and retention rates.",
        content: "Good UI focuses on the visual appeal, while UX ensures smooth interaction and flow. Together, they enhance satisfaction and encourage brand loyalty.\n\nDesigners today combine empathy, research, and testing to build interfaces that simplify complex processes and delight users.\n\nUltimately, investing in UI/UX is not just about aesthetics; it is about delivering functional, accessible, and impactful experiences."
      }
    ];

    let savedBlogPosts = JSON.parse(localStorage.getItem("mavennetBlogPosts") || "[]");
    let importedBlogPosts = [];
    let blogUser = JSON.parse(localStorage.getItem("mavennetBlogUser") || "null");
    let blogComments = JSON.parse(localStorage.getItem("mavennetBlogComments") || "{}") || {};
    const blogLoginForm = document.getElementById("blogLoginForm");
    const blogLoginEmail = document.getElementById("blogLoginEmail");
    const blogAuthStatus = document.getElementById("blogAuthStatus");
    if (!Array.isArray(savedBlogPosts)) {
      savedBlogPosts = [];
    }

    function formatBlogDate(dateValue) {
      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(new Date(`${dateValue}T00:00:00`));
    }

    function renderBlogPosts() {
      blogPostsGrid.replaceChildren();
      [...savedBlogPosts, ...importedBlogPosts, ...defaultBlogPosts].forEach(post => {
        const article = document.createElement("article");
        article.className = "blog-post-card";
        article.dataset.postId = post.id;

        const meta = document.createElement("div");
        meta.className = "post-meta";
        const category = document.createElement("span");
        category.textContent = post.category;
        const date = document.createElement("time");
        date.dateTime = post.date;
        date.textContent = formatBlogDate(post.date);
        meta.append(category, date);

        const title = document.createElement("h3");
        title.textContent = post.title;

        const excerpt = document.createElement("p");
        excerpt.className = "post-excerpt";
        excerpt.textContent = post.excerpt;

        const content = document.createElement("p");
        content.className = "post-content";
        content.textContent = post.content;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const readMore = document.createElement("button");
        readMore.className = "post-read-more";
        readMore.type = "button";
        readMore.textContent = "Read more";
        readMore.addEventListener("click", () => {
          const expanded = article.classList.toggle("is-expanded");
          readMore.textContent = expanded ? "Show less" : "Read more";
        });
        actions.appendChild(readMore);

        if (savedBlogPosts.some(savedPost => savedPost.id === post.id)) {
          const deletePost = document.createElement("button");
          deletePost.className = "post-delete";
          deletePost.type = "button";
          deletePost.textContent = "Delete";
          deletePost.addEventListener("click", () => {
            savedBlogPosts = savedBlogPosts.filter(savedPost => savedPost.id !== post.id);
            localStorage.setItem("mavennetBlogPosts", JSON.stringify(savedBlogPosts));
            renderBlogPosts();
          });
          actions.appendChild(deletePost);
        }

        const comments = document.createElement("section");
        comments.className = "post-comments";
        const commentsHeading = document.createElement("strong");
        commentsHeading.textContent = "Comments";
        const commentList = document.createElement("ul");
        commentList.className = "post-comment-list";
        (blogComments[post.id] || []).forEach(comment => {
          const item = document.createElement("li");
          item.textContent = `${comment.email}: ${comment.text}`;
          commentList.appendChild(item);
        });

        const commentForm = document.createElement("form");
        commentForm.className = "post-comment-form";
        const commentInput = document.createElement("textarea");
        commentInput.required = true;
        commentInput.maxLength = 500;
        commentInput.placeholder = blogUser ? "Write a comment..." : "Sign in with a valid email to comment";
        commentInput.disabled = !blogUser;
        const commentSubmit = document.createElement("button");
        commentSubmit.className = "post-comment-submit";
        commentSubmit.type = "submit";
        commentSubmit.textContent = "Post comment";
        commentSubmit.disabled = !blogUser;
        commentForm.append(commentInput, commentSubmit);
        commentForm.addEventListener("submit", event => {
          event.preventDefault();
          if (!blogUser || !commentInput.value.trim()) {
            return;
          }
          blogComments[post.id] = blogComments[post.id] || [];
          blogComments[post.id].push({ email: blogUser.email, text: commentInput.value.trim() });
          localStorage.setItem("mavennetBlogComments", JSON.stringify(blogComments));
          renderBlogPosts();
        });
        comments.append(commentsHeading, commentList, commentForm);

        article.append(meta, title, excerpt, content, actions, comments);
        blogPostsGrid.appendChild(article);
      });
    }

    function isValidBlogEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (blogUser) {
      blogLoginEmail.value = blogUser.email;
      blogAuthStatus.textContent = `Signed in as ${blogUser.email}.`;
      blogAuthStatus.className = "blog-auth-status is-success";
    }

    blogLoginForm.addEventListener("submit", event => {
      event.preventDefault();
      const email = blogLoginEmail.value.trim().toLowerCase();
      if (!isValidBlogEmail(email)) {
        blogAuthStatus.textContent = "Enter a valid email address to comment.";
        blogAuthStatus.className = "blog-auth-status is-error";
        return;
      }
      blogUser = { email };
      localStorage.setItem("mavennetBlogUser", JSON.stringify(blogUser));
      blogAuthStatus.textContent = `Signed in as ${email}.`;
      blogAuthStatus.className = "blog-auth-status is-success";
      renderBlogPosts();
    });

    blogPostForm.querySelector("#postDate").value = todayValue;
    blogPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(blogPostForm);
      if (formData.get("date") < todayValue) {
        blogPostForm.querySelector("#postDate").setCustomValidity("Please choose today or a future date.");
        blogPostForm.querySelector("#postDate").reportValidity();
        return;
      }
      blogPostForm.querySelector("#postDate").setCustomValidity("");
      const newPost = {
        id: `local-${Date.now()}`,
        title: formData.get("title").trim(),
        category: formData.get("category"),
        date: formData.get("date"),
        excerpt: formData.get("excerpt").trim(),
        content: formData.get("content").trim()
      };

      savedBlogPosts.unshift(newPost);
      localStorage.setItem("mavennetBlogPosts", JSON.stringify(savedBlogPosts));
      blogPostForm.reset();
      blogPostForm.querySelector("#postDate").value = todayValue;
      renderBlogPosts();
      blogPostsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    renderBlogPosts();

    fetch("/api/facebook-posts", {
      credentials: "same-origin",
      headers: { Accept: "application/json" }
    })
      .then(response => response.ok ? response.json() : [])
      .then(posts => {
        if (Array.isArray(posts)) {
          importedBlogPosts = posts
            .filter(post => post && post.title && post.date && post.excerpt && post.content)
            .map(post => ({
              id: `facebook-${post.id || post.date}-${post.title}`,
              title: String(post.title),
              category: String(post.category || "Facebook"),
              date: String(post.date).slice(0, 10),
              excerpt: String(post.excerpt),
              content: String(post.content)
            }));
          renderBlogPosts();
        }
      })
      .catch(() => {});
  }
});

