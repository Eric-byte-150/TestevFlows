let contador = 0;
let produtos = [];
let anexos = [];

function adicionarAnexo(input) {
    contador++;
    let file = input.files[0];
    let divItens = document.querySelector('.anexos .itens');
    let novoAnexo = document.createElement('div');
    novoAnexo.classList.add('item');
    novoAnexo.innerHTML = `
        <img src="imgs/trash.jpg" alt="" onclick="removerAnexo(this)">
        <a href="${URL.createObjectURL(file)}" download>
            <img src="imgs/eye.jpg" alt="">
        </a>
        <h1>Documento Anexo ${contador}</h1>
    `;
    divItens.appendChild(novoAnexo);

    // Armazena o anexo no array de anexos
    anexos.push({
        indice: contador,
        nomeArquivo: file.name,
        blobArquivo: URL.createObjectURL(file)
    });
}

function removerAnexo(lixeira) {
    let divItem = lixeira.parentNode;
    divItem.remove();
}

document.getElementById('botaoAdicionar').addEventListener('click', function() {
    contador++;
    let container = document.getElementById('container');
    let novaDiv = document.createElement('div');
    novaDiv.classList.add('nova-div');
    novaDiv.innerHTML = `
    <div class="trash">
        <img src="trash.jpg" alt="" onclick="removerProduto(this)" id="trash">
    </div>
    <div class="coisas">
        <div class="detalhes">
            <h1>Produto ${contador}</h1>
            <img src="imgs/product-box.png" alt="">
        </div>
        <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-12">
                <label for="validationCustom01" class="form-label">Produto</label>
                <input type="text" class="form-control" id="validationCustomProduct01" required>
                <div class="valid-feedback"></div>
            </div>
            <div class="col-md-3">
                <label for="validationCustom02" class="form-label">UND. Medida</label>
                <input type="number" class="form-control" id="validationCustomProduct02" required>
                <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-3">
                <label for="validationCustom01" class="form-label">QDTDE. em Estoque</label>
                <input type="number" class="form-control" id="validationCustomProduct03" required>
                <div class="valid-feedback"></div>
            </div>
            <div class="col-md-3">
                <label for="validationCustom02" class="form-label">Valor unitário</label>
                <input type="number" class="form-control" id="validationCustomProduct04" required>
                <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-3">
                <label for="validationCustom02" class="form-label">Valor Total</label>
                <input type="number" class="form-control" id="validationCustomProduct05" required readonly>
                <div class="valid-feedback">Looks good!</div>
            </div>
        </form>
    </div>
</div>
`;
    container.appendChild(novaDiv);
    let valorUnitarioInput = novaDiv.querySelector('#validationCustomProduct04');
    let quantidadeInput = novaDiv.querySelector('#validationCustomProduct03');
    let valorTotalInput = novaDiv.querySelector('#validationCustomProduct05');

    valorUnitarioInput.addEventListener('input', atualizarValorTotal);
    quantidadeInput.addEventListener('input', atualizarValorTotal);

    function atualizarValorTotal() {
        let valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
        let quantidade = parseInt(quantidadeInput.value) || 0;
        let valorTotal = valorUnitario * quantidade;

        valorTotalInput.value = valorTotal.toFixed(2);
    }

    // Armazena o produto no array de produtos
    produtos.push({
        indice: contador,
        descricaoProduto: novaDiv.querySelector('#validationCustomProduct01').value,
        unidadeMedida: novaDiv.querySelector('#validationCustomProduct02').value,
        qtdeEstoque: novaDiv.querySelector('#validationCustomProduct03').value,
        valorUnitario: novaDiv.querySelector('#validationCustomProduct04').value,
        valorTotal: novaDiv.querySelector('#validationCustomProduct05').value
    });
});

function removerProduto(elemento) {
    let divProduto = elemento.parentNode.parentNode;
    divProduto.remove();
}

function salvarFornecedor() {
    // Dados do fornecedor
    let fornecedor = {
        razaoSocial: document.getElementById('razaosocial').value,
        nomeFantasia: document.getElementById('nomeFantasia').value,
        cnpj: document.getElementById('cnpj').value,
        inscricaoEstadual: document.getElementById('inscricaoestadual').value,
        cep: document.getElementById('cep').value,
        inscricaoMunicipal: document.getElementById('inscricaoMunicipal').value,
        endereco: {
            cep: document.getElementById('cep').value,
            endereco: document.getElementById('endereco').value,
            bairro: document.getElementById('bairro').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            municipio: document.getElementById('municipio').value,
            estado: document.getElementById('estado').value,
        },
        NomeDaPessoaDeContato: document.getElementById('nomeDaPessoaDeContato').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        produtos: produtos,
        anexos: anexos
    };

    // Transforma o objeto em uma string JSON
    let jsonFornecedor = JSON.stringify(fornecedor);

    console.log(jsonFornecedor);
}
