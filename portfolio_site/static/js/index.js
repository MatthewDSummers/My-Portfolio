var menu_button = document.getElementById("menu-button");
var close_button = document.getElementById("close");
var modal = document.querySelector(".modal-menu");

menu_button.addEventListener("click", function(){
    modal.style.display = "block";
});

close_button.addEventListener("click", function(){
    modal.style.display = "none";
});