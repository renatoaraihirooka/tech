document.addEventListener('DOMContentLoaded', function() {
    const dolarValueElement = document.getElementById('dolar-value');

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const brlRate = data.rates.BRL.toFixed(2); // Formata o valor com 2 casas decimais
            dolarValueElement.textContent = `1 USD = ${brlRate} BRL`;
        })
        .catch(error => {
            dolarValueElement.textContent = 'Erro ao carregar o valor do dólar.';
            console.error('Erro:', error);
        });
});