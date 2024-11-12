const loadPhone = async (searchText = 12, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
    console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phone
    const showAllButton = document.getElementById("show-all-container");
    if(phones.length > 12 && !isShowAll){
        showAllButton.classList.remove('hidden')
    }
    else{
        showAllButton.classList.add('hidden')
    }
    
    // disply no phones found 
    const noPhone = document.getElementById('no-found-message');
    // console.log(noPhone)
    if(phones.length === 0){
        noPhone.classList.remove('hidden');
    }
    else{
        noPhone.classList.add('hidden')
    }

    console.log('is show all', isShowAll)
    // display only frist 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // 2: Create a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-base-100 p-4 border`;
        // 3: set inner HTML
        phoneCard.innerHTML = `
        <figure>
            <img
            src="${phone.image}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="text-2xl font-bold text-center">${phone.phone_name}</h2>
            <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="text-xl font-bold">$999</p>
            <div class="">
            <button onclick="handleShowDetail('${phone.slug}')"  class="btn bg-[#0D6EFD] text-white text-base font-bold">Show Details</button>
            </div>
        </div>
        `;
        // 4: append Child
        phoneContainer.appendChild(phoneCard);
    });
    // HIde loading spinner
    toggoleLoadingSpinner();
}

// 
const handleShowDetail = async (id) => {
    console.log("cliked show detail", id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data)
    const phone = data.data
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    // const phoneName = document.getElementById('show-detail-phone-name');
    // phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <h3 class="text-2xl font-bold">${phone?.name}</h3>
    <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class="font-bold">Storage :</span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size :</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">ChipSet :</span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory :</span> ${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">Slug :</span> ${phone?.slug}</p>
    <p><span class="font-bold">Brand :</span> ${phone?.brand}</p>
    <p><span class="font-bold">ReleaseDate :</span> ${phone?.releaseDate ? phone.releaseDate : 'No releaseDate available in this device'}</p>
    <p><span class="font-bold">GPS :</span> ${phone?.others?.GPS || 'No GPS available'}</p>
    `
    // Show the model
    show_Details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) => {
    // console.log('I am clicked')
    toggoleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// handle search recap
// const handleSearch2 = () => {
//     toggoleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     console.log(searchText)
//     loadPhone(searchText);
// }

const toggoleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    // loadingSpinner.classList.remove("hidden");
    if(isLoading){
        loadingSpinner.classList.remove("hidden")
    }
    else{
        loadingSpinner.classList.add("hidden")
    }
}

const handleShowAll = () => {
    handleSearch(true);
}


loadPhone()
