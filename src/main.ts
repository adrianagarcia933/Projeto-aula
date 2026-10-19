import promptSync = require('prompt-sync');
import {cadastrarClientes, listarClientes} from './clientes';
import type {Cliente} from './types'

const prompt = promptSync({sigint: true});

const nomeImput : string = prompt('Digite o nome do cliente');
const idadeImput : number = Number(prompt('Digite a idade do cliente'));

const novoCliente : Cliente = {
    nome: nomeImput,
    idade : idadeImput,
}

cadastrarClientes(novoCliente);

const listaAtual = listarClientes();
console.log(listaAtual)