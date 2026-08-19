
# 📘 Project Documentation: Personal Portfolio Website  

## 1. Overview  
This is a **personal portfolio website** designed and developed by and for  **Patrick Kariuki**, a **Data Analyst and Web Developer**.  
The portfolio serves as a digital resume, showcasing professional skills, certifications, projects, and achievements in a visually appealing and responsive manner.  

The project is built using **HTML, CSS, and JavaScript**, and deployed using **GitHub Pages** for free hosting.  

---

## 2. Objectives  
- ✅ Create an **online presence** for professional branding.  
- ✅ Provide a **central hub** to showcase projects, skills, and certifications.  
- ✅ Ensure the site is **responsive**, accessible across desktop, tablet, and mobile devices.  
- ✅ Implement **modern design principles** with animations and transitions.  
- ✅ Enable potential employers, clients, and collaborators to **connect easily** via a contact form.  

---

## 3. Features  
- **Home Page** – Hero section with animated background, introduction, and highlights.  
- **About Page** – Personal story, career journey, and professional summary.  
- **Projects Page** – Portfolio of completed and ongoing projects with descriptions.  
- **Skills Page** – Technical and analytical skills presented in **card-based design**.  
- **Certifications Page** – Display of completed certifications such as:  
  - OCI Gen AI  
  - Google Data Analytics Professional Certificate  
  - Google Cybersecurity Professional Certificate  
  - Google Business Intelligence Professional Certificate  
  - Google Project Management Certificate  
  - Cisco CyberOps  
- **Contact Page** – Contact form with input validation (JS) for collecting inquiries.  
- **Blog Page** – Write posts in the browser, save them locally, and display sanitized posts returned by a secure `/api/facebook-posts` endpoint.  
- **Responsive Navigation Bar** – Dropdown menu for small screens with hamburger toggle.  
- **Animations & Transitions** – Motion background, smooth hover effects, and fade-in sections.  

---

## 4. Technologies Used  
### Frontend  
- **HTML5** – Structure and semantic markup.  
- **CSS3** – Styling, animations, responsive layout (media queries, flexbox, grid).  
- **JavaScript (ES6+)** – DOM manipulation, form validation, navbar toggle, animations.  

### Tools & Platforms  
- **Git & GitHub** – Version control and repository hosting.  
- **GitHub Pages** – Free deployment platform.  
- **VS Code** – Code editor for development.  

---

## 5. Project Structure  
```bash
portfolio-website/
│
├── index.html            # Home Page
├── about.html            # About Me
├── projects.html         # Projects
├── skills.html           # Skills
├── certifications.html   # Certifications & Courses
├── contact.html          # Contact Page
│
├── css/
│   └── style.css         # Stylesheet
│
├── js/
│   └── script.js         # JavaScript functionality
│
├── images/               # Profile and project images
│
├── README.md             # Project summary
└── DOCUMENTATION.md      # Detailed project documentation (this file)
```

---

## 6. Installation & Setup  

### Option 1 – Run Locally  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```
2. Open `index.html` in your browser.  

### Secure Facebook Blog Import
The blog requests Facebook posts silently from `/api/facebook-posts`. The endpoint must run on the hosting platform or backend and use a Facebook Page Access Token stored in a server-side environment variable. Never place the token in HTML, `js/script.js`, or any public frontend configuration.

The endpoint should return a JSON array using this shape:

```json
[
  {
    "id": "facebook-post-id",
    "title": "Post title",
    "category": "Facebook",
    "date": "2026-08-19",
    "excerpt": "Short post summary.",
    "content": "Sanitized post content."
  }
]
```

If the endpoint is unavailable, the blog quietly continues showing local and built-in posts.

### Option 2 – Live Deployment  
The website is hosted on **GitHub Pages**:  
```
https://your-username.github.io/portfolio/
```

---

## 7. How to Contribute  
This is a personal portfolio project, but contributions can include:  
- Bug fixes in code.  
- Suggestions for better design or performance improvements.  
- Adding dark/light theme toggle.  

Fork the repo, create a feature branch, and submit a pull request.  

---

## 8. Future Enhancements  
- 🌙 **Dark/Light mode toggle** for accessibility.  
- 📩 **Backend integration** for the contact form (Node.js, Firebase, or Formspree).  
- 🌐 **Multilingual support** (English + Swahili).  
- 📊 **Blog Section** to share insights on Data Analytics and AI.  
- 🔐 **Enhanced Security** with input sanitization and reCAPTCHA for the contact form.  

---

## 9. License  
This project is licensed under the **MIT License** – free to use, modify, and distribute with attribution.  

---

## 10. Author  
👤 **Patrick Kariuki**  
- 💼 Data Analyst | Web Developer  |UI UX Designer

- 📧 Email: patkimathi148@gmail.com 

- 🌍 Portfolio: https://patrickkimathi.github.io/patrickkimathi.github.io-my-portfolio

- 🔗 LinkedIn: https://www.linkedin.com/in/patrick-kariuki-5914b7186/