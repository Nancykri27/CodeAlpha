let button = document.querySelector(".btn");
let birthdayE1 = document.querySelector("#birthday")
let resultE1 = document.querySelector("#result");
button.addEventListener("click",calculateAge);

function calculateAge(){
    const birthdayValue = birthdayE1.value
    // console.log(birthdayValue);
    if(birthdayValue === ""){
        alert("Please enter your birthday")
    }
    else {
        let age = getAge(birthdayValue);
        resultE1.innerText = `Your age is ${age.years} years, ${age.months} months, and ${age.days} days `;
        
    }
}
function getAge(birthdayValue){
    const CurrentDate = new Date();
    const birthDate = new Date(birthdayValue);

    let years = CurrentDate.getFullYear()-birthDate.getFullYear();
    let months =CurrentDate.getMonth()-birthDate.getMonth();
    let days = CurrentDate.getDate()-birthDate.getDate();
    console.log(months);
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }    
    if (days < 0) {
        const prevMonth = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() - 1, birthDate.getDate());
        days = Math.floor((CurrentDate - prevMonth) / (1000 * 60 * 60 * 24));
    }
    return { years, months, days };
}