window.addEventListener("load", solve);

function solve() {
    const placeInputElement = document.getElementById('place');    
    const actionInputElement = document.getElementById('action');
    const personInputElement = document.getElementById('person');
    const addTaskButtonElement = document.getElementById('add-btn');
    const taskListElement = document.getElementById('task-list');
    const donekListElement = document.getElementById('done-list');

    addTaskButtonElement.addEventListener('click', () => {
        const place = placeInputElement.value;
        const action = actionInputElement.value;
        const person = personInputElement.value;

        if (!place || !action || !person) {
            return;
        };

        placeInputElement.value = '';
        actionInputElement.value = '';
        personInputElement.value = '';

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit');
        editButtonElement.textContent = 'Edit';

        const doneButtonElement = document.createElement('button');
        doneButtonElement.classList.add('done');
        doneButtonElement.textContent = 'Done';

        const divButtonsElement = document.createElement('div');
        divButtonsElement.classList.add('buttons');
        divButtonsElement.appendChild(editButtonElement);
        divButtonsElement.appendChild(doneButtonElement);

        const pPlaceElement = document.createElement('p');
        pPlaceElement.textContent = `Place:${place}`;

        const pActionElement = document.createElement('p');
        pActionElement.textContent = `Action:${action}`;

        const pPersonElement = document.createElement('p');
        pPersonElement.textContent = `Person:${person}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(pPlaceElement);
        articleElement.appendChild(pActionElement);
        articleElement.appendChild(pPersonElement);

        const liElement = document.createElement('li');
        liElement.classList.add('clean-task');
        liElement.appendChild(articleElement);
        liElement.appendChild(divButtonsElement);

        taskListElement.appendChild(liElement);

        editButtonElement.addEventListener('click', () => {
            placeInputElement.value = place;
            actionInputElement.value = action;
            personInputElement.value = person;

            liElement.remove();
        });

        doneButtonElement.addEventListener('click', () => {
            const checkButtonsElement = document.querySelector('.buttons');
            checkButtonsElement.remove();

            const deleteButtonElement = document.createElement('button');
            deleteButtonElement.classList.add('delete');
            deleteButtonElement.textContent = 'Delete';

            liElement.appendChild(deleteButtonElement);
            
            donekListElement.appendChild(liElement);

            deleteButtonElement.addEventListener('click', () => {
                donekListElement.innerHTML = '';
            });
        });

    });
};