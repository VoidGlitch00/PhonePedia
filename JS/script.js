const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResults(data.data.slice(0, 20)))
}

const displaySearchResults = phones => {
    const searchResult = document.getElementById("search-result");
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card rounded-3 align-items-center" style="background-color: lavender;">
        <img src="${phone.image}" class="card-img-top w-75" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <button onclick="loadDetails('${phone.slug}')" class="btn btn-outline-info text-black px-5 te" type="button"
            id="details-button">Details</button>
        </div>
    </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data))
}

const displayPhoneDetails = details => {
    console.log(details);
    const phoneDetails = document.getElementById("display-details");
    const div = document.createElement("div");
    div.classList.add("card", "container", "align-items-center", "my-4");
    div.innerHTML = `
    <img src="${details.data.image}" class="card-img-top w-25" alt="...">
            <div class="card-body">
                <h5 class="card-title">${details.data.brand}</h5>
                <p class="card-text">${details.name}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>   
    `;
    phoneDetails.appendChild(div);
}














// ${
//     slug.mainFeatures.releaseDate
//     ? slug.mainFeatures.releaseDate
//     : "Not Avaiable "
//     }
