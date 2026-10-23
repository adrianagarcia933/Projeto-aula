import type { Produto } from './types';

const produtos : Produto[] = [];

function cadastrarProduto(produto:Produto): void {
    produtos.push(produto);
}

    function cadastrarProdutos(produto: Produto): boolean {
    if (produto.produto === "") {
        console.log("O nome não pode ficar vazio!");
        return false;
    }

    function filtrarProdutosPorCategoria(categoria: string): Produto[] {
        return produtos.filter(p => p.categoria === categoria);
    }    

    function atualizarProduto(id: number, novosDados: Produto): boolean {
        const indice = produtos.findIndex(p => p.id === id);
    
        if (indice === -1) {
            console.log("Produto não encontrado!");
            return false;
        }
    
        produtos[indice] = novosDados;
        return true;
    }     
    if (produto.preco <= 0) {
        console.log("O preço deve ser maior que zero!");
        return false;
    }
    
    if (produto.estoque < 0) {
        console.log("O estoque não pode ser negativo!");
        return false;
    }   

    const existente = produtos.find(p => p.id === produto.id);

    if (existente) {
        console.log("Esse ID já está cadastrado!");
        return false;
    }

    produtos.push(produto);
    return true;
}

function listarProdutos () : Produto[] {
    return produtos;
}

function buscarProdutoPorId(id: number): Produto | undefined {
    return produtos.find(p => p.id === id);
    
}

function removerProduto(id: number): boolean {
    const indice = produtos.findIndex(p => p.id === id);

    if (indice === -1) {
        console.log("Produto não encontrado!");
        return false;
    }

    produtos.splice(indice, 1);
    return true;
}

export { cadastrarProduto, listarProdutos, buscarProdutoPorId }

