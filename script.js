/*==================================================
MEDI HEALTH
SCRIPT.JS - PART 1
==================================================*/

"use strict";

/*=========================================
SELECTORS
=========================================*/

const header = document.querySelector(".header");
const topBtn = document.getElementById("topBtn");
const navLinks = document.querySelectorAll(".navbar a");

/*=========================================
STICKY HEADER
=========================================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.padding = "0";
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.10)";
        header.style.background = "rgba(255,255,255,.97)";

    }else{

        header.style.boxShadow = "0 5px 18px rgba(0,0,0,.05)";
        header.style.background = "rgba(255,255,255,.95)";

    }

});

/*=========================================
BACK TO TOP BUTTON
=========================================*/

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 400){

        topBtn.style.display = "flex";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================
SMOOTH SCROLL
=========================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            window.scrollTo({

                top:target.offsetTop-80,

                behavior:"smooth"

            });

        }

    });

});

/*=========================================
ACTIVE NAVIGATION
=========================================*/

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.clientHeight;

        if(window.scrollY>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/*=========================================
MOBILE MENU
(Add hamburger button later)
=========================================*/

const menuBtn=document.querySelector(".menu-toggle");
const navbar=document.querySelector(".navbar");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navbar.classList.toggle("show");

        menuBtn.classList.toggle("active");

    });

}

/*=========================================
CLOSE MENU AFTER CLICK
=========================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        if(navbar){

            navbar.classList.remove("show");

        }

        if(menuBtn){

            menuBtn.classList.remove("active");

        }

    });

});

/*=========================================
HEADER FADE-IN
=========================================*/

window.addEventListener("load",()=>{

    header.style.opacity="0";

    header.style.transition="opacity .8s ease";

    setTimeout(()=>{

        header.style.opacity="1";

    },150);

});

/*=========================================
END OF PART 1
=========================================*/

/*==================================================
SCRIPT.JS - PART 2
PACKAGE + FAQ + BOOKING
==================================================*/

/*=========================================
PACKAGE DESCRIPTION TOGGLE
=========================================*/

function toggleDescription(id){

    const current=document.getElementById(id);

    const all=document.querySelectorAll(".description");

    all.forEach(box=>{

        if(box!==current){

            box.classList.remove("active");

            box.style.display="none";

        }

    });

    if(current.style.display==="block"){

        current.style.display="none";
        current.classList.remove("active");

    }else{

        current.style.display="block";
        current.classList.add("active");

    }

}

/*=========================================
FAQ ACCORDION
=========================================*/

const faqItems=document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question=item.querySelector(".faq-question");

    question.addEventListener("click",()=>{

        faqItems.forEach(other=>{

            if(other!==item){

                other.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/*=========================================
BOOKING FORM
=========================================*/

const bookingForm=document.getElementById("bookingForm");

if(bookingForm){

bookingForm.addEventListener("submit",function(e){

e.preventDefault();

const name=this.querySelector('input[type="text"]');
const mobile=this.querySelector('input[type="tel"]');
const city=this.querySelectorAll('input[type="text"]')[1];
const location=this.querySelectorAll('input[type="text"]')[2];
const packageSelect=this.querySelector("select");

if(name.value.trim().length<3){

alert("Please enter your full name.");

name.focus();

return;

}

if(!/^[6-9]\d{9}$/.test(mobile.value.trim())){

alert("Please enter a valid 10-digit mobile number.");

mobile.focus();

return;

}

if(city.value.trim()===""){

alert("Please enter your city.");

city.focus();

return;

}

if(location.value.trim()===""){

alert("Please enter your location.");

location.focus();

return;

}

if(packageSelect.selectedIndex===0){

alert("Please select a health package.");

packageSelect.focus();

return;

}

showSuccessMessage();

this.reset();

});

}

/*=========================================
SUCCESS POPUP
=========================================*/

function showSuccessMessage(){

let popup=document.createElement("div");

popup.className="booking-success";

popup.innerHTML=`

<div class="success-box">

<h2>✅ Booking Submitted</h2>

<p>

Thank you for choosing <strong>Medi Health</strong>.

<br><br>

Our team will contact you shortly to confirm your appointment.

</p>

<button id="closeSuccess">

OK

</button>

</div>

`;

document.body.appendChild(popup);

document.getElementById("closeSuccess").onclick=()=>{

popup.remove();

};

setTimeout(()=>{

if(document.body.contains(popup)){

popup.remove();

}

},5000);

}

/*=========================================
END OF PART 2
=========================================*/

/*==================================================
SCRIPT.JS - PART 3
ANIMATIONS + COUNTERS + PERFORMANCE
==================================================*/

/*=========================================
SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(
".hero,.about,.stats,.packages,.why-us,.how-it-works,.booking,.testimonials,.faq,.contact,footer"
);

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

revealElements.forEach(section=>{

section.classList.add("fade-up");

revealObserver.observe(section);

});

/*=========================================
COUNTER ANIMATION
=========================================*/

const counters=document.querySelectorAll(".stat-card h2");

const counterObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter=entry.target;

const text=counter.innerText;

const number=parseInt(text.replace(/\D/g,""));

const suffix=text.replace(/[0-9]/g,"");

let count=0;

const speed=Math.max(20,number/80);

const update=()=>{

count+=speed;

if(count<number){

counter.innerText=Math.floor(count)+suffix;

requestAnimationFrame(update);

}else{

counter.innerText=text;

}

};

update();

counterObserver.unobserve(counter);

});

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/*=========================================
LAZY LOAD IMAGES
=========================================*/

const images=document.querySelectorAll("img");

images.forEach(img=>{

img.loading="lazy";

});

/*=========================================
REMOVE LOADER
=========================================*/

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.style.opacity="0";

loader.style.transition=".5s";

setTimeout(()=>{

loader.remove();

},500);

}

});

/*=========================================
CURRENT YEAR
=========================================*/

const footerParagraph=document.querySelector("footer p:last-child");

if(footerParagraph){

footerParagraph.innerHTML=
`© ${new Date().getFullYear()} Medi Health. All Rights Reserved.`;

}

/*=========================================
DISABLE RIGHT CLICK (OPTIONAL)
=========================================*/

// document.addEventListener("contextmenu",e=>e.preventDefault());

/*=========================================
PRELOAD IMAGES
=========================================*/

window.addEventListener("load",()=>{

document.querySelectorAll("img").forEach(img=>{

const preload=new Image();

preload.src=img.src;

});

});

/*=========================================
CONSOLE MESSAGE
=========================================*/

console.log(
"%cMedi Health Diagnostics",
"color:#0077ff;font-size:20px;font-weight:bold;"
);

console.log(
"%cWebsite Developed Successfully",
"color:#0abf53;font-size:14px;"
);

/*=========================================
END OF SCRIPT
=========================================*/
