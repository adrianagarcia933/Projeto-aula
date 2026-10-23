import type { Cliente } from './types';

const clientes : Cliente[] = [];

function cadastrarClientes(cliente: Cliente) : void{
    clientes.push(cliente);
  
}

function listarClientes () : Cliente[] {
    return clientes;
}

function cadastrarCliente(cliente: Cliente):boolean{
   
    if (cliente.nome === ' '){
        console.log(' O nome do cliente deve ser preenchido! ');
        return false
    }
      
    if (cliente.email === '') {
        console.log('O email do cliente deve ser preenchido!');
        return false;
    }

    const clienteNovo = clientes.find(cliente => cliente.id === cliente.id);

    if (clienteNovo) {
    console.log('Já existe um cliente com esse ID!');
    return false;
    }
    clientes.push(cliente) ;{
        console.log( 'Cliente cadastrado com sucesso!');
        return true
        }
}
export { cadastrarCliente, listarClientes }