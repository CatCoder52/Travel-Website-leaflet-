const searchResult = document.querySelector('#autocomplete-input');
const holidays = document.querySelectorAll('.holidayName');
const countries = document.querySelectorAll('.country');
const locationPictures = document.querySelectorAll('.place');
const inputLocation = document.querySelector('#inputLocation')
function checkItems(e){
    const value = e.target.value.toLowerCase();
    holidays.forEach((holiday, index)=>{
        if(holiday.textContent.toLowerCase().includes(value) 
            ||countries[index].textContent.toLowerCase().includes(value)){
            holiday.parentElement.parentElement.parentElement.style.display="block";
        }else{
            holiday.parentElement.parentElement.parentElement.style.display="none";       
        }
    })
}


searchResult.addEventListener('keyup', e => {
    checkItems(e);
});

searchResult.addEventListener('change', e => {
    checkItems(e);
});



/*due to materialize changing select buttons and I couldnt easily figure out
how to change the value easily other than finding the value in the select options of materialize css and just
perform a click event on it*/
function clicker(number){
    let li = document.querySelector(`.select-wrapper > ul > li:nth-child(${number})`)
    li.click();
}

const send= ()=>{
    const searchBar = document.querySelector('.select-dropdown.dropdown-trigger');
    searchResult.focus();
    searchResult.value = searchBar.value;
    const data = {target:
        {value: searchBar.value
        }
    }
    checkItems(data);
    const yOffset = -300; 
    const y = searchResult.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y});
}