# Mavennet Technologies Portfolio

A responsive portfolio and digital services website for Mavennet Technologies. The site showcases data analytics, digital skills training, graphics design, projects, leadership, and certifications.

## Features

- Responsive navigation across portfolio pages
- Home page with an integrated About section, plus Digital Academy, Services, and Contact pages
- Legacy `about.html` URL redirects to the integrated About section on the home page
- Digital Skills Training course catalogue with search and sorting
- Local Excel and SQL course visuals
- Center-aligned hero sections and training content
- Social media footer links with platform icons and brand colors
- Responsive layouts for desktop, tablet, and mobile screens

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome brand icons via CDN
- GitHub Pages-compatible static frontend

## Project Structure

```text
.
├── 404.html
├── about.html
├── contact.html
├── documentation.md
├── e-citizen-services.html
├── index.html
├── robots.txt
├── sitemap.xml
├── training-services.html
├── css/
│   └── style.css
├── images/
└── js/
    └── script.js
```

## Run Locally

Because this project is a static website, it can be opened directly in a browser. For a more reliable local experience, serve the folder with a local web server:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Retired Blog

The Blog page has been removed from the repository and site navigation.

## SEO

Canonical URLs, robots.txt, and sitemap.xml use the GitHub Pages project URL `https://patrickkimathi.github.io/Mavennet-Technologies/`. Update these URLs if the site is moved to a custom domain or another hosting path.

## Deployment

The project can be deployed to GitHub Pages:

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Select the deployment branch and root folder.
4. Save the configuration.

The static frontend is compatible with GitHub Pages.

## Maintenance

- Keep image paths relative to the project root.
- Keep social links and navigation labels synchronized across pages.
- Do not commit access tokens, passwords, or other secrets.
- Test the site at desktop and mobile widths after layout changes.
