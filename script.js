const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransaction = ID => {
    transactions = transactions
        .filter(transaction => transaction.id !== ID);
    updateLocalStorage();
    init();
};

const addTransactionIntoDOM = ({ amount, name, id }) => {
    
    const operator = amount < 0 ? '-' : '+';
    //Insere uma Classe na li baseada no valor da propriedade amount da transação:
    const CSSClass = amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(amount);
    const li = document.createElement('li');

    //Método da class list chamado add, para adicionar a classe na li:
    li.classList.add(CSSClass);

    li.innerHTML = `
        ${name} <span>${operator} R$ ${amountWithoutOperator}
        </span>
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `;

    transactionsUl.append(li);

};

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({ amount }) => amount);

    const total = getTotal(transactionsAmounts);
    const income = getIncome(transactionsAmounts);
    const expense = getExpenses(transactionsAmounts);

    //Exibir os valores de Despesas, Receitas e Saldo Atual:
    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
};

/*
Função que preenche as informações do estado da aplicação quando 
a página for carregada. Adiciona as transações no DOM:
*/

const init = () => {
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
};

init();

//Adicionando a transação no Local Storage:
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

//Função que gera valores para o Id (de 0 a 1000):
const generateId = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateId(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    });    
};

const cleanInputs = () => {
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
};

const handleFormSubmit = event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

    if(isSomeInputEmpty) {
        alert('Por favor, preencha tanto o nome quanto o valor da transação.');
        return;
    };

    addToTransactionsArray(transactionName, transactionAmount);
    init();
    updateLocalStorage();
    cleanInputs();

};

// Adicionando Event Listener no Form:
form.addEventListener('submit', handleFormSubmit); 