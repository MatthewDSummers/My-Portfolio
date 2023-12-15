const GUESS_WORDS = {

    "easy": {
        "People": [
            {word: "ELVIS PRESLEY", hint: "The King of Rock and Roll"},
            {word: "ALBERT EINSTEIN", hint: "Famous physicist with wild hair"},
            {word: "JOHN LENNON", hint: "Considered to be the leader of The Beatles"}
        ],

        "Fruits":[
            {word: "BANANA", hint: "A yellow fruit which monkeys like"},
            {word: "APPLE", hint: "This fruit famously fell on someone's head and led to a scientific revelation"},
            {word: "CHERRY", hint: "A small round fruit used often as toppings on ice cream and in desserts"},
            {word: "PEACH", hint: "The U.S. state of Georgia is known for this fruit"},
            {word: "ORANGE", hint: "This fruit is also a color; and difficult to rhyme"}
        ],
    
        "Furniture":[
            {word: "CHAIR", hint: "You sit on this--possibly at a table"},
            {word: "BED", hint: "You sleep on this"},
            {word: "TABLE", hint: "Many people can eat on this"},
        ],
        
        "Countries":[
            {word: "USA", hint: "This North American country declared its independence on July 4th, 1776"},
            {word: "CANADA", hint: "This North American country is known for maple syrup"},
            {word: "JAPAN", hint: "This Asian country is known for its technological innovations, sushi, and anime"},
            {word: "BRAZIL", hint: "This South American country is home to the Amazon rainforest, the Carnival festival, and a famous statue overlooking Rio de Janeiro"},
            {word: "CHINA", hint: "The Great Wall, tea, ang bao"},
            {word: "INDIA", hint: "This Asian country is known for its Hinduism, rich culinary heritage, knowledge, and architectural wonders"}
        ],
    
        "Colors":[
            {word: "RED", hint: "Commonly, apples are this color"},
            {word: "BLUE", hint: "The typical color of the sky on a clear day"},
            {word: "YELLOW", hint: "The color of sunshine and cheerful flowers like sunflowers"},
            {word: "GREEN", hint: "To be this can mean you are inexperienced or envious"},
            {word: "ORANGE", hint: "I am also a fruit"},
            {word: "PURPLE", hint: "Often associated with royalty"},
        ],
    
        "Musical Instruments":[
            {word: "GUITAR", hint: "Popularized by Andrés Segovia"},
            {word: "PIANO", hint: "I have black and white kyes"},
            {word: "DRUM", hint: "You can beat me"},
            {word: "FLUTE", hint: "I require wind and am associated with Pan"},
            {word: "TRUMPET", hint: "Brass instrument often used in Jazz Bands to give bright, punchy tenor tones"},
            {word: "SAXOPHONE", hint: "A single-reed woodwind instrument invented by Adolphe Sax"}
        ],
    
        "Sports":[
            {word: "BASEBALL", hint: "Take me out to the ball game"},
            {word: "TENNIS", hint: "A game of love and advantage played on a rectangular court with a net in the middle"},
            {word: "HOCKEY", hint: "You may lose some teeth in this icy game"}
        ]
    },
    "medium": {
        "People": [
            {word: "ABRAHAM LINCOLN", hint: "16th President of the United States, known for his leadership during the Civil War and his dedication to abolishing slavery"},
            {word: "WILLIAM SHAKESPEARE", hint: "A playwright and poet often referred to as the 'Bard of Avon' who also invented many words"},
            {word: "ISAAC NEWTON", hint: "A mathematician and physicist famous for laying the foundation of modern physics. Associated loosely with apples."},
        ],
    
        "Fruits":[
            {word: "MANGO", hint: "f"},
            {word: "AVOCADO", hint: "Fatty and popular. You can make into guacamole"},
            {word: "BLUEBERRY", hint: "Small but powerful, this berry is packed with antioxidants and is often found in muffins, pancakes, and smoothies"},
            {word:  "POMEGRANATE", hint: "With its ruby-red arils, this deep red fruit is both sweet, tart, and visually stunning."},
            {word: "COCONUT", hint: "I have a hard and somewhat furry shell, but I'm a softy on the inside. Used for various food dishes and skin care"},
            {word: "RASPBERRY", hint: "Sweet and tart, this red berry is the delight of many jams and toppings"}
        ],
    
        "Furniture":[
            {word: "SOFA", hint: "You can sit or lay on me, and I'm probably in the living room"},
            {word: "WARDROBE", hint: "I'm tall and you can hang clothes inside me."},
            {word: "DESK", hint: "I am used for work and often found in offices"}
        ],
        
        "Countries":[
            {word: "SWITZERLAND", hint: "I have a famous 'Army Knife'"},
            {word: "TURKEY", hint: "I am also a bird"},
            {word: "ISRAEL", hint: "I am known for my religious and historical significance. My people are called Jews."},
            {word: "IRAQ", hint: "I largely correspond with the territory of ancient Mesopotamia and was once ruled by Saddam Hussein"}
        ],
    
        "Colors":[
            {word: "VIOLET", hint: "I am sometimes ultra and also known as purple"},
            {word: "AZURE", hint: "Microsoft has a cloud service bearing my name"},
            {word: "TEAL", hint: "I rhyme with 'seal'"},
            {word: "SAPPHIRE", hint: "I am also a deep blue precious gemstone"}
        ],
    
        "Musical Instruments":[
            {word: "CELLO", hint: "I rhyme with 'fellow'"},
            {word: "JEWS HARP", hint: "I'm neither a harp nor Jewish, though you might not have known"},
            {word: "SITAR", hint: "I am used in Hindu classical music. Norah Jones' father made me even more popular"},
            {word: "XYLOPHONE", hint: "I have an uncommon first letter and many keys of which you may beat with mallets."},
            {word: "PICCOLO", hint: "Green guy from Dragon Ball"}
        ],
    
        "Sports":[
            {word: "BADMINTON", hint: "A racquet sport that's not really 'bad'"},
            {word: "RUGBY", hint: "England loves me. USA loves my cousin: 'football'"},
            {word: "VOLLEYBALL", hint: "I'm often played on the beach using a ball and a net"}
        ]
    },
    "hard": {
        "People": [
            {word: "JOHANNES KEPLER", hint: "German Astronomer and key figure in the 17th-century Scientific Revolution known for his laws of planetary motion, revealing the mathematical harmony in the cosmos"},
            {word: "LUDWIG VAN BEETHOVEN", hint: "German composer and pianist who also became deaf"},
            {word: "JOHANN SEBASTIAN BACH", hint: "Baroque composer commonly considered the father of classical music"},
            {word: "VICTOR LEMONTE WOOTEN", hint: "A virtuostic electric bass guitarist known for innovative techniques. A pioneer. Friends with Béla Fleck"}
        ],
    
        "Fruits":[
            {word: "DURIAN", hint: "I am the King of Fruits, but to many I stink"},
            {word: "JACKFRUIT", hint: "The largest treefruit"},
            {word: "PERSIMMON", hint: "I'm orange and come in two varieties: astringent and non-astringent"},
            {word: "RAMBUTAN", hint: "I have a hairy exterior, and I'm related to the lychee"},
            {word: "PAPAYA", hint: "My enzyme papain is used as a meat tenderizer"},
        ],
    
        "Furniture":[
            {word: "ARMOIRE", hint: "I am essentially an ellaborate wardrobe"},
            {word: "OTTOMAN", hint: "You can rest your feet on me"},
            {word: "CHAISE LOUNGE", hint: "I am combine a comfortable seat with an extended area to stretch out"}
        ],
        
        "Countries":[
            {word: "LESOTHO", hint: "I am totally surrounded by my neighbor South Africa"},
            {word: "SLOVENIA", hint: "A picturesque European nation known for its stunning landscapes and Julian Alps"},
            {word: "ESTONIA", hint: "A Baltic gem boasting a digital society, medieval architecture in Tallinn, and an affinity for singing festivals"},
            {word: "SOMALIA", hint: "Located in the Horn of Africa, I have a long coastline along the Indian Ocean and am known for my complex history"},
            {word: "TURKMENISTAN", hint: "A Central Asian country with a distinctive landscape, I'm rich in natural gas reserves and have a unique authoritarian regime"},
            {word: "BRUNEI", hint: "I am a tiny nation on the island of Borneo known for my oil wealth, lush rainforests, and strict Islamic laws"}
        ],
    
        "Colors":[
            {word: "CERULEAN", hint: "A serene shade often associated with clear skies and calm waters"},
            {word: "TURQUOISE", hint: "Many Native Americans were adorned by me"},
            {word: "MAGENTA", hint: "Vivid and intense, I lie between red and purple on the color spectrum"},
            {word: "CHARTREUSE", hint: "I'm a lively color named after a French liqueur"}
        ],
    
        "Musical Instruments":[
            {word: "THEREMIN", hint: "I'm a unique electronic instrument played without physical contact; my eerie sound has been used in sci-fi movie soundtracks"},
            {word: "OCARINA", hint: "Whistle-like and often made of clay, I'm known for my role in video games like 'The Legend of Zelda"},
            {word: "DIDGERIDOO", hint: "An Aboriginal Australian instrument made from a hollowed-out tree trunk, I produce deep and resonant tones"},
            {word:"KALIMBA", hint: "Also known as a thumb piano, I'm an African instrument with metal tines that are plucked to create melodic sounds"},
            {word: "CHAPMAN STICK", hint: "A multi-string instrument designed for tapping, I allow players to create bass and melody simultaneously"},
        ],
        "Sports":[
            {word: "BOSSABALL", hint: "A dynamic sport that combines elements of volleyball, soccer, and gymnastics, played on a large inflatable court with trampolines"},
            {word: "ULTIMATE FRISBEE", hint: "A non-contact team sport played with a flying disc"},
            {word: "FENCING", hint: "A centuries-old sport that involves dueling with bladed weapons and emphasizes agility, strategy, and precision"},
        ]
    }
}

