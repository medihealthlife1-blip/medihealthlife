// ============================
// View Tests Toggle
// ============================

function toggleDescription(id){

const all=document.querySelectorAll(".description");

all.forEach(box=>{

if(box.id!==id){

box.classList.remove("show");

}

});

document.getElementById(id).classList.toggle("show");

}

// ============================
// FAQ Accordion
// ============================

const faqQuestions=document.querySelectorAll(".faq-question");

faqQuestions.forEach(question=>{

question.addEventListener("click",()=>{

const answer=question.nextElementSibling;

document.querySelectorAll(".faq-answer").forEach(item=>{

if(item!==answer){

item.classList.remove("show");

}

});

answer.classList.toggle("show");

});

});

// ============================
// Sticky Header Shadow
// ============================

window.addEventListener("scroll",()=>{

const header=document.querySelector("header");

if(window.scrollY>30){

header.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";

}else{

header.style.boxShadow="0 5px 20px rgba(0,0,0,.08)";

}

});

// ============================
// Back To Top Button
// ============================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// ============================
// Smooth Navigation
// ============================

document.querySelectorAll('nav a').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ============================
// Active Navigation
// ============================

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

if(pageYOffset>=sectionTop){

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

// ============================
// Fade Animation
// ============================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll(".card,.stat-box,.why-grid div,.testimonial-card").forEach(item=>{

item.style.opacity="0";

item.style.transform="translateY(40px)";

item.style.transition=".7s";

observer.observe(item);

});
