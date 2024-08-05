const baseUrl = 'http://localhost:3030/jsonstore/games';

const loadButtonElement = document.getElementById('load-games');
const gameListElement = document.getElementById('games-list');
const addButtonElement = document.getElementById('add-game');
const editButtonElement = document.getElementById('edit-game');
const nameInputElement = document.getElementById('g-name');
const typeInputElement = document.getElementById('type');
const playersInputElement = document.getElementById('players');

let currentGameId = null;

const loadGame = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();

    gameListElement.innerHTML = '';

    for (const game of Object.values(data)) {
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

        const pNameElement = document.createElement('p');
        pNameElement.textContent = game.name;

        const pPlayersElement = document.createElement('p');
        pPlayersElement.textContent = game.players;

        const pTypeElement = document.createElement('p');
        pTypeElement.textContent = game.type;

        const divContentElement = document.createElement('div');
        divContentElement.classList.add('content');
        divContentElement.appendChild(pNameElement);
        divContentElement.appendChild(pPlayersElement);
        divContentElement.appendChild(pTypeElement);

        const divContainerElement = document.createElement('div');
        divContainerElement.classList.add('board-game');
        divContainerElement.appendChild(divContentElement);
        divContainerElement.appendChild(divButtonsElement);

        gameListElement.appendChild(divContainerElement);

        changeButtonElement.addEventListener('click', () => {
            currentGameId = game._id;

            //  populate input
            nameInputElement.value = game.name;
            typeInputElement.value = game.type;
            playersInputElement.value = game.players;

            // activate edit button
            editButtonElement.removeAttribute('disabled');

            // deactivate add button
            addButtonElement.setAttribute('disabled', 'disabled');

            // remove from list
            divContainerElement.remove();
        });

        // Attach on delete
        deleteButtonElement.addEventListener('click', async () => {
            currentGameId = game._id;
            console.log(currentGameId);
            // delete http request
            await fetch(`${baseUrl}/${currentGameId}`, {
                method: 'DELETE'
            });

            // remove from list
            divContainerElement.remove();      

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
    const { name, type, players } = getGameData();


    // make a put request
    const response = await fetch(`${baseUrl}/${currentGameId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            _id: currentGameId,
            name,
            type,
            players,
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
    currentGameId = null;

    // clear inputs fields
    cleatInputFields();
    
    // load meals
    loadGame();
});

function getGameData() {
    const name = nameInputElement.value;
    const type = typeInputElement.value;
    const players = playersInputElement.value;

    return {name, type, players};
};

function cleatInputFields() {
    nameInputElement.value = '';
    typeInputElement.value = '';
    playersInputElement.value = '';
}