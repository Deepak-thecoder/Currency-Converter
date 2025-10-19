const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";
const dropdownList = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const currencyFrom = document.querySelector(".from select");
const currencyTo = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for(code in countryList){
//     console.log(code, countryList[code]);
// }

for(let select of dropdownList){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = code;
        if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        else if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input").value;
    let fromCurrency = dropdownList[0].value;
    let toCurrency = dropdownList[1].value;
    if(amount === "" || amount === "0"){
        alert("Please enter a valid amount");
        return;
    }
    btn.innerText = "Converting...";
    const URL = `${BASE_URL}/${currencyFrom.value}_${currencyTo.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data.rate;
    let convertedAmount = amount * exchangeRate;
    msg.innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    btn.innerText = "Converted";
    console.log(convertedAmount);
});  
