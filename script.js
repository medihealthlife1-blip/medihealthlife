/*==================================================
  MEDI HEALTH
  SCRIPT.JS
==================================================*/

"use strict";

/*==================================================
  SELECTORS
==================================================*/

const header = document.querySelector(".header");
const topBtn = document.getElementById("topBtn");
const navLinks = document.querySelectorAll(".navbar a");
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-toggle");


/*==================================================
  STICKY HEADER
==================================================*/

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.style.padding = "0";
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.10)";
        header.style.background = "rgba(255,255,255,.97)";

    } else {

        header.style.boxShadow = "0 5px 18px rgba(0,0,0,.05)";
        header.style.background = "rgba(255,255,255,.95)";

    }

});


/*==================================================
  BACK TO TOP
==================================================*/

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});


if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/*==================================================
  SMOOTH SCROLL
==================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);

        if (target) {

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 80,
                behavior: "smooth"

            });

        }

    });

});


/*==================================================
  ACTIVE NAVIGATION
==================================================*/

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/*==================================================
  MOBILE MENU
==================================================*/

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("show");
        menuBtn.classList.toggle("active");

    });

}


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {
            navbar.classList.remove("show");
        }

        if (menuBtn) {
            menuBtn.classList.remove("active");
        }

    });

});


/*==================================================
  HEADER FADE IN
==================================================*/

window.addEventListener("load", () => {

    if (!header) return;

    header.style.opacity = "0";
    header.style.transition = "opacity .8s ease";

    setTimeout(() => {

        header.style.opacity = "1";

    }, 150);

});


/*==================================================
  PACKAGE DESCRIPTION TOGGLE
==================================================*/

function toggleDescription(id) {

    const current = document.getElementById(id);

    if (!current) return;

    const all = document.querySelectorAll(".description");

    all.forEach(box => {

        if (box !== current) {

            box.classList.remove("active");
            box.style.display = "none";

        }

    });

    if (current.style.display === "block") {

        current.style.display = "none";
        current.classList.remove("active");

    } else {

        current.style.display = "block";
        current.classList.add("active");

    }

}


/*==================================================
  FAQ ACCORDION
==================================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {

                other.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});


/*==================================================
  BOOKING FORM
==================================================*/

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (e) {

        e.preventDefault();

        /*------------------------------------------
          GET FORM VALUES
        ------------------------------------------*/

        const inputs = this.querySelectorAll("input");

        const name = inputs[0];
        const email = inputs[1];
        const mobile = inputs[2];
        const date = inputs[3];
        const city = inputs[4];
        const location = inputs[5];

        const packageSelect = this.querySelector("select");
        const messageBox = this.querySelector("textarea");


        /*------------------------------------------
          VALIDATION
        ------------------------------------------*/

        if (!name.value.trim()) {

            alert("Please enter your full name.");
            name.focus();
            return;

        }

        if (name.value.trim().length < 3) {

            alert("Please enter a valid full name.");
            name.focus();
            return;

        }


        if (!mobile.value.trim()) {

            alert("Please enter your mobile number.");
            mobile.focus();
            return;

        }


        if (!/^[6-9][0-9]{9}$/.test(mobile.value.trim())) {

            alert("Please enter a valid 10-digit Indian mobile number.");
            mobile.focus();
            return;

        }


        if (!date.value) {

            alert("Please select your preferred date.");
            date.focus();
            return;

        }


        if (!city.value.trim()) {

            alert("Please enter your city.");
            city.focus();
            return;

        }


        if (!location.value.trim()) {

            alert("Please enter your location.");
            location.focus();
            return;

        }


        if (
            !packageSelect.value ||
            packageSelect.selectedIndex === 0
        ) {

            alert("Please select a health package.");
            packageSelect.focus();
            return;

        }


        /*------------------------------------------
          PREPARE WHATSAPP MESSAGE
        ------------------------------------------*/

        const customerName = name.value.trim();
        const customerEmail = email.value.trim();
        const customerMobile = mobile.value.trim();
        const bookingDate = date.value;
        const customerCity = city.value.trim();
        const customerLocation = location.value.trim();
        const selectedPackage = packageSelect.value;
        const additionalMessage = messageBox
            ? messageBox.value.trim()
            : "";


        const whatsappMessage =
`*Medi Health - New Blood Test Booking*

*Name:* ${customerName}

*Email:* ${customerEmail || "Not provided"}

*Mobile:* ${customerMobile}

*Preferred Date:* ${bookingDate}

*City:* ${customerCity}

*Location:* ${customerLocation}

*Health Package:* ${selectedPackage}

*Additional Message:* ${additionalMessage || "None"}`;


        /*------------------------------------------
          WHATSAPP NUMBER
        ------------------------------------------*/

        const whatsappNumber = "918331961700";

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);


        /*------------------------------------------
          SHOW SUCCESS MESSAGE
        ------------------------------------------*/

        showSuccessMessage();


        /*------------------------------------------
          OPEN WHATSAPP
        ------------------------------------------*/

        setTimeout(() => {

            window.open(whatsappURL, "_blank");

        }, 800);


        /*------------------------------------------
          RESET FORM
        ------------------------------------------*/

        this.reset();

    });

}


