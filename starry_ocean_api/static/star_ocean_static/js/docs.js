
// $(document).on("ready", function(){

    $(".scroll-to").on("click", function(){
        var target_id = $(this).data("scroll");
        var target_element = document.getElementById(target_id);
        target_element.scrollIntoView({behavior: 'smooth'})
    });

// })