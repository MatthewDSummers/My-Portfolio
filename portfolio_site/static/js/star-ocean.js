const star_ocean_search_bar = $("#star-ocean-search-bar");
const so_one = $("#so_one")
const so_two = $("#so_two")

const so_series_trigger = $(".so-series-trigger-div");
const so_btn = $("#star-ocean-one-button");
const so2_btn = $("#star-ocean-two-button");

const so_series_div = $("#star-ocean-series-div");

const so_search_error_div = $("#so-search-error-div");
const so_search_error_p = $("#so-search-error-p");

function scrollGradient(ele) {
    // if user scroll is at the top AND if the element's (desc P's) height is higher than its parent div
    if (ele.scrollTop() === 0 && ele.prop('scrollHeight') > ele.height()) {
        ele.removeClass('hide-scroll-indicator');
    } else {
        ele.addClass('hide-scroll-indicator');
    }
}

$(document).on("click", ".so-series-trigger-div", function(){
    so_search_error_div.css("display", "none");
    so_series_div.html("");
    // var search_param = $(this).val();
    // var search_param = $(this).data("series");
    let its_trigger = $(this).find(".so-series-trigger");
    let search_param = its_trigger.data("series");

    console.log(search_param, "search param")
    
    call_star_ocean(series = search_param)
    .then(function(characters) {
        let char_keys = characters;
        for (const key in char_keys) {
            if (char_keys.hasOwnProperty(key)) {
                console.log(`Character: ${key}`);
                const character = char_keys[key];

                if(search_param == "2"){
                    // for layout purposes only (single it's a single result "In Development")
                    star_ocean_char_data(character, single_result=true);
                }else{
                    star_ocean_char_data(character);
                }
                console.log("----------------------");
            }
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
    });
});


$(document).on("click", "#star-ocean-search-bar-btn", function(){
    search_star_ocean()
})

$(document).on("keypress", "#star-ocean-search-bar", function(event){
    so_search_error_div.css("display", "none");
    if(event.keyCode == 13){
        search_star_ocean(single_result=true)
    }
})

function call_star_ocean(series=null, char=null){
    return new Promise(function(resolve, reject){
        var url = "/star-ocean/chars";

        if (series){
            series = `series=${series}`;
        }
        else if (char){
            char = `name=${char}`
        }

        if (series && char){
            url += `?${series} + & ${char}`;
        }
        else if (series && !char){
            url += "?" + series;
        }
        else if(char && !series){
            url += "?" + char;
        }

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(data){
                resolve(data);
            },
            error: function (error) {
                console.error("Error:", error);
                reject(error);
            }
        });
    });
}


function search_star_ocean(single_result=false){
    so_series_div.html("");
    so_search_error_div.css("display", "none");
    var search_param = star_ocean_search_bar.val();
    if (search_param){
        call_star_ocean(series = null, char = search_param)
            .then(function(character) {
                if (character){
                    console.log(character, "char")
                    if (single_result){
                        star_ocean_char_data(character, single_result=true);
                    }else{
                        star_ocean_char_data(character);
                    }
                }
                return character;
            })
            .catch(function(error) {
                console.error("Error:", error);
                so_search_error_div.css("display", "block");
                so_search_error_p.html(`Nothing found for: ${search_param}`);
            });
        }
}


var img_count = 0;

function star_ocean_char_data(character, single_result=false){
    let character_html_div = null;

    if (single_result){
        character_html_div = $(`<div class="so-char-div col-12 w75-sm-w50-lg mx-auto"></div>`);
    }else{
        character_html_div = $(`<div class="so-char-div col-sm-12 col-md-6 col-lg-3"></div>`);
    }

    let character_html_details_div = $('<div class="so-char-details-div"></div>');
    // let character_html_portrait_div = $('<div class="so-char-portrait-div"></div>');

    // character_html_portrait_div.append(carousel)
    // Log each property of the character
    let char_name = null;
    let desc_div = null;

    var carousel = null;
    let carousel_inner = null;
    let carousel_remainder = null; 

    for (const prop in character) {
        if (character.hasOwnProperty(prop)) {
            // console.log(`${prop}: ${character[prop]}`);
            if (prop == "Name"){
                char_name = character[prop];
                console.log(char_name, "9999")
            }
            if (prop !== "Image" ){
                let character_html_details = $(`<p class="so-char-key"><span class="bold-900 yellow-dark">${prop}:</span> <span class="yellow">${character[prop]}</span></p>`);

                if (prop == "Description"){
                    desc_div = $('<div class="char-desc-div"></div>');

                    desc_div.on('scroll', function () {
                        scrollGradient(desc_div);
                    });
                    desc_div.append(character_html_details)
                    character_html_details_div.append(desc_div);
                }else{
                    character_html_details_div.append(character_html_details)
                }
                // character_html_div.append(character_html_details_div)

            }else{
                img_count++;

                let img_url = "/static/media/images/star_ocean/star_ocean_one/first_departure_r/" + char_name + ".webp";
                let so_one_img_url = "/static/media/images/star_ocean/star_ocean_one/snes/" + char_name + ".webp";
                let the_image = null;
                let star_ocean_one_img = null;

                // if (single_result){
                //     the_image = $(`<img src="${img_url}" style="width:350px; height: 450px;">`)
                // }else{
                //     the_image = $(`<img src="${so_one_img_url}" style="width:250px; height: 350px;">`)
                // }

                if (single_result){
                    the_image = $(`
                        <div class="carousel-item active so-fdr-game-label">
                            <img src="${img_url}" class="d-block " style="width:350px; height: 450px;">
                        </div>`);

                }else{
                    console.log(img_count)
                    the_image = $(`
                        <div class="carousel-item active so-fdr-game-label">
                            <img src="${img_url}" class="d-block " style="width:250px; height: 450px;">
                        </div>`);
                }
                carousel = $(`<div id="star_ocean_char_img-${img_count}" class="carousel slide" data-bs-ride="carousel"></div>`);
                carousel_inner = $(`<div class="carousel-inner so-char-portrait-div"></div>`);
            
                carousel_remainder = $(`
                    <button class="carousel-control-prev" type="button" data-bs-target="#star_ocean_char_img-${img_count}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#star_ocean_char_img-${img_count}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>`);
            
                carousel_inner.append(the_image);

                if (character.Image["Star Ocean 1"]){
                    if (character.Image["Star Ocean 1"]){

                        if (single_result){
                            star_ocean_one_img = $(`
                            <div class="carousel-item so1-game-label">
                                <img src="${so_one_img_url}" class="d-block " style="width:350px; height: 450px;">
                            </div>`)
                        }else{
                            star_ocean_one_img = $(`
                            <div class="carousel-item so1-game-label">
                                <img src="${so_one_img_url}" class="d-block " style="width:250px; height: 450px;">
                            </div>`)
                        }

                    }
                    carousel_inner.append(star_ocean_one_img);
                }else{
                    carousel_remainder.addClass("hidden");
                }
                // character_html_div.append(character_html_portrait_div);
                // carousel_inner.append(character_html_portrait_div);

                carousel.append(carousel_inner)
                carousel.append(carousel_remainder)
                character_html_div.append(carousel);
                


                
            }
            character_html_div.append(character_html_details_div)
            // carousel_inner.append(character_html_div);
            // carousel.append(carousel_inner)
            // carousel.append(carousel_remainder)

        }
    }
    so_series_div.append(character_html_div)
}