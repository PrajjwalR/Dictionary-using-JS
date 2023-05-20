const input = document.getElementById('input');
const infoText = document.getElementById('info-text');
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById('title')
const meaning = document.getElementById('meaning')
const audio = document.getElementById('audio')

async function fetchAPI(word) {
    try {
        infoText.style.display = "block"
        meaningContainer.style.display = "none "
        infoText.innerText = `Searching for your word:-
         "${word}"`

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        const result = await response.json();

        if (result.title) {
            meaningContainer.style.display = "block "
            title.innerHTML = word
            meaning.innerHTML = 'N/A'
            audio.style.display = "none"
            infoText.innerHTML = "Word not found"
        } else {
            infoText.style.display = "none"
            meaningContainer.style.display = "block "
            audio.style.display = "inline-flex"
            title.innerHTML = result[0].word
            meaning.innerHTML = result[0].meanings[0].definitions[0].definition;
            audio.src = result[0].phonetics[0].audio
        }
    } catch (error) {
        infoText.innerText = `An error occured, try again later`
    }
}

input.addEventListener('keyup', (e) => {
    if (e.target.value && e.key === 'Enter') {
        fetchAPI(e.target.value)
    }
})