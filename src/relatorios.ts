import { listarProdutos } from './produtos';
import { listarClientes } from './clientes'; 
import { listarPedido, listarPedidosPorCliente } from './pedidos';


export function relatorioClientes() {
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

export function relatorioEstoqueAtualizado() {
    console.log("\n========= RELATÓRIO DE ESTOQUE ATUALIZADO =========");
    listarProdutos().forEach(prod => {
        console.log(`- ID: ${prod.id} | Produto: ${prod.produto} | Categoria: ${prod.categoria} | Preço: R$ ${prod.preco} | Estoque: ${prod.estoque} uni.`);
    });
}

export function relatorioGeralPedidos() {
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

export function relatorioPedidosPorCliente(idCliente: number) {
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
