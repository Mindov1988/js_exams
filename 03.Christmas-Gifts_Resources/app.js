const baseUrl = 'http://localhost:3030/jsonstore/gifts';

const loadPreesentsButtonElement = document.getElementById('load-presents');
const giftListElement = document.getElementById('gift-list');
const addButtonElement = document.getElementById('add-present');
const editButtonElement = document.getElementById('edit-present');
const presentInputElement = document.getElementById('gift');
const toInputElement = document.getElementById('for');
const priceInputElement = document.getElementById('price');

let currentPresentId = null;


const loadPresents = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();

    giftListElement.innerHTML = '';

    for (const present of Object.values(data)) {
        const changeButtonElement = document.createElement('button');
        changeButtonElement.classList.add('change-btn');
        changeButtonElement.textContent = 'Change';

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('delete-btn');
        deleteButtonElement.textContent = 'Delete';

        const divButtonsElement = document.createElement('div');
        divButtonsElement.classList.add('buttons-container')
        divButtonsElement.appendChild(changeButtonElement);
        divButtonsElement.appendChild(deleteButtonElement);

        const pGiftElement = document.createElement('p');
        pGiftElement.textContent = present.gift;

        const pToElement = document.createElement('p');
        pToElement.textContent = present.for;

        const pPriceElement = document.createElement('p');
        pPriceElement.textContent = present.price;

        const divContentElement = document.createElement('div');
        divContentElement.classList.add('content');
        divContentElement.appendChild(pGiftElement);
        divContentElement.appendChild(pToElement);
        divContentElement.appendChild(pPriceElement);

        const divContainerElement = document.createElement('div');
        divContainerElement.classList.add('gift-sock');
        divContainerElement.appendChild(divContentElement);
        divContainerElement.appendChild(divButtonsElement);

        giftListElement.appendChild(divContainerElement);

        changeButtonElement.addEventListener('click', () => {
            currentPresentId = present._id;

            //  populate input
            presentInputElement.value = present.gift;
            toInputElement.value = present.for;
            priceInputElement.value = present.price;

            // activate edit button
            editButtonElement.removeAttribute('disabled');

            // deactivate add button
            addButtonElement.setAttribute('disabled', 'disabled');

            // remove from list
            divContainerElement.remove();
        });

        // Attach on delete
        deleteButtonElement.addEventListener('click', async () => {
            currentPresentId = present._id;
            console.log(currentPresentId);
            // delete http request
            await fetch(`${baseUrl}/${currentPresentId}`, {
                method: 'DELETE'
            });

            // remove from list
            divContainerElement.remove();      

            loadPresents();
        });
    }
}

loadPreesentsButtonElement.addEventListener('click', loadPresents);

addButtonElement.addEventListener('click', async () => {
    // get input data
    const newPresent = getGiftData();

    // create post request
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newPresent),
    });

    if (!response.ok) {
        return;
    }

    // clear input fields
    cleatInputFields();
    
    // load all meals
    loadPresents();
});

editButtonElement.addEventListener('click', async () => {
    // get data from inputs
    const { gift, for: to, price } = getGiftData();


    // make a put request
    const response = await fetch(`${baseUrl}/${currentPresentId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            _id: currentPresentId,
            gift,
            for: to,
            price,
        })
    });

    if (!response.ok) {
        return;
    }

    // load meals
    loadPresents();

    // deactivate edit button
    editButtonElement.setAttribute('disabled', 'disabled');

    // activate addbutton
    addButtonElement.removeAttribute('disabled');

    // clear currentMealId
    currentPresentId = null;

    // clear inputs fields
    cleatInputFields();
    
    // load meals
    loadPresents();
});

function getGiftData() {
    const gift = presentInputElement.value;
    const to = toInputElement.value;
    const price = priceInputElement.value;

    return {gift , for: to, price};
};

function cleatInputFields() {
    presentInputElement.value = '';
    toInputElement.value = '';
    priceInputElement.value = '';
}