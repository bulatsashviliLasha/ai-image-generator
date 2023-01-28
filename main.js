import './style.css';
import axios from "axios";

const form = document.querySelector('form');
const prompt = document.querySelector('#prompt')

form.onsubmit = async(e) => {
    e.preventDefault();
    showSpinner();
    const data = new FormData(form);
    try {
        const {image} = (await axios.post('http://localhost:8080/dream', {
            prompt: data.get('prompt')
        })).data;
        const result = document.querySelector('#result');
        result.innerHTML = `<img src="${image}"/>`;
    }catch (e) {
        alert(e.message)
        console.error(e.message)
    }


    hideSpinner();
    prompt.value = '';
}

const button = document.querySelector('button');
function showSpinner(){
    button.disabled = true;
    button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>'
}

function hideSpinner(){
    button.disabled = false;
    button.innerHTML = 'Dream';
}
