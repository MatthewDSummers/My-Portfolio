
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// View certification trigger 
$(".view-cert").on("click", function(){
    let id = $(this).attr("id");
    let img = $(`img[data-cert='${id}']`);
    let span = $(`span[data-cert-span='${id}']`);
    let arrow = $(`span[data-arrow='${id}']`);

    // toggle arrow animation
    if (arrow.hasClass("arrow-down")){
        arrow.removeClass("arrow-down");
        arrow.addClass("arrow-up");
    }else{
        arrow.removeClass("arrow-up");
        arrow.addClass("arrow-down");
    }

    // toggle cert img and span
    img.hasClass("hidden") ? img.removeClass("hidden") : img.addClass("hidden");
    span.hasClass("hidden") ? span.removeClass("hidden") : span.addClass("hidden");
})


// Close modal 
$(".close-resume-modal, .close-resume-modal-div").on("click", function(){
    $(".modal-menu-resume").hide();
})


// If not mobile, open cert in modal; else default to anchor tag opening in new tab
if (!isMobile()){
    $(".cert-img-modal-trigger").on("click", function(event){
        event.preventDefault();
        $(".modal-menu-resume").show();
    })
}
