import type { Pedido } from './types';
import { listarCarrinho, limparCarrinho } from './carrinho';
import { listarProdutos } from './produtos';

const pedidos: Pedido[] = [];


function fazerPedido(idCliente: number): boolean {
    const itensCarrinho = listarCarrinho();

    if (itensCarrinho.length === 0) {
        console.log("Erro: O carrinho está vazio, não é possível finalizar o pedido!");
        return false;
    }

    
    itensCarrinho.forEach(itemCarrinho => {
        const produtoEstoque = listarProdutos().find(p => p.id === itemCarrinho.produto.id);
        if (produtoEstoque) {
            produtoEstoque.estoque -= itemCarrinho.quantidade;
        }
    });

    
    const valorTotal = itensCarrinho.reduce((total, item) => total + item.subtotal, 0);

    
    const novoPedido: Pedido = {
        id: pedidos.length + 1,
        cliente: String(idCliente),
        itens: [...itensCarrinho],
        total: valorTotal,
        data: new Date().toLocaleDateString()
    };

    pedidos.push(novoPedido);
    console.log("Pedido realizado com sucesso e estoque atualizado!");

    
    limparCarrinho();
    return true;
}

function listarPedido(): Pedido[] {
    return pedidos;
}

export { fazerPedido, listarPedido };

export function listarPedidosPorCliente(idCliente: string | number): Pedido[] {
    
    return pedidos.filter(ped => String(ped.cliente) === String(idCliente));
}