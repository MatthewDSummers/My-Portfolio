// star ocean search bar
const star_ocean_search_bar = $("#star-ocean-search-bar");
// const so_one = $("#so_one")
// const so_two = $("#so_two")

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

    // specify the API call
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

// CREATE CHAR HTML FOR API DATA 
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
                }else{
                    img_count++
                    var image_details = {
                        "img_count": img_count,
                        "char_name": char_name,
                        "character_html_div": character_html_div,
                        "character": character,
                        "single_result": single_result
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

        let img_url = "/static/media/images/star_ocean/star_ocean_one/first_departure_r/" + char_name + ".webp";
        let so_one_img_url = "/static/media/images/star_ocean/star_ocean_one/snes/" + char_name + ".webp";
        let the_image = null;
        let star_ocean_one_img = null;

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

        carousel_inner.append(the_image);

        if (character.Image["Star Ocean 1"]){
            if (character.Image["Star Ocean 1"]){

                if (single_result){
                    star_ocean_one_img = $(`
                    <div class="carousel-item so1-game-label">
                        <img src="${so_one_img_url}" class="d-block " style="width:410px; height: 450px;">
                    </div>`)
                }else{
                    star_ocean_one_img = $(`
                    <div class="carousel-item so1-game-label">
                        <img src="${so_one_img_url}" class="d-block " style="width:310px; height: 450px;">
                    </div>`)
                }
            }
            carousel_inner.append(star_ocean_one_img);
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
        search_star_ocean()
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


    // "Ashton Anchors": {
    //     "Name": "Ashton Anchors",
    //     "Description": "Ashton Anchors (アシュトン・アンカース, Ashuton Ankāsu?, lit. Ashton Anchors) is one of the main characters from Star Ocean: The Second Story, its enhanced port, Second Evolution, its remake, The Second Story R, and its sequel Blue Sphere. Ashton is an unlucky swordsman haunted by a double-headed dragon that merged with his body, called Creepy and Weepy (Gyoro and Ururun in The Second Story), in an accident caused by meeting Claude C. Kenny and Rena Lanford.",
    //     "Race": "Expellian",
    //     "Place of origin": "Expel",
    //     "Birthday": "September 28, S.D. 346",
    //     "Age": ["20 (SO2/SE/SO2R)", "22 (SOBS)"],
    //     "Weapon":  "Twin Swords",
    //     "Height": "180 cm",
    //     "Weight": "80kg (dragons included)",
    //     "Affiliation": [],
    //     "Occupation": "Mercenary",
    //     "Image": {"Star Ocean: The Second Story R": true, "Star Ocean: The Second Story":true}
    // }