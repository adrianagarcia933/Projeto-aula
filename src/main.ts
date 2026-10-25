import promptSync = require('prompt-sync');
import {cadastrarCliente, listarClientes} from './clientes';
import type {Cliente} from './types'

import { buscarProdutoPorId, cadastrarProduto, listarProdutos } from './produtos';
import type { Produto } from './types';

import { adicionarAoCarrinho,removerDoCarrinho,alterarQuantidadeCarrinho, calcularTotalCarrinho, listarCarrinho } from './carrinho';

import { fazerPedido, listarPedido, listarPedidosPorCliente } from './pedidos';


const prompt = promptSync({sigint: true});

console.log('\n ======= GESTÃO DE CLIENTES =======');

const clientesCadastrados = listarClientes();

if (clientesCadastrados.length > 0) {
    console.log("Clientes já cadastrados no sistema:");
    clientesCadastrados.forEach(cli => {
        console.log(`- ID: ${cli.id} | Nome: ${cli.nome} | E-mail: ${cli.email}`);
    });

    const acaoCliente = prompt('Deseja cadastrar um novo cliente? (s/n): ').toLowerCase();
    
    if (acaoCliente === 's') {
        let cadastroRealizado = false;
        while (!cadastroRealizado) {
            const nomeInput: string = prompt('Digite o nome do cliente: ');
            const idInput: number = Number(prompt('Digite o Id do cliente: '));
            const emailInput: string = prompt('Digite o e-mail do Cliente: ');

            const novoCliente: Cliente = {
                nome: nomeInput,
                id: idInput,
                email: emailInput,
            }

            cadastroRealizado = cadastrarCliente(novoCliente);
        }
    } else {
        console.log("Prosseguindo com os clientes já cadastrados...");
    }
} else {
    console.log("Nenhum cliente cadastrado. Cadastre o primeiro cliente para continuar:");
    let cadastroRealizado = false;

    while (!cadastroRealizado) {
        const nomeInput: string = prompt('Digite o nome do cliente: ');
        const idInput: number = Number(prompt('Digite o Id do cliente: '));
        const emailInput: string = prompt('Digite o e-mail do Cliente: ');

        const novoCliente: Cliente = {
            nome: nomeInput,
            id: idInput,
            email: emailInput,
        }

        cadastroRealizado = cadastrarCliente(novoCliente);
    }
}


console.log ('\n======= CADASTRO DE PRODUTOS =======');

const idProdutoImput: number = Number(prompt('Digite o ID do Produto: '));
const produtoimput: string = prompt('Digite o Produto: ');
const categoriaImput: string = prompt('Digite a categoria do produto: ');
const precoImput: number = Number(prompt('Digite o preco do produto: '));
const estoqueImput: number = Number(prompt('Digite o estoque do produto: '));

const novoProduto: Produto = {
     id : idProdutoImput,
     produto : produtoimput,
     categoria : categoriaImput,
     preco : precoImput,
     estoque : estoqueImput,
}

cadastrarProduto(novoProduto);

console.log("\n====== LISTA DE PRODUTOS ======");
listarProdutos().forEach(prod => {
    console.log(`- ID: ${prod.id} | Produto: ${prod.produto} | Categoria: ${prod.categoria} | Preço: R$ ${prod.preco} | Estoque: ${prod.estoque}`);
});

console.log("\n====== CARRINHO ======");
const idCliente = Number(prompt('Digite o ID do Cliente: '));
const cliente = buscarProdutoPorId(idCliente);


const idProd = Number(prompt("Digite o ID do produto: "));
const qtd = Number(prompt("Digite a quantidade desejada: "));
const produto = buscarProdutoPorId(idProd);


if (produto) {
    adicionarAoCarrinho(idCliente,produto, qtd);
        } else {
    console.log("Produto não encontrado!");
    }

console.log("\n===== ITENS NO CARRINHO =====");
listarCarrinho().forEach(item => {
    console.log(`- Produto: ${item.produto.produto} | Qtd: ${item.quantidade} | Subtotal: R$ ${item.subtotal}`);
});

console.log("\nO que deseja fazer?");
console.log("1 - Alterar quantidade de um produto");
console.log("2 - Excluir um item do carrinho");
console.log("3 - Continuar para finalizar o pedido");

