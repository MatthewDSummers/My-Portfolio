document.addEventListener("DOMContentLoaded", function(){
    const ff_header = document.querySelector(".ff-number-container");
    const ff_selection = document.querySelector(".ff-selection");
    const char_divs = document.getElementById("ff-data");
    const ff_game_links_div = document.getElementById("ff-game-links-div");
    const ff_trigger = document.querySelectorAll(".ff-trigger");

    var spinner = $(".spinner");
    var game_parameter = char_divs.getAttribute("data-game-parameter");

    // when user selects a game from the number options
    ff_trigger.forEach(function(trigger){
        trigger.addEventListener("click", function(){
            which_game = trigger.getAttribute("data-game-parameter")
            console.log(which_game, "the game")
            final_fantasy_ajax(which_game)
        })
    });

    // for desc div 
    function hide_show_gradient_on_scroll (ele) {
        // if user scroll is at the top AND if the element's (desc P's) height is heigher than its parent div
        if (ele.scrollTop === 0 && ele.scrollHeight > ele.clientHeight) {
            ele.classList.remove('hide-scroll-indicator');
        } else {
            ele.classList.add('hide-scroll-indicator');
        }
    }

    // used for wikipedia link 
    GAME_NAMES = {
        "1": "Final_Fantasy_(video_game)",
        "2": "Final_Fantasy_II",
        "3": "Final_Fantasy_III",
        "4": "Final_Fantasy_IV",
        "5": "Final_Fantasy_V",
        "6": "Final_Fantasy_VI",
        "7": "Final_Fantasy_VII",
        "8": "Final_Fantasy_VIII",
        "9": "Final_Fantasy_IX",
        "10": "Final_Fantasy_X",
        "12": "Final_Fantasy_XII",
        "13": "Final_Fantasy_XIII",
        "15": "Final_Fantasy_XV",
        "Final Fantasy BE": "Final_Fantasy_Brave_Exvius",
    }

    function final_fantasy_ajax(game_parameter){
        // gus is also known as guy 
        if(game_parameter == "gus" || game_parameter == "Gus"){
            game_parameter = "guy";
        }

        char_divs.innerHTML = "";
        ff_game_links_div.innerHTML = "";
        let wiki_game_name = GAME_NAMES[game_parameter];

        include_only = null;

        if(game_parameter == "1"){
            game_parameter = "Final Fantasy"
        }else if (game_parameter == "15"){
            game_parameter = "Final Fantasy XV";
        }
        else if (game_parameter == "10"){
            game_parameter = "";
            include_only = ["Final Fantasy X", "Final Fantasy X-2"]
        }else if (game_parameter == "13"){
            game_parameter = "";
            include_only = ["Final Fantasy XIII", "Final Fantasy XIII-2"]
        }

        let param = null;

        if(wiki_game_name){
            param = `origin=${game_parameter}`;
        }else{
            param = `name=${game_parameter}`;
        }
        var successful_results = false;


        game_url = `https://www.moogleapi.com/api/v1/characters/search?${param}`
        console.log(game_url, "hjo")
        var ff_ajax = $.ajax({
            url: game_url,
            method: "GET",
            dataType: "json",
            beforeSend: function () {
                // Code to be executed before the request is sent
                ff_selection.classList.add("hidden");
                spinner.css("display", "block");
            },
            success: function(data){
                filtered_results = [];
                console.log(data)
                // get characters from every game, then filter through for current main number entry
                    // ex: Need FFX and FFX2 characters
                if (include_only){
                    for (const char of data){
                        console.log(char)
                        console.log("\n")
                        // if (char["origin"] in include_only){
                        if (include_only.includes(char["origin"])){
                            filtered_results.push(char)
                        }
                    }
                    data = filtered_results;
                }
                

                if(data.length > 0){
                    for (const char of data){
                        // character div [only for chars with img]
                        if (char.pictures && char.pictures.length > 0){
                            let char_div = document.createElement("div");
                            char_div.classList.add("char-div", "col-xl-2", "col-lg-3", "col-md-6", "col-sm-8", "col-12");
    
                            // portraits
                            if ("url" in char.pictures[0]){
                                successful_results = true;
                                let img_url = char.pictures[0]["url"];
                                let char_img = document.createElement("img");
                                char_img.classList.add("char-img");
                                char_img.src = img_url;
                                // append portraits
                                char_div.appendChild(char_img);
                            }
    
                            // desc
                            let char_details_div = document.createElement("div");
                            char_details_div.classList.add("char-details-div");
    
                            // form char desc from keys not in IGNORE
                            IGNORE = ["pictures", "stats", "japaneseName", "id"];
                            for (const key in char){
                                if (!IGNORE.includes(key)){
    
                                    let desc_item = document.createElement("p");
                                    desc_item.classList.add("char-desc");
                                    let capitalized_value = key[0].toUpperCase() + key.slice(1);
    
                                    desc_item.textContent = `${capitalized_value}: ${char[key]} `;
    
                                    if (capitalized_value !== "Description"){
                                        char_details_div.appendChild(desc_item);
                                    }else{
                                        let desc_div = document.createElement("div");
                                        desc_div.classList.add("char-desc-div");
    
                                        desc_div.appendChild(desc_item)
    
                                        char_div.appendChild(desc_div);
    
                                        desc_div.addEventListener('scroll', function () {
                                            hide_show_gradient_on_scroll(desc_div);
                                        });
                                    }
                                    char_div.appendChild(char_details_div)
                                }
                            }
                            char_divs.appendChild(char_div)
    
                        }
                    }
                }
 
            },
            complete: function () {
                // spinner.addClass('hidden');
                spinner.css("display", "none");
                console.log(successful_results, " is it ttrue?")
                if(successful_results){
                    if (wiki_game_name){
                        let wiki_url = `https://en.wikipedia.org/wiki/${wiki_game_name}`;
                        create_wiki_link(wiki_url, wiki_game_name.replace(/_/g, ' '));
                    }else{
                        searchWikipedia();
                    }
                }

            }
        })

        ff_ajax.fail(function(jqXHR, textStatus, errorThrown) {
            console.error('The AJAX request failed:', textStatus, errorThrown);
            spinner.css("display", "none");
        });

        
    }

    // load a game by the url if present
    if (game_parameter && game_parameter !== "non"){
        final_fantasy_ajax(game_parameter)
    }


    function create_wiki_link(wiki_url, title){

    let ff_page_link = document.createElement("a");
        ff_page_link.target = '_blank';
        ff_page_link.textContent = title;
        ff_page_link.href = wiki_url;
        ff_page_link.style.color = "#1ba77a";
        ff_page_link.style.textDecoration = "none";

    let ff_page_link_info = document.createElement("p");
        ff_page_link_info.textContent = "For more info: ";
        ff_page_link_info.style.display = "inline-block";
        ff_page_link_info.style.margin = "0 .4em 0 0";
        ff_page_link_info.style.color = "#f8df86";

    ff_game_links_div.appendChild(ff_page_link_info);
    ff_game_links_div.appendChild(ff_page_link);
    }



    const ff_search_bar =  $('#ff-search-bar');

    // function individual_search(input){
    //     if (input){
    //         char_divs.innerHTML = "";
    //         ff_game_links_div.innerHTML = "";
    //         searchWikipedia();
    //     }
    // }

    ff_search_bar.keypress(function(event) {
        let wiki_search_input = $('#ff-search-bar').val();
        if (event.which === 13) {
            let search_wiki = final_fantasy_ajax(wiki_search_input);
            if (search_wiki){
                searchWikipedia();
            }
        }
    });

    function searchWikipedia() {
        const user_search = $('#ff-game-links-div');
        var wiki_search_input = $('#ff-search-bar').val();

        // gus is also known as guy
        if (wiki_search_input == "Gus" || wiki_search_input == "gus"){
            wiki_search_input = "Guy";
        }
        modified_search = null;

        if (!wiki_search_input.includes("Final Fantasy")){
            var modified_search = wiki_search_input + " Final Fantasy";
        }else{
            modified_search = wiki_search_input;
        }

        // Clear the previous results
        user_search.html('');

        if (wiki_search_input.length > 0){

            
            // Make call to Wikipedia API
            $.ajax({
                url: `https://en.wikipedia.org/w/api.php`,
                data: {
                    action: 'query',
                    format: 'json',
                    list: 'search',
                    srsearch: modified_search,
                    utf8: 1,
                    // prop: 'info',
                    // inprop: 'url'
                },
                dataType: 'jsonp',
                success: function(data) {
                    const results = data.query.search;
                    // console.log(results)

                    var result = null;
                    var capitalized_search = wiki_search_input.charAt(0).toUpperCase() + wiki_search_input.slice(1);

                    if (results.length > 0) {
                        if(wiki_search_input.includes("Final Fantasy")){
                            if(results[0].title.includes(wiki_search_input) && (results[0].snippet.includes("a character") && results[0].snippet.includes(capitalized_search))){
                                result = results[0];
                            }else{
                                result = results[1];
                            }
                        }else{
                            result = results[0];
                        }

                        ff_selection.style.display = "none";
                        const retrieved_wiki_url = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
                        create_wiki_link(retrieved_wiki_url, result.title)
                    } else {
                        console.log('No results found.');
                    }
                },
                error: function(error) {
                    console.error('Error fetching data:', error);
                }
            });
        }
    }


})



