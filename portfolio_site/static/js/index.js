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
    if (text.classList.contains("phone-num-animate")){
        var the_a = document.createElement("a");
        var phone_num = "";
    }


    letters.forEach(function (letter, i) {
        span = document.createElement("span");
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

        if (text.classList.contains("phone-num-animate")){
            phone_num += letter;
            the_a.append(span)
        }else{
            text.append(span);
        }

        if (i === letters.length - 1 && text.classList.contains("phone-num-animate")){
            text.append(the_a);
            the_a.href = 'tel:' + phone_num;
            the_a.style.color = "#7d4095";
            the_a.style.textDecoration = "none"
            the_a.style.textShadow = "1px 2px 3px #e6e200"
        }
    });
});


const jobSkillsList = document.querySelectorAll('.job-skills');

jobSkillsList.forEach(jobSkills => {
    const jobSkillsDuplicate = jobSkills.cloneNode(true);
    jobSkillsDuplicate.classList.remove('job-skills');
    jobSkillsDuplicate.classList.add('job-skills-duplicate');
    jobSkills.appendChild(jobSkillsDuplicate);
});