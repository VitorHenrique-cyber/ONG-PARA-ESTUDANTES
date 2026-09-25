
const app = document.getElementById("app");
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");


// Conteúdos das rotas
const rotas = {

    resumo: `
        <section id="resumo">

            <h1 class="nome1">ONG PARA ESTUDANTES</h1>

            <p>
                A ONG que realiza sonhos de todos os estudantes do Brasil.
            </p>

            <div class="botao2">
                <button>FACULDADE</button>
                <button>CURSOS</button>
                <button>CIDADE</button>
                <button>PAÍS</button>
                <button>CARGA HORÁRIA</button>
                <button>MODALIDADE</button>
                <button>HORÁRIO</button>
                <button>VALOR</button>
            </div>

        </section>
    `,

    objetivo: `
        <section>

            <h3 class="nome2">OBJETIVO</h3>

            <p>
                O objetivo desta ONG é financiar estudantes para que consigam
                ter um ensino de qualidade, onde poderão aprender sem se
                preocupar com o financeiro.
            </p>

        </section>
    `,

    contato: `
        <section class="item1">

            <h3 class="nome3">CONTATO</h3>

            <p>
                Para entrar em contato conosco, ligue pelo número:
            </p>

            <p>
                <strong>Telefone:</strong> (11) 99999-9999
            </p>

            <h2 class="nome4">LOGAR NA ONG</h2>

            <hr>

            <form>

                <div class="container">

                    <label for="nome">Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        required
                    >

                    <label for="cpf">CPF:</label>
                    <input
                        type="text"
                        name="cpf"
                        id="cpf"
                        pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
                        placeholder="000.000.000-00"
                    >

                    <label for="telefone">Telefone:</label>
                    <input
                        type="text"
                        name="telefone"
                        id="telefone"
                        pattern="\\(\\d{2}\\)\\d{5}-\\d{4}"
                        placeholder="(99)99999-9999"
                    >

                    <label for="CEP">CEP:</label>
                    <input
                        type="text"
                        name="CEP"
                        id="CEP"
                        pattern="\\d{5}-\\d{3}"
                        placeholder="88888-888"
                    >

                    <button type="submit">SALVAR</button>

                </div>

            </form>

            <hr>

        </section>
    `
};


// ===============================
// RENDERIZA A ROTA
// ===============================

function renderizarRota() {

    let rota = window.location.hash.substring(1);

    if (!rotas[rota]) {
        rota = "resumo";
    }

    // Coloca o conteúdo da rota dentro do #app
    app.innerHTML = rotas[rota];

    // Configura o formulário depois que ele foi criado
    configurarFormulario();

    // Fecha o menu
    menu.classList.remove("active");
}


// ===============================
// MENU HAMBÚRGUER
// ===============================

menuToggle.addEventListener("click", function () {

    menu.classList.toggle("active");

});


// ===============================
// NAVEGAÇÃO DO MENU
// ===============================

menu.addEventListener("click", function (event) {

    const link = event.target.closest("a");

    if (!link) {
        return;
    }

    event.preventDefault();

    const rota = link.getAttribute("href");

    // Atualiza a URL sem recarregar a página
    window.history.pushState({}, "", rota);

    // Renderiza a nova rota
    renderizarRota();

});


// ===============================
// VOLTAR E AVANÇAR
// ===============================

window.addEventListener("popstate", renderizarRota);


// ===============================
// FORMULÁRIO E LOCALSTORAGE
// ===============================

function configurarFormulario() {

    const formulario = document.querySelector("form");

    // Se não existir formulário na página, encerra a função
    if (!formulario) {
        return;
    }

    const nome = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("CEP");


    // Recupera os dados salvos
    const dadosSalvos = localStorage.getItem("dadosUsuario");

    if (dadosSalvos) {

        const dados = JSON.parse(dadosSalvos);

        nome.value = dados.nome || "";
        cpf.value = dados.cpf || "";
        telefone.value = dados.telefone || "";
        cep.value = dados.cep || "";

    }


    // Salva os dados
    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const dadosUsuario = {

            nome: nome.value,
            cpf: cpf.value,
            telefone: telefone.value,
            cep: cep.value

        };


        // Transforma o objeto em string e salva
        localStorage.setItem(
            "dadosUsuario",
            JSON.stringify(dadosUsuario)

            
        );

        


        alert("Dados salvos com sucesso!");

    });

}


// ===============================
// CARREGA A PÁGINA INICIAL
// ===============================

renderizarRota();