/*==================================================
  SUCCESS POPUP
==================================================*/

function showSuccessMessage() {

    const oldPopup = document.querySelector(".booking-success");

    if (oldPopup) {
        oldPopup.remove();
    }


    const popup = document.createElement("div");

    popup.className = "booking-success";

    popup.innerHTML = `
        <div class="success-box">

            <div class="success-icon">
                <i class="fa-solid fa-circle-check"></i>
            </div>

            <h3>Booking Details Ready!</h3>

            <p>
                Your booking details are being sent to
                Medi Health on WhatsApp.
            </p>

            <button id="closeSuccess" type="button">
                OK
            </button>

        </div>
    `;


    document.body.appendChild(popup);


    const closeButton =
        document.getElementById("closeSuccess");


    if (closeButton) {

        closeButton.addEventListener("click", () => {

            popup.remove();

        });

    }


    setTimeout(() => {

        if (document.body.contains(popup)) {

            popup.remove();

        }

    }, 5000);

}


/*==================================================
  SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(
    ".hero, .about, .stats, .packages, .why-us, .how-it-works, .booking, .testimonials, .faq, .contact, footer"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(section => {

        section.classList.add("fade-up");
        revealObserver.observe(section);

    });

}


/*==================================================
  COUNTER ANIMATION
==================================================*/

const counters = document.querySelectorAll(".stat-card h2");


if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const originalText = counter.innerText;

                const numberMatch =
                    originalText.match(/\d+/);

                if (!numberMatch) return;

                const number =
                    parseInt(numberMatch[0], 10);

                const suffix =
                    originalText.replace(/\d+/g, "");

                let count = 0;

                const speed =
                    Math.max(20, number / 80);


                const update = () => {

                    count += speed;

                    if (count < number) {

                        counter.innerText =
                            Math.floor(count) + suffix;

                        requestAnimationFrame(update);

                    } else {

                        counter.innerText =
                            originalText;

                    }

                };


                update();

                counterObserver.unobserve(counter);

            });

        }
    );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/*==================================================
  LAZY LOAD IMAGES
==================================================*/

const images = document.querySelectorAll("img");

images.forEach(img => {

    img.loading = "lazy";

});


/*==================================================
  REMOVE LOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    loader.style.opacity = "0";
    loader.style.transition = ".5s";

    setTimeout(() => {

        loader.remove();

    }, 500);

});


/*==================================================
  CURRENT YEAR
==================================================*/

const footerParagraph =
    document.querySelector("footer p:last-child");

if (footerParagraph) {

    footerParagraph.innerHTML =
        `© ${new Date().getFullYear()} Medi Health. All Rights Reserved.`;

}


/*==================================================
  PRELOAD IMAGES
==================================================*/

window.addEventListener("load", () => {

    document.querySelectorAll("img").forEach(img => {

        const preload = new Image();

        preload.src = img.src;

    });

});


/*==================================================
  CONSOLE MESSAGE
==================================================*/

console.log(
    "%cMedi Health Diagnostics",
    "color:#0077ff;font-size:20px;font-weight:bold;"
);

console.log(
    "%cWebsite Loaded Successfully",
    "color:#0abf53;font-size:14px;"
);
