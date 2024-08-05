window.addEventListener("load", solve);

function solve() {
    const nameInputElement = document.getElementById('name');
    const phoneInputElement = document.getElementById('phone');
    const categoryInputElement = document.getElementById('category');
    const addButtonElement = document.getElementById('add-btn');
    const checkListElement = document.getElementById('check-list');
    const contactListElement = document.getElementById('contact-list');


    addButtonElement.addEventListener('click', () => {
        const name = nameInputElement.value;
        const phone = phoneInputElement.value;
        const category = categoryInputElement.value;

        if (!name || !phone || !category) {
            return;
        };

        nameInputElement.value = '';
        phoneInputElement.value = '';
        categoryInputElement.value = '';

        const saveButtonElement = document.createElement('button');
        saveButtonElement.classList.add('save-btn');

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('edit-btn');

        const buttonDivElement = document.createElement('div');
        buttonDivElement.classList.add('buttons');

        buttonDivElement.appendChild(editButtonElement);
        buttonDivElement.appendChild(saveButtonElement);

        const pNameElement = document.createElement('p');
        pNameElement.textContent = `name:${name}`;

        const pPhoneElement = document.createElement('p');
        pPhoneElement.textContent = `phone:${phone}`;

        const pCategoryElement = document.createElement('p');
        pCategoryElement.textContent = `category:${category}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(pNameElement);
        articleElement.appendChild(pPhoneElement);
        articleElement.appendChild(pCategoryElement);

        const listElement = document.createElement('li');
        listElement.appendChild(articleElement);
        listElement.appendChild(buttonDivElement);

        checkListElement.appendChild(listElement);

       

        editButtonElement.addEventListener('click', () => {
            nameInputElement.value = name;
            phoneInputElement.value = phone;
            categoryInputElement.value = category;

            listElement.remove();
        });

        saveButtonElement.addEventListener('click', () => {
            const checkButtonsElement = document.querySelector('.buttons');
            checkButtonsElement.remove();

            const deleteButtonElement = document.createElement('button');
            deleteButtonElement.classList.add('del-btn');

            listElement.appendChild(deleteButtonElement);
            
            contactListElement.appendChild(listElement);

            deleteButtonElement.addEventListener('click', () => {
                contactListElement.innerHTML = '';
            });
        });

    });
};