const opcaoCarrinho = Number(prompt("\nEscolha uma opção: "));

    if (opcaoCarrinho === 1) {
        const idProdAlterar = Number(prompt("Digite o ID do produto para alterar a quantidade: "));
        
            const produtoEncontrado=buscarProdutoPorId(idProdAlterar);
        let quantidadeValida = false;
    
    if (!produtoEncontrado) {
        console.log (' Produto não encontrado');
    }
        while (!quantidadeValida && produtoEncontrado) {
            const novaQtd = Number(prompt("Digite a nova quantidade: "));
            quantidadeValida = alterarQuantidadeCarrinho(idProdAlterar, novaQtd);
        }
    }
    
 else if (opcaoCarrinho === 2) {
    const idProdRemover = Number(prompt("Digite o ID do produto que deseja remover do carrinho: "));
    removerDoCarrinho(idProdRemover);
    console.log("Item removido do carrinho!");
} else {
    console.log(" Prosseguir para fechamento do pedido...");
}


console.log("\n======= FINALIZAR PEDIDO =======");
const idClienteInput = Number(prompt("Digite o ID do cliente: "));
const sucesso = fazerPedido(idClienteInput);

if (sucesso) {
    console.log("\n======= HISTÓRICO DE PEDIDOS ========");
    listarPedido().forEach(ped => {
        console.log(`Pedido ID: ${ped.id} | Cliente: ${ped.cliente} | Total: R$ ${ped.total} | Data: ${ped.data}`);
    });
}

if (sucesso) {
    console.log("Pedido finalizado com sucesso!");
    
    
    console.log("\n========= ESTOQUE ATUALIZADO APÓS A COMPRA =========");
    listarProdutos().forEach(prod => {
        console.log(`- ID: ${prod.id} | Produto: ${prod.produto} | Estoque Restante: ${prod.estoque} unidades`);
    });
}


function relatorioClientes() {
    console.log("\n========= RELATÓRIO DE CLIENTES CADASTRADOS =========");
    const clientes = listarClientes();
    if (clientes.length === 0) {
        console.log("Nenhum cliente registado até o momento.");
        return;
    }
    clientes.forEach(cli => {
        console.log(`- ID: ${cli.id} | Nome: ${cli.nome} | E-mail: ${cli.email}`);
    });
}

function relatorioEstoqueAtualizado() {
    console.log("\n========= RELATÓRIO DE ESTOQUE ATUALIZADO =========");
    listarProdutos().forEach(prod => {
        console.log(`- ID: ${prod.id} | Produto: ${prod.produto} | Categoria: ${prod.categoria} | Preço: R$ ${prod.preco} | Estoque: ${prod.estoque} uni.`);
    });
}

function relatorioGeralPedidos() {
    console.log("\n========= RELATÓRIO GERAL DE PEDIDOS =========");
    const pedidos = listarPedido();
    if (pedidos.length === 0) {
        console.log("Nenhum pedido registado até o momento.");
        return;
    }
    pedidos.forEach(ped => {
        console.log(`- Pedido ID: ${ped.id} | Cliente ID: ${ped.cliente} | Total: R$ ${ped.total} | Data: ${ped.data}`);
    });
}

 function relatorioPedidosPorCliente(idCliente: number) {
    console.log(`\n========= PEDIDOS DO CLIENTE ID: ${idCliente} =========`);
    const pedidosCliente = listarPedidosPorCliente(idCliente);
    if (pedidosCliente.length > 0) {
        pedidosCliente.forEach(ped => {
            console.log(`- Pedido ID: ${ped.id} | Total: R$ ${ped.total} | Data: ${ped.data}`);
        });
    } else {
        console.log("Nenhum pedido encontrado para este cliente.");
    }
}

console.log("\n================ MENU DE RELATÓRIOS ================");
console.log("1 - Relatório de Clientes Cadastrados");
console.log("2 - Relatório Geral de Pedidos");
console.log("3 - Relatório de Pedidos de um Cliente Específico");
console.log("4 - Relatório de Estoque Atualizado");
console.log("0 - Sair");
console.log("====================================================");

const opcaoRelatorio = Number(prompt("Digite a opção desejada: "));

switch (opcaoRelatorio) {
    case 1:
        relatorioClientes();
        break;
    case 2:
        relatorioGeralPedidos();
        break;
    case 3:
        const idCliente = Number(prompt("Digite o ID do cliente que deseja consultar: "));
        relatorioPedidosPorCliente(idCliente);
        break;
    case 4:
        relatorioEstoqueAtualizado();
        break;
    case 0:
        console.log("A sair do menu de relatórios...");
        break;
    default:
        console.log("Opção inválida!");
        break;
}