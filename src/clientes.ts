import type { Cliente } from './types';

const clientes : Cliente[] = [];

function cadastrarClientes(cliente: Cliente) : void{
    clientes.push(cliente);
  
}

function listarClientes () : Cliente[] {
    return clientes;
}

export { cadastrarClientes, listarClientes }