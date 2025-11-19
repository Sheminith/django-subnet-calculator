<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="./images/subcal_logo_white.svg" alt="Logo" width="200" height="200">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <!-- . -->
    <li><a href="#about-the-project">About The Project</a></li>
    <!-- . -->
    <li><a href="#features">Features</a></li>
      <!-- . -->
    <li><a href="#built-with">Built With</a></li>
    <!-- . -->
    <li><a href="#setup--installation">Setup & Installation</a></li>
    <!-- . -->
    <li><a href="#future-improvements">Future Improvements</a></li>
    <!-- . -->
    <li><a href="#license">License</a></li>
    <!-- . -->
    <li><a href="#author">Author</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Subcal was created as a personal learning project during my first year as an AI undergraduate student at the Asia Pacific Institute of Information Technology (APIIT). When we were introduced to the Networking module, subnetting initially felt challenging, even though I usually learn concepts fast. To become better, I watched tutorials, practiced manually, and slowly the concept clicked. During practical sessions, we repeatedly calculated subnets by hand, and that sparked an idea,

> “Why not build a tool that does this instantly?”

So I first wrote the logic in pure Python, then integrated it into Django to create a full web application. I designed the UI using "Figma", and implemented it using clean "HTML, CSS", and "JavaScript". This is how Subcal was built!

---

## Features

* 🔢 Instant Subnet Calculation based on a parent network IP
* ⚡ One-click generation
* 🎨 Clean, modern UI
* 📱 Responsive design (mobile + tablet + desktop)

---

### Built With

* [![Django][Django]][Django-url]
* [![HTML5][HTML5]][HTML5-url]
* [![CSS3][CSS3]][CSS3-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![Figma][Figma]][Figma-url]

---

## Setup & Installation

1. Clone the Repository

```bash
git clone https://github.com/yourusername/subcal.git
cd subcal
```

2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows
```

3. Install Dependencies

```bash
pip install -r requirements.txt
```
4. Run the Server

```bash
python manage.py runserver
```

---

## Future Improvements

* Add VLSM Calculations
* User authentication and storing user calculations in database

---

## License

This project is open-source under the **MIT License**.

---

## Author

**Michele Sheminith**
<br>
AI Undergraduate – APIIT
<br>
*“If Elon did it, so can you.”*

---

<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: images/screenshot.png

<!-- Badges -->
[Django]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://www.djangoproject.com/

[HTML5]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[CSS3]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[Figma]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white
[Figma-url]: https://www.figma.com/

