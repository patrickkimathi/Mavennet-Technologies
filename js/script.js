// ======================================
// GLOBAL DOM LOADING HELPER
// ======================================
document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 1️⃣ MOBILE MENU TOGGLE
  // ===============================
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
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
    const requestedCourse = new URLSearchParams(window.location.search).get("course");
    if (requestedCourse) {
      const inquiryType = contactForm.querySelector("#inquiryType");
      const message = contactForm.querySelector("#message");
      if (inquiryType) inquiryType.value = "Training";
      if (message) message.value = `I would like to request details and pricing for the ${requestedCourse} course.`;
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("#name");
      const email = contactForm.querySelector("#email");
      const company = contactForm.querySelector("#company");
      const inquiryType = contactForm.querySelector("#inquiryType");
      const message = contactForm.querySelector("#message");
      const formStatus = contactForm.querySelector("#formStatus");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const fields = [
        { element: name, error: "#nameError", validate: value => value.length >= 3, text: "Please enter your full name (at least 3 characters)." },
        { element: email, error: "#emailError", validate: value => emailPattern.test(value), text: "Please enter a valid email address." },
        { element: inquiryType, error: "#inquiryTypeError", validate: value => value.length > 0, text: "Please select an inquiry type." },
        { element: message, error: "#messageError", validate: value => value.length >= 10, text: "Please describe your request in at least 10 characters." }
      ];

      let firstInvalid = null;
      fields.forEach(field => {
        const value = field.element.value.trim();
        const error = contactForm.querySelector(field.error);
        const isValid = field.validate(value);
        field.element.classList.toggle("is-invalid", !isValid);
        field.element.setAttribute("aria-invalid", String(!isValid));
        error.textContent = isValid ? "" : field.text;
        if (!isValid && !firstInvalid) firstInvalid = field.element;
      });

      formStatus.className = "form-status";
      if (firstInvalid) {
        formStatus.textContent = "Please correct the highlighted fields.";
        formStatus.classList.add("error");
        firstInvalid.focus();
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = "Preparing Request...";

      const subject = `Contact request from ${name.value.trim()} — ${inquiryType.value}`;
      const body = `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nCompany: ${company.value.trim() || "N/A"}\nInquiry type: ${inquiryType.value}\n\nMessage:\n${message.value.trim()}`;
        const mailtoLink = `mailto:mavennetech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        formStatus.textContent = "Opening your email application to send the request.";
        formStatus.classList.add("success");
        window.location.href = mailtoLink;
        submitButton.disabled = false;
        submitButton.textContent = "Send Request";
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
  const coursePathways = {
    "data-analytics": "Data Analytics",
    "business-intelligence": "Business Intelligence",
    "ai-emerging": "AI & Emerging Technology",
    "digital-creative": "Digital & Creative Skills"
  };
  const selectedPathway = new URLSearchParams(window.location.search).get("pathway");
  const selectedPathwayName = coursePathways[selectedPathway];
  const courseListTitle = document.getElementById("courseListTitle");
  const coursePathwaySummary = document.getElementById("coursePathwaySummary");
  const coursePathwayName = document.getElementById("coursePathwayName");
  if (selectedPathwayName) {
    if (courseListTitle) {
      courseListTitle.textContent = `${selectedPathwayName} Courses`;
    }
    if (coursePathwaySummary && coursePathwayName) {
      coursePathwayName.textContent = selectedPathwayName;
      coursePathwaySummary.hidden = false;
    }
  }

  const matchesSelectedPathway = card => !selectedPathwayName
    || card.dataset.pathways?.split(/\s+/).includes(selectedPathway);

  const courseLearningDetails = {
    "Business & Financial Analytics for SMEs": {
      outline: [
        "1. SME Financial & Operational Foundations: revenue, gross margin, operating expenses, working capital, and key KPIs.",
        "2. Preparing M-Pesa & Point-of-Sale Data: exports, cleaning, date and amount standardization, and transaction reconciliation.",
        "3. Cash-Flow Tracking & Liquidity Management: inflows, outflows, cash bottlenecks, and rolling weekly/monthly trackers.",
        "4. Sales, Product & Customer Profitability: top products/services, repeat customers, seasonality, and discount leakage.",
        "5. Budgeting & Simple Forecasting: revenue and expense budgets, budget-versus-actual analysis, and scenarios.",
        "6. Executive Reporting & Decision Briefs: summary dashboards and clear action steps for business owners.",
        "Capstone: end-to-end SME sales, cash-flow and M-Pesa reconciliation dashboard."
      ],
      impact: "Help SME owners and teams turn sales and financial records into clear decisions."
    },
    "Data Visualization & Storytelling": {
      outline: [
        "1. Principles of Effective Visual Design: chart selection, color hierarchy, decluttering, and responsive layouts.",
        "2. Data Modeling & Clean Relationships: fact and dimension tables, date tables, and aggregation traps.",
        "3. Calculated Metrics & Interactive Logic: KPIs, period comparisons, top-N rankings, and dynamic filters.",
        "4. Designing Executive & Operational Dashboards: KPI hierarchy, layout, and drill-through detail.",
        "5. Data Storytelling & Narrative Structure: business questions, insight framing, anomalies, and honest visuals.",
        "6. Publishing, Sharing & Stakeholder Walkthroughs: secure sharing, feedback, and clear recommendations.",
        "Capstone: executive business performance dashboard and 3-minute data-story presentation."
      ],
      impact: "Convert technical analysis into concise explanations and recommendations leaders can act on."
    },
    "Data Automation & ETL Basics": {
      outline: [
        "1. Why Automate Manual Reporting: copy-paste risks, version control, and reliable ETL workflows.",
        "2. Extracting Data from Multiple Sources: CSV, Excel, spreadsheets, databases, and web exports.",
        "3. Automated Cleaning & Transformation: text and date standardization, splitting, unpivoting, and duplicates.",
        "4. Scheduled Refreshes & Workflow Pipelines: repeatable refresh steps and separation of raw and final data.",
        "5. Error Handling & Data Validation: broken schemas, unexpected nulls, and out-of-range values.",
        "6. Documentation & Handover: naming conventions, workflow diagrams, and maintenance checklists.",
        "Capstone: automated multi-source weekly report pipeline."
      ],
      impact: "Reduce manual copying and refreshing while making recurring reports more reliable."
    },
    "Applied AI & Workflow Automation": {
      outline: [
        "1. Practical AI Fundamentals for Work: strengths, drafting and summarizing, and hallucination or logic risks.",
        "2. Prompting for Precision & Consistency: roles, context, constraints, examples, and output formats.",
        "3. Research, Summarization & Document Workflows: meeting notes, reports, policies, emails, and action items.",
        "4. No-Code Workflow Automation Basics: triggers and actions across forms, spreadsheets, email, docs, and notifications.",
        "5. Human-in-the-Loop Quality Control: fact-checking, tone, review, and non-negotiable human judgment.",
        "6. Privacy, Security & Data Protection: confidential data, Kenya Data Protection Act principles, and safe team norms.",
        "Capstone: personal or team productivity playbook and automated daily/weekly workflow."
      ],
      impact: "Help professionals save time with AI without bypassing accuracy, privacy, or governance requirements."
    },
    "Advanced Package: Excel and Power BI": {
      outline: [
        "1. Advanced Excel formulas, functions, tables, and analysis tools.",
        "2. Power Query for cleaning, combining, and refreshing data.",
        "3. Excel data models and Power Pivot concepts.",
        "4. Power BI Desktop setup and data connections.",
        "5. Data modeling, relationships, and star-schema design.",
        "6. DAX measures for KPIs and comparisons.",
        "7. Interactive reports, filters, and dashboard design.",
        "8. Publishing, sharing, and refresh workflows.",
        "9. Executive-ready end-to-end project."
      ],
      impact: "Turn spreadsheet and operational data into reliable analysis and decision-ready dashboards."
    },
    "Data Analysis with AI": {
      outline: [
        "1. AI and data analysis fundamentals.",
        "2. Preparing and exploring datasets.",
        "3. Prompting AI for analysis and explanation.",
        "4. Cleaning and summarizing data with AI assistance.",
        "5. Spotting patterns and validating insights.",
        "6. Creating charts and report narratives.",
        "7. Automating repetitive analytical workflows.",
        "8. Accuracy, privacy, bias, and responsible-use checks.",
        "9. Applied data-analysis project."
      ],
      impact: "Accelerate routine analysis while maintaining verification, transparency, and human judgment."
    },
    "Apps Script": {
      outline: [
        "1. JavaScript fundamentals for Apps Script.",
        "2. Automating Google Sheets and custom menus.",
        "3. Reading, writing, and transforming spreadsheet data.",
        "4. Working with Google Forms and Drive.",
        "5. Sending Gmail and document notifications.",
        "6. Connecting Google Workspace services.",
        "7. Handling triggers and scheduled workflows.",
        "8. Debugging and deployment.",
        "9. End-to-end workflow automation project."
      ],
      impact: "Replace repetitive Google Workspace tasks with reusable, time-saving automation."
    },
    "SQL and Power BI": {
      outline: [
        "1. SQL fundamentals and relational database concepts.",
        "2. Filtering, grouping, joins, CTEs, and subqueries.",
        "3. SQL queries for reusable business datasets.",
        "4. Connecting SQL outputs to Power BI.",
        "5. Power Query and data preparation.",
        "6. Relationships and data modeling.",
        "7. DAX measures and calculation patterns.",
        "8. Interactive reports and dashboard design.",
        "9. End-to-end SQL and Power BI project."
      ],
      impact: "Build a complete pipeline from database extraction to business dashboards and reporting."
    },
    "Excel For Data Analysis": {
      outline: [
        "1. Introduction to Excel for Data Analysis: analytics workflows, interface, workbooks, and navigation.",
        "2. Excel Fundamentals: workbook management, cell references, data entry, formulas, and tables.",
        "3. Sorting, Filtering, and Tables: organize datasets and apply structured formatting.",
        "4. Data Preparation and Cleaning: handle missing, duplicate, and inconsistent values.",
        "5. Core Functions: arithmetic, statistical, aggregate functions, and named ranges.",
        "6. Logical Functions: IF, SWITCH, nested logic, COUNTIF, SUMIF, and related functions.",
        "7. Data Transformation and Lookups: VLOOKUP, XLOOKUP, INDEX, and MATCH.",
        "8. Data Visualization: charts, trends, dashboards, and data storytelling.",
        "9. Pivot Tables: summarize data, use calculated fields, slicers, and interactive reports.",
        "10. Data Validation and Control: input rules, error reduction, and data integrity.",
        "11. Power Query: ETL, data cleaning, reshaping, and combining datasets.",
        "12. Power Pivot and Data Modeling: relationships, DAX, measures, and dashboards.",
        "13. Real-World Application: acquire, clean, transform, and report on data."
      ],
      impact: "Support faster recurring reports and more confident decisions with structured spreadsheet analysis."
    },
    "Google Sheets For Data Analysis": {
      outline: [
        "1. Google Sheets Fundamentals.",
        "2. Data Cleaning and Preparation.",
        "3. Formulas and Functions.",
        "4. Data Validation and Data Management.",
        "5. Pivot Tables and Data Summarization.",
        "6. Data Analysis and Insights.",
        "7. Charts and Data Visualization.",
        "8. Dashboards and Reporting.",
        "9. Automation with Google Sheets.",
        "10. Real-World Data Analysis Project."
      ],
      impact: "Help teams collaborate on current data and reduce manual handoffs between reports."
    },
    "Power BI Mastery": {
      outline: [
        "1. Introduction to Data Analytics: BI concepts, the Power BI ecosystem, and analytics workflows.",
        "2. Data Acquisition and Preparation: connect to sources and understand storage modes.",
        "3. Data Transformation with Power Query: clean, merge, split, and reshape data.",
        "4. Data Modeling: fact and dimension tables, schemas, relationships, and date tables.",
        "5. DAX Fundamentals and Advanced Calculations: columns, measures, functions, and KPIs.",
        "6. Visualizing and Analyzing Data: report design, visualizations, and interactive features.",
        "7. Advanced Analytics: trends, forecasting, decomposition trees, and scenario analysis.",
        "8. Publishing and Sharing Reports: workspaces, dashboards, apps, and collaboration.",
        "9. Managing and Securing Power BI: refresh, gateways, security, and data governance.",
        "10. Practical Projects: sales, HR, financial, and executive performance dashboards."
      ],
      impact: "Turn operational data into clear reports that teams can use to monitor performance."
    },
    "AI-Powered Digital Marketing & Analytics": {
      outline: [
        "1. Audience Research & Positioning: personas, pain points, local messaging, and value propositions.",
        "2. AI-Assisted Content & Campaign Production: ad copy, video scripts, landing pages, and social calendars.",
        "3. Campaign Tracking & Funnel Analytics: impressions, reach, CTR, CPC, CPA, conversions, and attribution.",
        "4. Testing, Optimization & Creative Iteration: structured A/B tests and cutting underperforming spend.",
        "5. Social & Web Performance Reporting: weekly and monthly scorecards tied to leads or sales.",
        "6. Ethics, Authenticity & Compliance: honest claims, disclosures, spam avoidance, and customer trust.",
        "Capstone: full-funnel campaign plan, AI content kit, and performance tracking dashboard."
      ],
      impact: "Help marketers create better campaigns and prove their impact with data rather than activity alone."
    },
    "UI/UX Design Masterclass": {
      outline: [
        "1. UI/UX Fundamentals.",
        "2. User Research and Personas.",
        "3. User Journeys and Information Architecture.",
        "4. Wireframing and Prototyping.",
        "5. UI Design and Visual Principles.",
        "6. Figma and Design Systems.",
        "7. Responsive and Mobile Design.",
        "8. Usability Testing.",
        "9. Design Handoff and Collaboration.",
        "10. Real-World UI/UX Project."
      ],
      impact: "Apply user-centered design methods to make digital experiences easier to understand and use."
    },
    "Python For Data Science": {
      outline: [
        "1. Python Fundamentals.",
        "2. NumPy for Data Analysis.",
        "3. Pandas for Data Manipulation.",
        "4. Data Cleaning and Preparation.",
        "5. Exploratory Data Analysis (EDA).",
        "6. Data Visualization with Matplotlib and Seaborn.",
        "7. Working with Excel, CSV, SQL, and APIs.",
        "8. Real-World Data Analysis Project."
      ],
      impact: "Build repeatable analysis skills for data, reporting, and entry-level data science tasks."
    },
    "Data Literacy": {
      outline: [
        "1. Data Literacy Fundamentals.",
        "2. Data Types and Data Sources.",
        "3. Data Collection and Quality.",
        "4. Data Cleaning and Preparation.",
        "5. Descriptive Statistics.",
        "6. Data Interpretation and Analysis.",
        "7. Data Visualization and Storytelling.",
        "8. Critical Thinking with Data.",
        "9. Data-Driven Decision Making.",
        "10. Data Ethics, Privacy, and Security."
      ],
      impact: "Help non-technical teams interpret evidence and ask better questions before making decisions."
    },
    "SQL For Data Analysis": {
      outline: [
        "1. SQL Fundamentals: database basics, SELECT, WHERE, ORDER BY, and LIMIT.",
        "2. Filtering and Aggregation: AND/OR, GROUP BY, HAVING, COUNT, SUM, AVG, MIN, and MAX.",
        "3. Joins and Relationships: INNER, LEFT, RIGHT joins, and multi-table analysis.",
        "4. Subqueries and CTEs: nested queries, CTEs, and reusable analysis logic.",
        "5. Data Cleaning with SQL: NULLs, duplicates, CASE, and text/date transformations.",
        "6. Advanced Analytics: window functions, ranking, running totals, and comparisons.",
        "7. Business Analysis with SQL: KPIs, customer, sales, revenue, and performance analysis.",
        "8. SQL Reporting and Optimization: views, query optimization, and analytical reporting.",
        "9. Capstone Project: analyze a dataset and produce actionable business insights."
      ],
      impact: "Retrieve and summarize data directly from relational databases for reporting and analysis."
    },
    "Tableau": {
      outline: [
        "1. Introduction to Tableau: interface, ecosystem, dimensions, measures, and basic visualizations.",
        "2. Data Connection and Preparation: Excel/CSV sources, relationships, joins, unions, and cleaning.",
        "3. Data Visualization Fundamentals: charts, tables, maps, formatting, and visual communication.",
        "4. Filters and Interactivity: groups, sets, hierarchies, sorting, and drill-down analysis.",
        "5. Calculations and Analytics: calculated fields, date calculations, ratios, and table calculations.",
        "6. Advanced Tableau Analytics: LOD expressions, ranking, running totals, and moving averages.",
        "7. Parameters and Interactive Analysis: dynamic calculations, what-if analysis, and dashboard actions.",
        "8. Dashboard Design and Storytelling: KPI cards, layouts, navigation, tooltips, and dashboard UX.",
        "9. Business Intelligence with Tableau: sales, customer, HR, marketing, and financial scenarios.",
        "10. Capstone Portfolio Project: build an executive dashboard from data through business insight."
      ],
      impact: "Communicate patterns and comparisons through interactive visual analytics."
    },
    "Machine Learning": {
      outline: [
        "1. Machine Learning Fundamentals.",
        "2. Data Preprocessing & Feature Engineering.",
        "3. Exploratory Data Analysis for ML.",
        "4. Supervised Learning.",
        "5. Unsupervised Learning.",
        "6. Model Evaluation & Validation.",
        "7. Feature Selection & Optimization.",
        "8. Ensemble Learning.",
        "9. Model Deployment & MLOps.",
        "10. End-to-End Machine Learning Project."
      ],
      impact: "Build a foundation for evaluating predictive use cases and contributing to analytics projects."
    },
    "Data Quality": {
      outline: [
        "1. Data Quality Fundamentals.",
        "2. Data Profiling & Validation.",
        "3. Data Cleaning & Error Management.",
        "4. Data Quality Monitoring & Reporting.",
        "5. Data Governance & Stewardship.",
        "6. Practical Data Quality Project."
      ],
      impact: "Improve trust in reports by catching incomplete, inconsistent, or inaccurate data earlier."
    },
    "AI For Business": {
      outline: [
        "1. AI Fundamentals for Business.",
        "2. Generative AI and Large Language Models.",
        "3. AI-Powered Productivity and Automation.",
        "4. AI for Marketing and Customer Experience.",
        "5. AI for Data Analysis and Business Intelligence.",
        "6. AI for Business Strategy and Decision-Making.",
        "7. AI Tools and Workflow Integration.",
        "8. AI Ethics, Privacy, and Responsible Use.",
        "9. AI Implementation and ROI.",
        "10. Practical AI Business Project."
      ],
      impact: "Help decision-makers assess where AI may support work without overlooking governance and risk."
    },
    "AI For Professionals": {
      outline: [
        "1. AI Fundamentals and Workplace Applications.",
        "2. Generative AI and Prompt Engineering.",
        "3. AI-Powered Research and Information Management.",
        "4. AI for Productivity and Task Automation.",
        "5. AI for Data Analysis and Reporting.",
        "6. AI for Content Creation and Communication.",
        "7. AI Tools for Professional Workflows.",
        "8. AI Ethics, Privacy, and Responsible Use.",
        "9. Building AI-Powered Workflows.",
        "10. Practical AI Productivity Project."
      ],
      impact: "Apply AI to routine work while checking accuracy, privacy, and appropriate human review."
    },
    "Microsoft Copilot": {
      outline: [
        "1. Microsoft Copilot Fundamentals.",
        "2. Prompt Engineering for Copilot.",
        "3. Copilot in Word.",
        "4. Copilot in Excel.",
        "5. Copilot in PowerPoint.",
        "6. Copilot in Outlook and Teams.",
        "7. Copilot for Data Analysis and Insights.",
        "8. Copilot for Research and Content Creation.",
        "9. Copilot Automation and Workflow Optimization.",
        "10. Practical Microsoft Copilot Project."
      ],
      impact: "Use AI assistance to reduce repetitive work while keeping people responsible for the final result."
    },
    "Microsoft 365 Advanced": {
      outline: [
        "1. Microsoft 365 Ecosystem and Advanced Features.",
        "2. Advanced Word and Document Management.",
        "3. Advanced Excel and Data Analysis.",
        "4. Advanced PowerPoint and Presentation Design.",
        "5. Outlook and Advanced Email Management.",
        "6. Microsoft Teams and Collaboration.",
        "7. SharePoint and Document Management.",
        "8. OneDrive and Cloud Productivity.",
        "9. Power Automate and Workflow Automation.",
        "10. Integrated Microsoft 365 Project."
      ],
      impact: "Improve collaboration and consistency across common workplace documents and processes."
    },
    "Canva Graphic Design": {
      outline: ["Layout, typography, and color", "Templates and brand consistency", "Social media and presentation design"],
      impact: "Produce consistent visual communication for small businesses, teams, or personal brands."
    },
    "Adobe Photoshop": {
      outline: ["Image editing and retouching", "Compositing and typography", "Export assets for digital use"],
      impact: "Prepare professional image assets for marketing and digital communication."
    },
    "Adobe Illustrator": {
      outline: ["Vector drawing and shape tools", "Logo, icon, and illustration design", "Typography and scalable layouts"],
      impact: "Create scalable brand and marketing graphics that remain crisp across sizes."
    },
    "Digital & Data Security Essentials for Teams": {
      outline: [
        "1. Today's Threat Landscape: phishing, social engineering, fake invoices, malware, and credential stuffing.",
        "2. Account, Password & Device Hygiene: passphrases, password managers, MFA, updates, and device security.",
        "3. Protecting Customer, Financial & Business Data: permissions, safe links, backups, and data-protection duties.",
        "4. Safe Cloud, Remote Work & AI Usage: public networks, third-party apps, browser extensions, and AI data leaks.",
        "5. Spotting & Responding to Incidents: compromise warnings, containment, credential resets, escalation, and culture.",
        "Capstone: team security checklist and incident-response quick guide."
      ],
      impact: "Give teams practical habits to reduce account compromise and protect customer and business records."
    },
    "Vibe Coding for Kids": {
      outline: ["Explore coding ideas and clear prompts", "Build small interactive digital projects", "Test, debug, and improve creations"],
      impact: "Encourage digital confidence, creative problem-solving, and computational thinking."
    },
    "Vibe Coding for Adults": {
      outline: ["Turn a problem into a project brief", "Use AI-assisted prompts and coding foundations", "Prototype, test, and refine a digital idea"],
      impact: "Help learners explore and communicate digital ideas through hands-on prototyping."
    }
  };

  courseCards.forEach((card, index) => {
    const heading = card.querySelector(".course-details h3");
    const courseTitle = heading?.textContent.trim();
    const courseDescription = card.querySelector(".course-description")?.textContent.trim() || "Course overview not provided.";
    const featureLabels = Array.from(card.querySelectorAll(".course-features .feature"), feature => feature.textContent.replace(/^✓\s*/, "").trim());
    const moduleCount = featureLabels.find(feature => /modules?/i.test(feature)) || "Module count not listed";
    const duration = featureLabels.find(feature => /hours?/i.test(feature)) || "Self-paced; total hours not listed";
    const certificate = featureLabels.some(feature => /certificate/i.test(feature))
      ? "Certificate included"
      : "Certificate details not listed";
    const access = featureLabels.find(feature => /access/i.test(feature)) || "Access details not listed";
    const learningDetails = courseLearningDetails[courseTitle] || {
      outline: ["Course concepts and tools", "Guided practice", "Applied learning"],
      impact: "Build skills relevant to practical work in this subject area."
    };

    if (!heading || !courseTitle) {
      return;
    }

    const detailsId = `course-detail-${index + 1}`;
    const titleButton = document.createElement("button");
    titleButton.className = "course-title-toggle";
    titleButton.type = "button";
    titleButton.setAttribute("aria-expanded", "false");
    titleButton.setAttribute("aria-controls", detailsId);
    const titleText = document.createElement("span");
    titleText.textContent = courseTitle;
    const toggleIcon = document.createElement("i");
    toggleIcon.className = "fa-solid fa-chevron-down";
    toggleIcon.setAttribute("aria-hidden", "true");
    titleButton.append(titleText, toggleIcon);
    heading.replaceChildren(titleButton);

    const detailsPanel = document.createElement("section");
    detailsPanel.className = "course-expanded-details";
    detailsPanel.id = detailsId;
    detailsPanel.hidden = true;

    const overviewHeading = document.createElement("h4");
    overviewHeading.textContent = "Course overview";
    const overviewText = document.createElement("p");
    overviewText.textContent = courseDescription;

    const facts = document.createElement("dl");
    facts.className = "course-detail-facts";
    [["Duration", duration], ["Course structure", moduleCount], ["Certificate", certificate], ["Access", access]].forEach(([label, value]) => {
      const fact = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      fact.append(term, description);
      facts.appendChild(fact);
    });
    const outlineHeading = document.createElement("h4");
    outlineHeading.textContent = "Course outline";
    const outline = document.createElement("ul");
    learningDetails.outline.forEach(topic => {
      const item = document.createElement("li");
      item.textContent = topic;
      outline.appendChild(item);
    });

    const relevanceHeading = document.createElement("h4");
    relevanceHeading.textContent = "Business & career relevance";
    const relevance = document.createElement("p");
    relevance.textContent = learningDetails.impact;

    detailsPanel.append(overviewHeading, overviewText, facts, outlineHeading, outline, relevanceHeading, relevance);
    card.querySelector(".course-footer")?.before(detailsPanel);
    titleButton.addEventListener("click", () => {
      const isExpanded = titleButton.getAttribute("aria-expanded") === "true";
      titleButton.setAttribute("aria-expanded", String(!isExpanded));
      toggleIcon.classList.toggle("fa-chevron-down", isExpanded);
      toggleIcon.classList.toggle("fa-chevron-up", !isExpanded);
      detailsPanel.hidden = isExpanded;
    });
  });

  if (searchInput) {
    const filterCourses = () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 1);
      const scoredCards = Array.from(courseCards).map((card, index) => {
        const searchableText = Array.from(card.querySelectorAll(
          ".course-details h3, .course-subtitle, .course-features, .course-description"
        ), field => field.textContent.toLowerCase()).join(" ");
        const score = searchWords.reduce((total, word) => {
          return total + (searchableText.includes(word) ? 1 : 0);
        }, 0);

        return { card, index, score };
      });

      if (!searchTerm) {
        scoredCards.forEach(({ card }) => {
          card.style.display = matchesSelectedPathway(card) ? "" : "none";
        });
        if (courseSearchMessage) {
          courseSearchMessage.style.display = "none";
          courseSearchMessage.textContent = "";
        }
        return;
      }

      const matchingCards = scoredCards
        .filter(({ card, score }) => score === searchWords.length && matchesSelectedPathway(card))
        .sort((a, b) => b.score - a.score || a.index - b.index);
      const cardsToShow = matchingCards.length > 0
        ? matchingCards
        : scoredCards.filter(({ card }) => matchesSelectedPathway(card)
          && card.classList.contains("course-card-request") === false).slice(0, 3);

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
    };

    searchInput.addEventListener("input", filterCourses);
    filterCourses();
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

});

