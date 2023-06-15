const keyboardButton = document.querySelector(".keyboard-button");
const keyString = "QWERTYUIOPASDFGHJKLZXCVBNM";
const heading = document.querySelector(".type");
const alphabet = document.querySelector(".alphabet");
const row1 = document.querySelector(".row1");
const row2 = document.querySelector(".row2");
const row3 = document.querySelector(".row3");
const input = document.querySelector(".input");
const inputFromKeyboard = document.querySelector(".input-from-keyboard");
const string = {
    BHAGWAN : ["RAM","GANESH","KRISHNA","BRAHMA","MAHAKAL","HANUMAN"],
    SPORT : ["CRICKET","BADMINTON","VOLLEYBALL","TABLETENNIS","CHESS","SUDOKU"],
    TRANSPORT : ["BUS","CAR","TRAIN","AEROPLANE","BIKE","TRUCK"],
    SUBJECT : ["MATHEMATICS","PHYSICS","CHEMISTRY","ECONOMICS","BIOLOGY"],
    COLOR : ["RED","BLUE","GREEN","BLACK","YELLOW","ORANGE"]
};

let indexOfString = [];
let flag = false;
let chances = 3;
let count = 0;
let valueOfDictionary = String();
let lengthOfDictionary = 0;
let divArray = [];

// to show category..
function category(){
    const keyOfDictionary = Object.keys(string);
    const keyOfDictionaryLength = keyOfDictionary.length;
    let randomKey = Math.floor(Math.random() * keyOfDictionaryLength);
    heading.innerHTML = keyOfDictionary[randomKey];
    return keyOfDictionary[randomKey];
}

// length of input container..
function lengthOfInput(){
    let key = category();
    let arrayOfString = string[key];
    let length = arrayOfString.length;
    let randomIndex = Math.floor(Math.random() * length);
    valueOfDictionary = arrayOfString[randomIndex];
    lengthOfDictionary = valueOfDictionary.length;
    return arrayOfString[randomIndex];
}

// input containers..
function inputContainer(){
    let str = lengthOfInput();
    let len = str.length;
    for(let i=0; i<len; i++){
        let div = document.createElement('div');
        div.classList.add("division")
        div.classList.add("div"+i);
        input.appendChild(div);
    } 
}

// keyboard..
function buttonCreation(count){    
    let button = document.createElement('button');
    button.id = "button" + keyString.slice(count,count+1);
    button.innerHTML = keyString.slice(count,count+1);
    button.style.color = "black";
    button.classList.add("alphabet");
    if((count >= 0) && (count < 10)){
        row1.appendChild(button);
    }
    else if(count >=10 && count < 19){
        row2.appendChild(button);
    }
    else{
        row3.appendChild(button);
    }
}

function keyboardCreation(){
    for(let i=0; i<26; i++){
        if(count >= 0 && count < 10){
            buttonCreation(count++);
        }
        else if(count >=10 && count <= 18){
            buttonCreation(count++);
        }
        else{
            buttonCreation(count++);
        }
    }
}

// clicking..
function clicking(){
    const id = document.querySelectorAll(".alphabet");
    for(let i=0; i<lengthOfDictionary; i++){
        indexOfString.push(false);
    }
    for(let i=0; i<26; i++){
        id[i].addEventListener("click",function(){
        fun(id[i]);
    });  
    }
}
function fun(id){
    id.style.color = "red";
    let bool = false;
    //let length = valueOfDictionary.length;
    for(let i=0; i<lengthOfDictionary; i++){
        if(!indexOfString[i]){
            if(id.innerHTML.localeCompare(valueOfDictionary.slice(i,i+1)) === 0){
                let str = ".div" + i;
                let element = document.querySelector(str);
                element.innerHTML = id.innerHTML;
                indexOfString[i] = true;
                bool = true;
            }
        }
    }
    if(!bool){
        chances--;
    }
    else{
        bool = false;
    }
    if(chances <= 0){
        const popup = document.getElementById("myPopup");
        const close = document.getElementById("close");
        const result = document.getElementById("result");
        result.innerHTML = "You Lose!!";
        //if condition become true
        popup.classList.add("show");
        // when 
        close.addEventListener("click",closeGame);
        restart();
    }
    else{
        let binary = false;
        for(let i=0; i<lengthOfDictionary; i++){
            if(!indexOfString[i]){
                binary = true;
                break;
            }
        }
        if(!binary){
            const popup = document.getElementById("myPopup");
            const close = document.getElementById("close");
            const result = document.getElementById("result");
            result.innerHTML="You Win!!"
            //if condition become true
            popup.classList.add("show");
            // when 
            close.addEventListener("click",closeGame);   
            restart();
        }
    }
}

// close button..
function closeGame(){
    const popup = document.getElementById("myPopup");
    popup.classList.remove("show");
    //restart();
}

function restart() {
    chances = 3;
    flag = false;
    count = 0;
    valueOfDictionary = "";
    divArray = [];
    indexOfString = [];
    lengthOfDictionary = 0;
  
    input.innerHTML = "";
  
    const keyboardButtons = document.querySelectorAll(".alphabet");
    keyboardButtons.forEach((button) => button.remove());
  
    inputContainer();
    keyboardCreation();
    clicking();
  }

keyboardCreation();
inputContainer();
clicking();
