const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch (url)
    .then(res => res.json())
    .then(data => displaySearchResults(data.data))
}

const displaySearchResults = phones => {
    const searchResult = document.getElementById("search-result");
    phones.forEach(phone => {
        console.log(phone);
    })    
}