const victory_statement = document.getElementById("victory-statement");

const CHOICES =  document.getElementById("choices");
const DIFFICULTY = document.querySelectorAll(".difficulty");
const letter_spaces_div = document.getElementById("letter-spaces");
const letter_options_div = document.getElementById("letter-options");
const letter_options_inner_1 = document.getElementById("letter-options-inner-1");
const letter_options_inner_2 = document.getElementById("letter-options-inner-2");
const letter_options_inner_3 = document.getElementById("letter-options-inner-3");
var wrong_answers = 0;
var right_answers = 0;

// HANGMAN BODY 
const pole = document.querySelector(".pole");
const hangman_head = document.getElementById("head");
const hangman_body = document.getElementById("body");
const left_arm = document.getElementById("arm-left");
const right_arm = document.getElementById("arm-right");
const left_leg = document.getElementById("leg-left");
const right_leg = document.getElementById("leg-right");
const hint_button = document.getElementById("hint-button");
const hint = document.getElementById("hint");


function gameFlow(command){
    if (command=="start"){
        hint_button.classList.add("show");
        letter_options_inner_1.innerHTML = "";
        letter_options_inner_2.innerHTML = "";
        letter_options_inner_3.innerHTML = "";
        letter_spaces_div.innerHTML = "";

        wrong_answers = 0;
        right_answers = 0;
        document.getElementById("game-options").classList.add("hide");
        hangman_body.classList.remove("block");
        hangman_head.classList.remove("block");
        left_arm.classList.remove("block");
        right_arm.classList.remove("block");
        left_leg.classList.remove("block");
        right_leg.classList.remove("block");
        victory_statement.classList.remove("block");

        pole.classList.remove("pole-with-after");
        pole.classList.remove("pole-with-before");
    }
    if (command=="end"){
        document.getElementById("game-options").classList.remove("hide");
    }

}

