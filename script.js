const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');

const dummyTransactions = [
    {id: 1, name:'Bolo de Brigadeiro', amount: -20},
    {id: 2, name:'Salário', amount: 300},
    {id: 3, name:'Torta de Frango', amount: -10},
    {id: 4, name:'Violão', amount: 150}
]


const addTransactionIntoDOM = transaction => {
    
    const operator = transaction.amount < 0 ? '-' : '+';
    //Insere uma Classe na li baseada no valor da propriedade amount da transação:
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    //Método da class list chamado add, para adicionar a classe na li:
    li.classList.add(CSSClass);

    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `;

    transactionsUl.append(li);

};

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions
        .map(transaction => transaction.amount);
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);
    const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2);

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
    dummyTransactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
};

init();
