const apiKey = '665ecd56dfc08dbb50feb8b8f5034e28';

function haeSaa(city, elementId) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fi&units=metric`)
        .then(response => response.json())
        .then(data => {
            let teksti = `<h2>Sää ${city}</h2>`;
            teksti += `<p>Lämpötila: ${data.main.temp}°C</p>`;
            teksti += `<p>Tuuli: ${data.wind.speed} m/s</p>`;
            teksti += `<p>${data.weather[0].description}</p>`;
            document.getElementById(elementId).innerHTML = teksti;
        })
        .catch(error => {
            document.getElementById(elementId).innerHTML = "<p>Säätietoja ei voitu hakea.</p>";
        });
}

haeSaa('Helsinki', 'weatherInfo');



function saveDiary() {
    const diaryText = document.getElementById('diaryEntry').value;
    if (diaryText.trim() !== "") {
        const savedDiary = getDiaryFromStorage();
        savedDiary.push(diaryText);
        localStorage.setItem('diary', JSON.stringify(savedDiary));
        loadSavedDiary();
        document.getElementById('diaryEntry').value = "";
    }
}

function getDiaryFromStorage() {
    const savedDiary = localStorage.getItem('diary');
    return savedDiary ? JSON.parse(savedDiary) : [];
}

function loadSavedDiary() {
    const savedDiary = getDiaryFromStorage();
    const savedDiaryContainer = document.getElementById('savedDiary');
    savedDiaryContainer.innerHTML = '';


    savedDiary.forEach((entry, index) => {
        const diaryItem = document.createElement('div');
        diaryItem.classList.add('diary-item');
        diaryItem.innerHTML = `
            <p>${entry}</p>
            <button class="btn btn-danger" onclick="deleteDiaryEntry(${index})">Poista</button>
        `;
        savedDiaryContainer.appendChild(diaryItem);
    });
}

function deleteDiaryEntry(index) {
    const savedDiary = getDiaryFromStorage();
    savedDiary.splice(index, 1);
    localStorage.setItem('diary', JSON.stringify(savedDiary));
    loadSavedDiary();
}

function clearAllDiary() {
    localStorage.removeItem('diary');
    loadSavedDiary();
}