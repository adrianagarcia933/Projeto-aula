import type { Produto } from './types';

export type ItemCarrinho = {
    idCliente: number;
    produto: Produto;
    quantidade: number;
    subtotal: number;
};

const carrinho: ItemCarrinho[] = [];

function adicionarAoCarrinho(idCliente: number,produto: Produto | undefined, quantidade: number): boolean {
    if (!produto) {
        console.log("Produto não encontrado!");
        return false;
    }

        if (quantidade <= 0) {
        console.log("A quantidade deve ser maior que zero!");
        return false;
    }

        if (quantidade > produto.estoque) {
        console.log("Quantidade superior ao estoque disponível!");
        return false;
    }

    const itemExistente = carrinho.find(item => item.idCliente === idCliente && produto.id === produto.id);

        if (itemExistente) {
        const novaQtd = itemExistente.quantidade + quantidade;
        if (novaQtd > produto.estoque) {
            console.log("A quantidade total excede o estoque disponível!");
            return false;
        }
        itemExistente.quantidade = novaQtd;
        itemExistente.subtotal = itemExistente.produto.preco * itemExistente.quantidade;
        console.log("Quantidade do produto atualizada no carrinho!");
        return true;
    }

    const novoItem: ItemCarrinho = {
        idCliente:idCliente,
        produto: produto,
        quantidade: quantidade,
        subtotal: produto.preco * quantidade
    };

    carrinho.push(novoItem);
    console.log("Produto adicionado ao carrinho com sucesso!");
    return true;
}


function removerDoCarrinho(idProduto: number): boolean {
    const indice = carrinho.findIndex(item => item.produto.id === idProduto);

    if (indice === -1) {
        console.log("Produto não encontrado no carrinho!");
        return false;
    }

    carrinho.splice(indice, 1);
    console.log("Produto removido do carrinho com sucesso!");
    return true;
}


function alterarQuantidadeCarrinho(idProduto: number, novaQuantidade: number): boolean {
    const item = carrinho.find(item => item.produto.id === idProduto);

    if (!item) {
        console.log("Produto não encontrado no carrinho!");
        return false;
    }

    if (novaQuantidade <= 0) {
        console.log("A quantidade deve ser maior que zero!");
        return false;
    }

    if (novaQuantidade > item.produto.estoque) {
        console.log("Quantidade superior ao estoque disponível!");
        return false;
    }

    item.quantidade = novaQuantidade;
    item.subtotal = item.produto.preco * item.quantidade;
    console.log("Quantidade alterada com sucesso!");
    return true;
}

function listarCarrinho(): ItemCarrinho[] {
    return carrinho;
}

function calcularTotalCarrinho(): number {
    return carrinho.reduce((total, item) => total + item.subtotal, 0);
}

function limparCarrinho(): void {
    carrinho.length = 0;
}


export {
    adicionarAoCarrinho,
    removerDoCarrinho,
    alterarQuantidadeCarrinho,
    listarCarrinho,
    calcularTotalCarrinho,
    limparCarrinho
};

