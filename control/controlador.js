
//espera o domm carregar completamente para poder chamar a função
window.onload = function () {
    document.getElementById("theForm").addEventListener("submit", function (event) {
        // Atribuir valores globais
        var cpf = document.getElementById("txtCPF").value;
        var dataNasc = document.getElementById("txtDataNascimento").value;
        var phone = document.getElementById("txtTelefone").value;
        var email = document.getElementById("txtEmail").value;

        //persistencia de dados - fazendo com que os dados fiquem salvos no cacher do server
        localStorage.setItem('cpf', cpf) ;
        localStorage.setItem('dataNasc',dataNasc);
        localStorage.setItem('phone',phone);
        localStorage.setItem('email',email);

        valuesSub = [cpf,dataNasc,phone,email]
        // Verificar se alguma das variáveis é nula
        if (isNull(valuesSub)) {
            alert("Por favor, preencha todos os campos!");
            event.preventDefault(); // Impede a submissão do formulário
        }
    });
};

function isNull(elements) {
    for (var i = 0; i < elements.length; i++) {
        if (elements[i] === "") {
            return true;
        }
    }
    return false;
}

function sheachDate() {

    var cpf = localStorage.getItem('cpf');
    var dataNasc = localStorage.getItem('dataNasc');
    var phone = localStorage.getItem('phone');
    var email = localStorage.getItem('email');

    return [cpf, dataNasc, phone, email];
}
