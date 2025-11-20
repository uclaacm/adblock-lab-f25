
const elements = document.querySelectorAll('*').filter(el => el.class.includes('ad') || el.id.includes('ad'));
elements.forEach((el, index) => {
    el.style.visibility = "hidden";
});

