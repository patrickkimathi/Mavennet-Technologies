# Mavennet Technologies Portfolio

A responsive portfolio and digital services website for Mavennet Technologies. The site showcases data analytics, digital skills training, graphics design, projects, leadership, certifications, and blog content.

## Features

- Responsive navigation across portfolio pages
- Home, About, Projects, Skills, Certifications, Resume, Leadership, Contact, Graphics, Training, and Blog pages
- Digital Skills Training course catalogue with search and sorting
- Local Excel and SQL course visuals
- Center-aligned hero sections and training content
- Social media footer links with platform icons and brand colors
- Browser-based blog post editor using `localStorage`
- Restored starter blog articles with expandable content
- Email-gated blog comments with local browser persistence
- Optional silent Facebook post import through `/api/facebook-posts`
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
├── blog.html
├── certifications.html
├── contact.html
├── documentation.md
├── graphics.html
├── index.html
├── leadership.html
├── projects.html
├── resume.html
├── skills.html
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

## Blog Usage

The Blog page includes a browser-based post editor. Posts created through the editor are stored in the browser under `mavennetBlogPosts`; they are not automatically shared with other visitors or deployed to the repository.

Comments require a syntactically valid email address before the comment fields are enabled. The current static implementation stores the signed-in email and comments in the browser. This is suitable for a prototype only. Real email verification, authentication, moderation, and multi-user comments require a backend service and database.

## Secure Facebook Import

The blog frontend silently requests imported posts from:

```text
/api/facebook-posts
```

A server-side endpoint must make the Facebook Graph API request and return sanitized JSON in this format:

```json
[
  {
    "id": "facebook-post-id",
    "title": "Post title",
    "category": "Facebook",
    "date": "2026-08-19",
    "excerpt": "Short summary",
    "content": "Sanitized post content"
  }
]
```

Store the Facebook Page Access Token in a server environment variable. Never place it in HTML, `js/script.js`, public configuration, or client-side storage. If the endpoint is unavailable, the blog continues showing local posts.

GitHub Pages serves static files only, so `/api/facebook-posts` and verified comments require a separate backend or serverless function, such as a protected function on a hosting provider.

## Deployment

The project can be deployed to GitHub Pages:

1. Push the repository to GitHub.
2. Open **Settings > Pages**.
3. Select the deployment branch and root folder.
4. Save the configuration.

The static frontend will work on GitHub Pages. Secure Facebook imports and real authenticated comments require a separate backend endpoint.

## Maintenance

- Keep image paths relative to the project root.
- Keep social links and navigation labels synchronized across pages.
- Do not commit access tokens, passwords, or other secrets.
- Test the site at desktop and mobile widths after layout changes.
