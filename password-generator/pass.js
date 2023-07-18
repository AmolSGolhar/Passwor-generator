const inputslider = document.querySelector("[data-lengthslider]");
const lengthdisplay = document.querySelector("[data-lenghtno]");
const passworddisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]")
const copymsg = document.querySelector("[data-copyMsg]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#numbers");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generatepassword");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~!@#$%^&*()_+{}-/,.?<>?';
let password = "";
let passwordLength = 10;
let checkcount =0; 
handleslider();

setindicator("#ccc");

function handleslider(){
     inputslider.value = passwordLength;
     lengthdisplay.innerText = passwordLength;

     const min = inputslider.min;
     const max = inputslider.max;
     inputslider.style.backgroundSize =((passwordLength -min)*100/(max-min))+"% 100%" 
}

function setindicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getrndinteger(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

 function generaterandomnumber(){
    return getrndinteger(0,9);
 }

 function generatuppercase(){
    return String.fromCharCode(getrndinteger(65,91));
 }

 function generatlowercase(){
    return String.fromCharCode(getrndinteger(97,123));
 }  

 function generatesymbols(){
     const randNum = getrndinteger(0,symbols.length);
     return symbols.charAt(randNum);
 }

 function calcstrength(){
     
    let hasupper = false;
    let haslower = false ;
    let hasnumber = false ;
    let hassym = false;
    if(uppercasecheck.checked) hasupper=true;
    if(lowercasecheck.checked) haslower=true;
    if(numberscheck.checked) haslower=true;
    if(symbolscheck.checked) hassym=true;

    if(hasupper && haslower && (hasnumber||hassym) && passwordLength >= 8)
     {
        setindicator("#0f0");
     }
     else if( (haslower||hasupper)&&(hasnumber||hassym)&& passwordLength>=6)
     {
        setindicator("#ff0");
     }
     else
     {
        setindicator("#f00");
     }

 }

 async function copycontent(){

    try{
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText = "copied";
    }
    catch(e){
        copymsg.innerText = "Failed";
    }
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active");
    }, 2000);
 }

 function shufflepassword(array){
    for(let i = array.length -1 ; i>0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handlecheckboxchange(){
    checkcount = 0;
    allcheckbox.forEach((checkbox) =>{
       if(checkbox.checked){
           checkcount++;
       }
    })
    if(passwordLength < checkcount){
           passwordLength = checkcount ;
           handleslider(); 
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handlecheckboxchange)
})
  
inputslider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleslider();
})

copyBtn.addEventListener('click',() => {
    if(passworddisplay.value){
        copycontent();
    }
})

generatebtn.addEventListener('click',() => {
       if(checkcount == 0) 
            return ;
       if(passwordLength<checkcount){
        passwordLength =checkcount;
        handleslider();
       }
       console.log("Starting the Journey");
        password = "";
        let funcarr = [];
        if(uppercasecheck.checked)
        {
            funcarr.push(generatuppercase);
        }
        if(lowercasecheck.checked){
            funcarr.push(generatlowercase);
        }
        if(numberscheck.checked){
            funcarr.push(generaterandomnumber);
        }
        if(symbolscheck.checked){
            funcarr.push(generatesymbols);
         }
         for(let i=0; i<funcarr.length; i++){
            password += funcarr[i]();
         }
         console.log("COmpulsory adddition done");
         for(let i=0 ; i<passwordLength-funcarr.length;i++){
            let randindex = getrndinteger(0,funcarr.length);
            console.log("randIndex" + randindex);
            password += funcarr[randindex]();
         }
         console.log("Remaining adddition done");

         password = shufflepassword(Array.from(password));
         console.log("Shuffling done");
         passworddisplay.value = password;
         console.log("UI adddition done");
         calcstrength();
}) ;