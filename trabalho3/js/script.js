// Consulta 1: Feriados Nacionais
async function fetchFeriados() {
    try {
        const response = await fetch('https://brasilapi.com.br/api/feriados/v1/2024');
        const data = await response.json();
        document.getElementById('result1').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('result1').textContent = `Erro ao buscar feriados: ${error}`;
    }
}
// Consulta 2: Taxas de Câmbio
async function fetchTaxasCambio() {
    try {
        const response = await fetch('https://brasilapi.com.br/api/taxas/v1');
        const data = await response.json();
        document.getElementById('result2').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('result2').textContent = `Erro ao buscar taxas de câmbio: ${error}`;
    }
}
// Consulta 3: CEP
document.getElementById('cepForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const cep = document.getElementById('cepInput').value;
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        const data = await response.json();
        document.getElementById('result3').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('result3').textContent = `Erro ao buscar informações do CEP: ${error}`;
    }
});
// Consulta 4: Banco
document.getElementById('bankForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const bankCode = document.getElementById('bankInput').value;
    try {
        const response = await fetch(`https://brasilapi.com.br/api/banks/v1/${bankCode}`);
        const data = await response.json();
        document.getElementById('result4').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('result4').textContent = `Erro ao buscar informações do banco: ${error}`;
    }
});
// Promise.race
document.getElementById('raceButton').addEventListener('click', function () {
    const api1 = fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json());
    const api2 = fetch('https://jsonplaceholder.typicode.com/posts/2').then(response => response.json());
    const api3 = fetch('https://jsonplaceholder.typicode.com/posts/3').then(response => response.json());
    Promise.race([api1, api2, api3])
        .then(result => {
            document.getElementById('raceResult').textContent = JSON.stringify(result, null, 2);
        })
        .catch(error => {
            document.getElementById('raceResult').textContent = `Erro na Promise.race: ${error}`;
        });
});
// Promise.all
document.getElementById('allButton').addEventListener('click', function () {
    const api1 = fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json());
    const api2 = fetch('https://jsonplaceholder.typicode.com/posts/2').then(response => response.json());
    const api3 = fetch('https://jsonplaceholder.typicode.com/posts/3').then(response => response.json());
    Promise.all([api1, api2, api3])
        .then(results => {
            document.getElementById('allResult').textContent = JSON.stringify(results, null, 2);
        })
        .catch(error => {
            document.getElementById('allResult').textContent = `Erro na Promise.all: ${error}`;
        });
});
// Carregar consultas programadas
fetchFeriados();
fetchTaxasCambio();
