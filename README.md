# Personal Portfolio

A highly modern, animated, and fully responsive personal portfolio website built with HTML, CSS, JavaScript, and Django.

## Features Added:
- **Glassmorphism Design:** Beautiful glass effect with blurs and gradients.
- **Dark/Light Mode:** Toggle for two carefully designed themes.
- **Animations:** Powered by GSAP and ScrollTrigger. Includes typewriter effect, custom cursor, smooth scrolls, and page reveals.
- **Particles:** Interactive particle background setup (`particles.js`).
- **Contact Form:** Reacts instantly with loader animations, posts data via JSON, and handles responses gracefully.
- **Backend:** A full Django backend setup that will send emails natively via your Gmail SMTP configurations. 

## Requirements:
- Python 3.8+
- Django 4.0+

## How to Run:

1. **Install Requirements:**
   `pip install -r requirements.txt`

2. **Configure your email:**
   Open `portfolio_project/settings.py` and replace `your_email@gmail.com` and `your_app_password` in the `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` settings. You must create an App Password via your Google Account's security settings (with 2FA enabled).

3. **Run Migrations (Optional but recommended for setup):**
   `python manage.py migrate`

4. **Run Server:**
   `python manage.py runserver`

5. **Visit Website:**
   Open http://127.0.0.1:8000 in your browser!
