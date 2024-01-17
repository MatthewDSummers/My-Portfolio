// star ocean search bar
const star_ocean_search_bar = $("#star-ocean-search-bar");

// star ocean series triggers
const so_series_trigger = $(".so-series-trigger-div");
const so_btn = $("#star-ocean-one-button");
const so2_btn = $("#star-ocean-two-button");

// results div
const so_series_div = $("#star-ocean-series-div");

// errors 
const so_search_error_div = $("#so-search-error-div");
const so_search_error_p = $("#so-search-error-p");

// API CALL 
    // call API 
    function call_star_ocean(series=null, char=null){
        return new Promise(function(resolve, reject){
            var url = "/starry-ocean";
            // var url = "https://www.matthewsummers.dev/starry-ocean";
            let remainder = null;

            if (series){
                remainder = `/series/${series}`;
            }
            else if (char){
                remainder = `/characters/${char}`
            }

            if (series || char){
                url += remainder
            }

            // var url = "/starry-ocean/characters/";

            // var url = "https://www.matthewsummers.dev/starry-ocean/all";

            // url = "/starry-ocean/series/2s"
            // if (series && char){
            //     url += `?${series} + & ${char}`;
            // }
            // else if (series && !char){
            //     url += "?" + series;
            // }
            // else if(char && !series){
            //     url += "?" + char;
            // }
            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                success: function(data){

                    console.log("Success", data)
                    resolve(data);
                },
                error: function (xhr, status, error) {
                    console.error("XHR Status:", xhr.status);
                    console.error("Status:", status);
                    console.error("Error:", error);

                    try {
                        // custom error data from Python
                        var errorData = JSON.parse(xhr.responseText);
                        console.log("Error Data:", errorData);
                    } catch (e) {
                        console.warn("Unable to parse error data as JSON.");
                    }
                    
                    reject(error);
                }
            });
        });
    }

    // specify the API call
    function search_star_ocean(single_result=false){
        so_series_div.html("");
        so_search_error_div.css("display", "none");
        var search_param = star_ocean_search_bar.val();
        if (search_param){
            call_star_ocean(series = null, char = search_param)
            .then(function(character) {
                if (character){
                    // console.log(character, "char")
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

// CREATE CHAR HTML FROM API DATA 
    // Populate char data 
    var img_count = 0;

    function star_ocean_char_data(character, single_result=false){
        let character_html_div = null;

        if (single_result){
            character_html_div = $(`<div class="so-char-div col-12 w75-sm-w50-lg mx-auto"></div>`);
        }else{
            character_html_div = $(`<div class="so-char-div col-sm-12 col-md-6 col-lg-3"></div>`);
        }
        let character_html_details_div = $('<div class="so-char-details-div"></div>');

        let char_name = null;
        let desc_div = null;
        // var carousel = null;
        // let carousel_inner = null;
        // let carousel_remainder = null; 

        for (const prop in character) {
            if (character.hasOwnProperty(prop)) {
                // console.log(`${prop}: ${character[prop]}`);
                if (prop == "Name"){
                    char_name = character[prop];
                    // console.log(char_name, "char name")
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
                }else{
                    img_count++

                    var image_details = {
                        "img_count": img_count,
                        "char_name": char_name,
                        "character_html_div": character_html_div,
                        "character": character,
                        "single_result": single_result,
                    }
                    createStarOceanImages(image_details)
                }
                character_html_div.append(character_html_details_div)
            }
        }
        so_series_div.append(character_html_div)
        StarOceanCarouselControls()
    }

    // populate carousels and char images
    function createStarOceanImages(image_details){
        let img_count = image_details["img_count"]
        let char_name = image_details["char_name"]
        let character_html_div = image_details["character_html_div"]
        let character = image_details["character"]
        let single_result = image_details["single_result"]
        let series_number = character["Series"]

        
        let remake_url = null;
        let original_url = null;

        if (series_number== "1"){
            remake_url = "/static/media/images/star_ocean/star_ocean_one/first_departure_r/" + char_name + ".webp";
            original_url = "/static/media/images/star_ocean/star_ocean_one/snes/" + char_name + ".webp";
        }else{
            remake_url = "/static/media/images/star_ocean/star_ocean_two/R/" + char_name + ".webp";
            original_url = "/static/media/images/star_ocean/star_ocean_two/PS1/" + char_name + ".webp";
        }

        let remake_img = null;
        let original_image = null;

        if (single_result){
            remake_img = $(`
                <div class="carousel-item active single-result">
                    <img src="${remake_url}" class="d-block">
                </div>`);

        }else{
            // console.log(img_count)
            remake_img = $(`
                <div class="carousel-item active">
                    <img src="${remake_url}" class="d-block">
                </div>`);
        }

        series_number == "1" ? remake_img.addClass("so-fdr-game-label") : remake_img.addClass("so2-R-game-label")

        carousel = $(`<div id="star_ocean_char_img-${img_count}" class="carousel slide"></div>`);
        carousel.carousel(options ={
            interval: false,
        })

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

        carousel_inner.append(remake_img);

        let image_key = null;
        series_number == "1" ? image_key = "Star Ocean 1": image_key = "Star Ocean: The Second Story"

        // console.log(image_key, "IMAGE KEY")
        if (character.Image[image_key]){
            if (single_result){
                original_image = $(`
                <div class="carousel-item single-result">
                    <img src="${original_url}" class="d-block">
                </div>`)
            }else{
                original_image = $(`
                <div class="carousel-item">
                    <img src="${original_url}" class="d-block">
                </div>`)
            }

            series_number == "1" ? original_image.addClass("so1-game-label") : original_image.addClass("so2-game-label")
            carousel_inner.append(original_image);
        }else{
            carousel_remainder.addClass("hidden");
        }
        carousel.append(carousel_inner)
        carousel.append(carousel_remainder)

        character_html_div.append(carousel);
    }

// EVENTS 
    // show result for searched char (on search btn click)
    $(document).on("click", "#star-ocean-search-bar-btn", function(){
        search_star_ocean(single_result=true)
    })

    // show result for searched char (on enter)
    $(document).on("keypress", "#star-ocean-search-bar", function(event){
        so_search_error_div.css("display", "none");
        if(event.keyCode == 13){
            search_star_ocean(single_result=true)
        }
    })

    // show chars for series Trigger 
    $(document).on("click", ".so-series-trigger-div", function(){
        so_search_error_div.css("display", "none");
        so_series_div.html("");


        let its_trigger = $(this).find(".so-series-trigger");
        let search_param = its_trigger.data("series");

        // console.log(search_param, "search param")
        
        call_star_ocean(series = search_param)
        .then(function(characters) {
            let char_keys = characters;
            for (const key in char_keys) {
                if (char_keys.hasOwnProperty(key)) {
                    // console.log(`Character: ${key}`);
                    const character = char_keys[key];
                    star_ocean_char_data(character, single_result=false);
                }
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    });

    // carousel custom controls config
    function StarOceanCarouselControls(){
        var all_prevs = $(".carousel-control-prev");
        all_prevs.hide()

        var prevNext = $(".carousel-control-prev, .carousel-control-next");

        prevNext.on("click", function(event) {
            var clickedElement = $(this);
            var prev = $(this).parent().find(".carousel-control-prev");
            var next = $(this).parent().find(".carousel-control-next");

            if (clickedElement.hasClass("carousel-control-prev")) {
                next.show()
                prev.hide()
            } else if (clickedElement.hasClass("carousel-control-next")) {
                next.hide()
                prev.show()
            }
        });
    }

    // for Description text div
    function scrollGradient(ele) {
        // if user scroll is at the top AND if the element's (desc P's) height is higher than its parent div
        if (ele.scrollTop() === 0 && ele.prop('scrollHeight') > ele.height()) {
            ele.removeClass('hide-scroll-indicator');
        } else {
            ele.addClass('hide-scroll-indicator');
        }
    }



// function call_the_api(){
//     $.ajax({
//         // url:"https://matthewsummers.dev/starry-ocean/characters",
//         url:"/starry-ocean/characters",
//         method: "GET",
//         dataType: "json",
//         success: function(data){

//             console.log("Success", data)
//         },
//         error: function (xhr, status, error) {
//             console.error("XHR Status:", xhr.status);
//             console.error("Status:", status);
//             console.error("Error:", error);

//             // The detailed error response
//             try {
//                 // custom error data from Python
//                 var errorData = JSON.parse(xhr.responseText);
//                 console.log("Error Data:", errorData);
//             } catch (e) {
//                 console.warn("Unable to parse error data as JSON.");
//             }
            
//         }
//     });
// }
// call_the_api()