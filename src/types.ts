
export type Cliente = {
    nome : string
    id : number
    email : string

}

export type Produto = {
    id : number
    produto : string
    categoria : string
    preco : number
    estoque : number
    
}

export type ItemCarrinho = {
    produto : Produto;
    quantidade: number;
}

export type Pedido = {
    id : number
    cliente : String
    itens : ItemCarrinho[]
    total : number
    data : string

}

