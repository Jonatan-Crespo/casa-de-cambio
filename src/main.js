import './style.css'
import Swal from 'sweetalert2';

const inputCoin = document.getElementById('moeda');
const buttonCoin = document.getElementById('search-coin');

buttonCoin.addEventListener('click', (event) => {
    event.preventDefault();
    const apiKey = import.meta.env.VITE_SOME_KEY;

    if (inputCoin.value.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "Oops, campo vazio",
            text: "Por favor digite a moeda que queira saber seus valores"
        });
        return null;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${inputCoin.value}`)
        .then((response) => response.json())
        .then(data => {
            const arrayCoins = Object.entries(data.conversion_rates);
            table.innerHTML = '';

            const titleRate = document.getElementById('title-rate');
            titleRate.innerText = `Valores referentes a 1 ${arrayCoins[0][0]}`;

            arrayCoins.forEach(([rateName, rateValue]) => {
                const table = document.getElementById('table');
                const card = document.createElement('li');
                card.className = 'card';
                card.innerHTML = `
                        <div>
                             <span class="material-symbols-outlined">paid</span>
                            <p>${rateName}</p>
                        </div>
                         <p class="value-rate">${rateValue}</p>
                `;
                
                table.appendChild(card);
            });
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops, moeda inválida",
                text: "Por favor passe uma moeda válida."
            });
        });

})
