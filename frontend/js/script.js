const menu=document.querySelector(".menu");
const close=document.querySelector(".close");
const menuContainer= document.querySelector(".menu-container");
const menuLinks = document.querySelectorAll(".menu-link-same-page");

menu.addEventListener("click" , ()=>{
    menuContainer.classList.add("active")
})

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuContainer.classList.remove("active");
  });
});

close.addEventListener("click" , ()=>{
    menuContainer.classList.remove("active")
})

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
   item.querySelector('.faq-question').addEventListener('click', () => {
    item.classList.toggle('active');
    });
  });


  // Get all elements that should animate
const scrollElements = document.querySelectorAll(".animate-on-scroll");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    ((window.innerHeight || document.documentElement.clientHeight) - offset)
  );
};

const elementOutOfView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = (element) => {
  element.classList.add("active");
};

const hideScrollElement = (element) => {
  element.classList.remove("active");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) { // 100px offset from bottom
      displayScrollElement(el);
    } else if (elementOutOfView(el)) {
      hideScrollElement(el);
    }
  });
};

// Listen to scroll
window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// Trigger on load in case some elements already in view
handleScrollAnimation();