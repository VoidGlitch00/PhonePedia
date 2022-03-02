const errorText = document.getElementById("error");
errorText.style.display = "none";

const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = "";
    if (searchText == "") {
        errorText.style.display = "block";
        errorText.innerHTML = "Please write your phone name to search"
        phoneDetails.innerHTML = "";
        searchResult.textContent = "";
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResults(data.data.slice(0, 20)))
    }
}


const phoneDetails = document.getElementById("display-details");
const displaySearchResults = phones => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    phoneDetails.innerHTML = "";
    if (phones.length == 0) {
        errorText.innerHTML = "No phone/device found according to your search"
        errorText.style.display = "block";
    }
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card rounded-3 align-items-center" style="background-color: lavender;">
        <img src="${phone.image}" class="card-img-top w-75" alt="...">
        <div class="card-body">
          <h5 class="card-title"><strong>${phone.phone_name}</strong></h5>
          <h5 class="card-title">${phone.brand}</h5>
          <button onclick="loadDetails('${phone.slug}')" class="btn btn-outline-info text-black px-5 te" type="button"
            id="details-button">Details</button>
        </div>
    </div>
        `;
        searchResult.appendChild(div);
        errorText.style.display = "none";
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
    const div = document.createElement("div");
    div.classList.add("card", "container", "align-items-center", "my-4");

    // data storing by error handling
    const mainFeatures = details.mainFeatures ? details.mainFeatures: "";
    const sensor = details.mainFeatures.sensors ? details.mainFeatures.sensors: "";
    const other = details.others ? details.others : "";

    phoneDetails.innerHTML = "";
    errorText.style.display = "none";

    // scroll to top
    window.scrollTo(0, 250);

    div.innerHTML = `
    <div class="card-body bg-light rounded ">
    <img src="${details.data.image}" class="card-img-top mx-auto d-block w-50 my-2" alt="...">
        <h5 class="card-title">Device Name: ${details.name}</h5>
        <p class="card-text"><strong>Brand</strong>: ${details.brand}</p>
        <p class="card-text"><strong>Release Date</strong>: ${details.releaseDate ? details.releaseDate : "No release Date found"}</p>
        <p><strong>Main Features: </strong></p>
        <ul class="list-group list-unstyled">
            <li>Chipset: ${mainFeatures.chipSet ? mainFeatures.chipSet : " "}</li>
            <li>Display-Size: ${mainFeatures.displaySize ? mainFeatures.displaySize : " "}</li>
            <li>Memory : ${mainFeatures.memory ? mainFeatures.memory : " "}</li>
            <li>Storage : ${mainFeatures.storage ? mainFeatures.storage : " "}</li>
        </ul>
        <br>
        <p><strong>Sensors: </strong>${sensor.join()}</p>
        <p><strong>Other Informations: </strong></p>
        <ul class="list-group list-unstyled">
            <li>Bluetooth : ${other.Bluetooth ? other.Bluetooth : "No"}</li>
            <li>GPS: ${other.GPS ? other.GPS : "No"}</li>
            <li>NFC: ${other.NFC ? other.NFC : "No"} </li>
            <li>Radio: ${other.Radio ? other.Radio : "No"}</li>
            <li>USB: ${other.USB ? other.USB : "No"} </li>
            <li>WLAN: ${other.WLAN ? other.WLAN : "No"} </li>
        </ul>
    </div>
    `;
    phoneDetails.appendChild(div);
}














// ${
//     slug.mainFeatures.releaseDate
//     ? slug.mainFeatures.releaseDate
//     : "Not Avaiable "
//     }
