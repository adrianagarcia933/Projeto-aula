import type { Cliente } from './types';

// Array com as variáveis e 3 clientes iniciais cadastrados
const clientes: Cliente[] = [
    { nome: "Ana Silva", id: 1, email: "ana@email.com" },
    { nome: "Carlos Souza", id: 2, email: "carlos@email.com" },
    { nome: "Mariana Dias", id: 3, email: "mariana@email.com" }
];

function cadastrarClientes(cliente: Cliente): void {
    clientes.push(cliente); // Função de array push
}

function listarClientes(): Cliente[] {
    return clientes;
}

function cadastrarCliente(cliente: Cliente): boolean {
    if (cliente.nome.trim() === '') {
        console.log('O nome do cliente deve ser preenchido!');
        return false;
    }

    if (cliente.email.trim() === '') {
        console.log('O email do cliente deve ser preenchido!');
        return false;
    }

    // Função de array find para verificar se já existe o ID
    const clienteNovo = clientes.find(c => c.id === cliente.id);

    if (clienteNovo) {
        console.log('Já existe um cliente com esse ID! Por favor, escolha outro ID ou outro cliente.');
        return false;
    }
    
    clientes.push(cliente); // Função de array push
    console.log('Cliente cadastrado com sucesso!');
    return true;
}

export { cadastrarCliente, listarClientes, cadastrarClientes };