function appendLetterOptions(i){
    const letter_option = document.createElement("p")
    letter_option.classList.add("letter-option");
    letter_option.textContent = String.fromCharCode(65 + i);
    letter_option.addEventListener("click", clickLetter);
    return letter_option
}
function clickLetter(event) {
    const letter = event.target;
    const letter_value = letter.textContent;
    const answer = document.getElementById("answer").value;
    const answer_no_spaces = answer.split(" ").join("");

    const answer_letters = document.querySelectorAll(".letter-lines-p");
    
    const pieces = document.querySelectorAll('.piece');


    console.log(letter_value, "letter value chosen");


    console.log(answer, "the answer")
    if (answer.includes(letter_value)){
        letter.classList.add("clicked-letter-right");
        for (const char of answer_letters){
            if (char.textContent == letter_value){
                char.classList.add("block");
                right_answers += 1;
                console.log(right_answers, "right answer")
                console.log(answer.length, "answer lenght")
            }
            if (right_answers == answer_no_spaces.length){
                victory_statement.textContent = "You Win!";
                gameFlow("end");
                victory_statement.classList.add("block");
            }

        }
        console.log("correct!")

    }else{
            letter.classList.add("clicked-letter-wrong");
            wrong_answers += 1;

            if (wrong_answers == 1){
                pole.classList.add("pole-with-before");
            }
            else if (wrong_answers == 2){
                pole.classList.add("pole-with-after");
            }
            else{
                pieces.forEach(piece => {
                    const pieceNumber = parseInt(piece.classList[1]); // get second class
                    if (pieceNumber == wrong_answers) {
                        piece.classList.add("block");
                        console.log(piece)
                    }
                });
            }

            if (wrong_answers == 8){
                victory_statement.textContent = "You Lose!";
                victory_statement.classList.add("block");
                gameFlow("end");
            }
    }
}


