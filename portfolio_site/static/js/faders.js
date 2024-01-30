const sliders = document.querySelectorAll(".slide-in")

function slideInPojectDesc(){
// const faders = document.querySelectorAll(".fade-in")

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -250px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
        entries.forEach(entry => {
            if (!entry.isIntersecting){
                return
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // faders.forEach(fader => {
    //     appearOnScroll.observe(fader);
    // });
    sliders.forEach(slider =>{
        appearOnScroll.observe(slider);
    });
}

function isMobileDevice() {
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (!isMobileDevice()) {
    slideInPojectDesc();
}else{
    sliders.forEach(slider => {
        slider.classList.remove("slide-in");
        slider.classList.remove("left");
        slider.classList.remove("right");
        console.log(slider)
    });
}