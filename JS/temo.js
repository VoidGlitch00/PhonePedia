// data stored in global variables 
const errorText = document.getElementById('error-message');
errorText.style.display = 'none';
const phoneDetails = document.getElementById('phone-details');
const searchResult = document.getElementById('search-result');

// main search function for data loading
const searchPhone = () => {
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;

        // clear input data after search 
        searchField.value = '';

        // error handling
        if (searchText == '') {
            errorText.style.display = 'block';
            errorText.innerHTML = "Please write something to search"
            phoneDetails.innerHTML = "";
            searchResult.textContent = '';
        } else {
            // load data
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
            fetch(url)
                .then(res => res.json())
                .then(data => displaySearchResult(data.data))
        }
    }
    // function for displaying search result

const displaySearchResult = phones => {

        searchResult.textContent = '';

        // clearing details after new search
        phoneDetails.innerHTML = "";
        if (phones.length == 0) {
            //error handling
            errorText.innerHTML = "No phone/device found according to your search"
            errorText.style.display = 'block';
        }

        // showing 20 result
        (phones.slice(0, 20)).forEach(phone => {

            const div = document.createElement('div');

            div.classList.add('col-lg-4');

            // pushing data into html element
            div.innerHTML = `
            <div class="border bg-light p-2 rounded"  >

            <img class=" mx-auto d-block m-2" src="${phone.image}"/>
                <h5> ${phone.phone_name}</h5>
                <p> Brand : ${phone.brand}</p>
                <div class="d-grid">
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Details</button>
                </div>
            </div>
    
        `
            searchResult.appendChild(div);
            errorText.style.display = 'none';
        })
    }
    // function for pushing fetching phones data 
const loadPhoneDetail = (slug) => {

        const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhoneDetail(data.data));
    }
    // function for pushing individual phones data
const displayPhoneDetail = (details) => {

    const div = document.createElement('div');
    div.classList.add('card');

    // storing data with error handling when data is not available 
    let mainFeatures = details.mainFeatures ? details.mainFeatures : '';
    let sensor = details.mainFeatures.sensors ? details.mainFeatures.sensors : '';
    let other = details.others ? details.others : "";

    // clearing previous data shown on page
    phoneDetails.innerHTML = "";
    errorText.style.display = 'none';
    // scrolling to top
    window.scrollTo(0, 250);

    // pushing data into html element
    div.innerHTML = `
    
    <div class="card-body bg-light rounded ">
    <img src="${details.image}" class="card-img-top mx-auto d-block w-50 my-2" alt="...">
        <h5 class="card-title"> Device Name : ${details.name}</h5>
        <p class="card-text"> <strong>Brand</strong> : ${details.brand}</p>
        <p class="card-text"> <strong>Release Date</strong> : ${details.releaseDate ? details.releaseDate : "No release Date found" }</p>
        <p><strong>Main Features : </strong></p>
        <ul class="list-group list-unstyled">
            <li>Chipset : ${mainFeatures.chipSet ? mainFeatures.chipSet : " "}</li>
            <li>Display-Size : ${mainFeatures.displaySize ? mainFeatures.displaySize : " "}</li>
            <li>Memory : ${mainFeatures.memory ? mainFeatures.memory : " "}</li>
            <li>Storage : ${mainFeatures.storage ? mainFeatures.storage : " "}</li>
        </ul>
        <br>
        <p><strong>Sensors : </strong>  ${sensor.join()}</p>
        <p><strong>Other Informations : </strong></p>
        <ul class="list-group list-unstyled">
            <li>Bluetooth : ${other.Bluetooth ? other.Bluetooth : "No Data Available"}</li>
            <li>GPS : ${other.GPS ? other.GPS : "No Data Available"}</li>
            <li>NFC : ${other.NFC ? other.NFC : "No Data Available"} </li>
            <li>Radio : ${other.Radio ? other.Radio : "No Data Available" }</li>
            <li>USB : ${other.USB ? other.USB : "No Data Available"} </li>
            <li>WLAN : ${other.WLAN ? other.WLAN : "No Data Available"} </li>
        </ul>
    </div>
    `;
    phoneDetails.appendChild(div);

}