window.addEventListener("load", solve);

function solve() {
  const typeInputElement = document.getElementById('type');
  const ageInputElement = document.getElementById('age');
  const genderInputElement = document.getElementById('gender');
  const adoptButtonElement = document.getElementById('adopt-btn');
  const checkListElement = document.getElementById('adoption-info');
  const adoptedListElement = document.getElementById('adopted-list');


  adoptButtonElement.addEventListener('click', () => {
      const type = typeInputElement.value;
      const age = ageInputElement.value;
      const gender =  genderInputElement.value;

      console.log(type);
      console.log(age);
      console.log(gender);

      if (!type || !age || !gender) {
          return;
      };

      typeInputElement.value = '';
      ageInputElement.value = '';
      genderInputElement.value = '';


      const doneButtonElement = document.createElement('button');
      doneButtonElement.classList.add('done-btn');

      const editButtonElement = document.createElement('button');
      editButtonElement.classList.add('edit-btn');

      const buttonDivElement = document.createElement('div');
      buttonDivElement.classList.add('buttons');

      buttonDivElement.appendChild(editButtonElement);
      buttonDivElement.appendChild(doneButtonElement);

      const pTypeElement = document.createElement('p');
      pTypeElement.textContent = `Pet:${type}`;

      const pAgeElement = document.createElement('p');
      pAgeElement.textContent = `Age:${age}`;

      const pGenderElement = document.createElement('p');
      pGenderElement.textContent = `Gender:${gender}`;

      const articleElement = document.createElement('article');
      articleElement.appendChild(pTypeElement);
      articleElement.appendChild(pGenderElement);
      articleElement.appendChild(pAgeElement);

      const listElement = document.createElement('li');
      listElement.appendChild(articleElement);
      listElement.appendChild(buttonDivElement);

      checkListElement.appendChild(listElement);

     

      editButtonElement.addEventListener('click', () => {
          typeInputElement.value = type;
          ageInputElement.value = age;
          genderInputElement.value = gender;

          listElement.remove();
      });

      doneButtonElement.addEventListener('click', () => {
          const checkButtonsElement = document.querySelector('.buttons');
          checkButtonsElement.remove();

          const clearButtonElement = document.createElement('button');
          clearButtonElement.textContent = 'Clear';
          clearButtonElement.classList.add('clear-btn');

          listElement.appendChild(clearButtonElement);
          
          adoptedListElement.appendChild(listElement);

          clearButtonElement.addEventListener('click', () => {
              adoptedListElement.innerHTML = '';
          });
      });

  });
};