for (const difficulty of DIFFICULTY){
    difficulty.addEventListener("click", function(){
        for (const other of DIFFICULTY) {
            if (other !== difficulty) {
                other.checked = false;
            }
        }

    })
}
var random_word = "pie";
CHOICES.addEventListener("change", function(){
    hint.classList.add("hidden");

    const selected_option = CHOICES.options[CHOICES.selectedIndex].value;

    for (const difficulty of DIFFICULTY){
        if (difficulty.checked){
            chosen_difficulty = difficulty.id;
        }
    }

    if (typeof chosen_difficulty == "undefined"){
        document.getElementById("error-difficulty").classList.add("block");
        CHOICES.selectedIndex = 0;
    }else{

        gameFlow("start");
        
        for (let i=0; i < 26; i++){
            if (i < 10){
                letter_options_inner_1.appendChild(appendLetterOptions(i))
            } else if (i >= 10  && i < 20){
                letter_options_inner_2.appendChild(appendLetterOptions(i))
            } else{
                letter_options_inner_3.appendChild(appendLetterOptions(i))
            }
        }


        document.getElementById("error-difficulty").classList.remove("block");
        var options = GUESS_WORDS[chosen_difficulty][selected_option];

        // GET RANDOM WORD FROM CHOICES OBJECT ACCORDING TO USER SELECTION
        var random_index = Math.floor(Math.random() * options.length);
        var random_word = options[random_index];
        
        document.getElementById("answer").value = random_word.word;
        console.log(random_word.hint, "hint")

        giveHint(random_word);

        for (const letter of random_word.word){
            console.log(letter)
            if (letter == " "){
                var letter_space = document.createElement("div");
                letter_space.classList.add("letter-lines-no-letter");
        
                // var letter_p = document.createElement("p");
                // letter_space.appendChild(letter_p);
                letter_spaces_div.appendChild(letter_space);
            }else{
                var letter_space = document.createElement("div");
                letter_space.classList.add("letter-lines");
        
                var letter_p = document.createElement("p");
                letter_p.classList.add("letter-lines-p");
                letter_p.textContent = letter;
                letter_space.appendChild(letter_p);
                letter_spaces_div.appendChild(letter_space);
            }
    
        }
    }

    // document.querySelector(".letter-lines-0").textContent = "a"
})

// function getHint(word){

// }

// give Hint 
function giveHint(random_word){
    hint_button.addEventListener("click", function(){
        hint.textContent = random_word.hint;
        hint.classList.remove("hidden");
    });
}




// J O K E S 
joke_button = document.getElementById("get-joke");
joke_div = document.getElementById("joke-div");

show_punchline_button = document.getElementById("show-punchline");

var punchline_div = document.getElementById("punchline-div");
punchline_element = document.getElementById("punchline-element");
var new_joke = document.getElementById("new-joke");
counter = document.getElementById("counter");



function countDownJoke(counter, punchline, count){

    counter.classList.remove("hidden");

    // counter.classList.add("block");
    counter.textContent = `Punchline in ${count}`;
    count -= 1;

    if (count >= 0) {
        setTimeout(() => {
            countDownJoke(counter, punchline, count);
        }, 1000);
    }
    else {
        // counter.style.display = "none";
        counter.classList.add("hidden");
        // punchline_element.style.display = "block";

        show_punchline_button.classList.remove("hidden");
        punchline_element.textContent = `Answer: ${punchline}`;
    }
};

joke_button.addEventListener("click", function(e){
    newJoke(e.target);
    console.log(e.target)
});
new_joke.addEventListener("click", function(e){
    // punchline_element.style.display = "none";
    newJoke(e.target);
});
show_punchline_button.addEventListener("click", function(){
    punchline_div.classList.remove("hidden");
    new_joke.classList.remove("hidden");
    show_punchline_button.classList.add("hidden");
});


function newJoke(target_element){
    new_joke.classList.add("hidden");
    show_punchline_button.classList.add("hidden");
    punchline_div.classList.add("hidden");
    // target_element.style.display = "none";
    target_element.classList.add("hidden");
    // joke_div.style.display = "block";
    joke_div.classList.remove("hidden");
    // counter
    
    $.ajax({
        url: "https://official-joke-api.appspot.com/random_joke",
        method: "GET",
        dataType: "json",
        success: function(data){
            setup.textContent = data.setup;
            console.log(data)
            var punch = data.punchline;
            console.log(punch)
            countDownJoke(counter, punch, 3);
        }
    })
}



// function getJSONDataOnClick(element, url){
//     return new Promise (async (resolve, reject) => {
//         element.addEventListener("click", async function(event){
//             if (event.target.tagName === "A"){
//                 event.preventDefault();
//             }

//             try {
//                 const response = await fetch(url);
//                 if (!response.ok){
//                     throw new Error("Network response not OK");
//                 }
//                 const data = await response.json();
//                 resolve(data);

//             }
//             catch (error){
//                 reject(error);
//                 console.log('Fetch error:', error);
//             }
//         });


//     });
// }

// // Example usage:
// const myElement = document.getElementById("myElement");
// const apiUrl = "https://www.example.com/api/data";
// const fetchOnClick = getJSONDataOnClick(myElement, apiUrl);

// fetchOnClick
//     .then((data) => {
//         console.log("Data: ", data);
//         return data;
//     })
//     .catch((error) => {
//         console.log("Error: ", error);
//         return error;
//     });