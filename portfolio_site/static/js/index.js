var menu_button = document.getElementById("menu-button");
var close_button = document.getElementById("close");
var modal = document.querySelector(".modal-menu");


menu_button.addEventListener("click", function(){
    modal.style.display = "block";
});

close_button.addEventListener("click", function(){
    modal.style.display = "none";
});

const animateText = document.querySelectorAll('.animate-texts');

animateText.forEach(function (text) {
    const letters = text.textContent.split("");
    text.textContent = "";

    letters.forEach(function (letter, i) {
        const span = document.createElement("span");
        span.classList.add("animate-text")

        if (letter === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = letter;
            span.style.animationDelay = i / 14 + "s";
            if(text.classList.contains("resume-job-title")){
                span.style.animationDelay = i / 35 + "s";
            }
        }
        text.append(span);
    });
});


const jobSkillsList = document.querySelectorAll('.job-skills');

jobSkillsList.forEach(jobSkills => {
    const jobSkillsDuplicate = jobSkills.cloneNode(true);
    jobSkillsDuplicate.classList.remove('job-skills');
    jobSkillsDuplicate.classList.add('job-skills-duplicate');
    jobSkills.appendChild(jobSkillsDuplicate);
});