var menu_button = document.getElementById("menu-button");
var close_button = document.getElementById("close");
var modal = document.querySelector(".modal-menu");

// for Documentation
var placeholder_div = $("#placeholder-div");
var placeholder_div_trigger = $(".placeholder-div-trigger")


placeholder_div_trigger.on("click", function(e){   
    e.preventDefault();
    var id = $(this).attr("id");
    var new_url = null;
    var url = "";
    var not_docs = true;

    if (id == "star-ocean-docs-trigger"){
        url = "/starry-ocean/docs?ajax=true";
        new_url = "/starry-ocean/docs"
        not_docs = false;
    }else{
        url = "/starry-ocean/?ajax=true";
        new_url = "/starry-ocean"
    }

    $.ajax({
        url: url,
        method: "GET",
        success: function(data){
            console.log(data)
            placeholder_div.html(data)
            $("#projects-page-container").hide();
            placeholder_div_trigger.hide();

            if (not_docs){
                var target_element = document.getElementById("star-ocean-container");
                target_element.scrollIntoView({behavior: 'smooth'})
            }

            // // Replace user's current URL
            history.pushState(null, null, new_url);
        }
    });
})
// Documentation end


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
            if (text.classList.contains("fa-download")){
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