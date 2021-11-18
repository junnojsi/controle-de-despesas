const transactionsUl = document.querySelector('#transactions');

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

/*
Função que preenche as informações do estado da aplicação quando 
a página for carregada. Adiciona as transações no DOM:
*/

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDOM);
};

init();
