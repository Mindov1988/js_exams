const baseUrl = 'http://localhost:3030/jsonstore/records';

const loadButtonElement = document.getElementById('load-records');
const playersListElement = document.getElementById('list');
const addButtonElement = document.getElementById('add-record');
const editButtonElement = document.getElementById('edit-record');
const nameInputElement = document.getElementById('p-name');
const stepsInputElement = document.getElementById('steps');
const caloriesInputElement = document.getElementById('calories');

let currentPlayerId = null;

const loadGame = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();

    playersListElement.innerHTML = '';

    for (const player of Object.values(data)) {
        const changeButtonElement = document.createElement('button');
        changeButtonElement.classList.add('change-btn');
        changeButtonElement.textContent = 'Change';

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('delete-btn');
        deleteButtonElement.textContent = 'Delete';

        const divButtonsElement = document.createElement('div');
        divButtonsElement.classList.add('btn-wrapper')
        divButtonsElement.appendChild(changeButtonElement);
        divButtonsElement.appendChild(deleteButtonElement);

        const pNameElement = document.createElement('p');
        pNameElement.textContent = player.name;

        const pStepsElement = document.createElement('p');
        pStepsElement.textContent = player.steps;

        const pCaloriesElement = document.createElement('p');
        pCaloriesElement.textContent = player.calories;

        const divContentElement = document.createElement('div');
        divContentElement.classList.add('info');
        divContentElement.appendChild(pNameElement);
        divContentElement.appendChild(pStepsElement);
        divContentElement.appendChild(pCaloriesElement);

        const liContainerElement = document.createElement('li');
        liContainerElement.classList.add('record');
        liContainerElement.appendChild(divContentElement);
        liContainerElement.appendChild(divButtonsElement);

        playersListElement.appendChild(liContainerElement);

        changeButtonElement.addEventListener('click', () => {
            currentPlayerId = player._id;

            //  populate input
            nameInputElement.value = player.name;
            stepsInputElement.value = player.steps;
            caloriesInputElement.value = player.calories;

            // activate edit button
            editButtonElement.removeAttribute('disabled');

            // deactivate add button
            addButtonElement.setAttribute('disabled', 'disabled');

            // remove from list
            liContainerElement.remove();
        });

        // Attach on delete
        deleteButtonElement.addEventListener('click', async () => {
            currentPlayerId = player._id;
            console.log(currentPlayerId);
            // delete http request
            await fetch(`${baseUrl}/${currentPlayerId}`, {
                method: 'DELETE'
            });

            // remove from list
            liContainerElement.remove();      

            loadGame();
        });
    };

}

loadButtonElement.addEventListener('click', loadGame);

addButtonElement.addEventListener('click', async () => {
    // get input data
    const newGame = getGameData();

    // create post request
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newGame),
    });

    if (!response.ok) {
        return;
    }

    // clear input fields
    cleatInputFields();
    
    // load all meals
    loadGame();
});

editButtonElement.addEventListener('click', async () => {
    // get data from inputs
    const { name, steps, calories } = getGameData();


    // make a put request
    const response = await fetch(`${baseUrl}/${currentPlayerId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            _id: currentPlayerId,
            name,
            steps,
            calories,
        })
    });

    if (!response.ok) {
        return;
    }

    // load meals
    loadGame();

    // deactivate edit button
    editButtonElement.setAttribute('disabled', 'disabled');

    // activate addbutton
    addButtonElement.removeAttribute('disabled');

    // clear currentMealId
    currentPlayerId = null;

    // clear inputs fields
    cleatInputFields();
    
    // load meals
    loadGame();
});

function getGameData() {
    const name = nameInputElement.value;
    const steps = stepsInputElement.value;
    const calories = caloriesInputElement.value;

    return {name, steps, calories};
};

function cleatInputFields() {
    nameInputElement.value = '';
    stepsInputElement.value = '';
    caloriesInputElement.value = '';
}