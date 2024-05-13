

window.onload = function () {
    document.getElementById("theForm").addEventListener('submit', function (event) {

        var cpf = document.getElementById("txtCPF").value;
        var dataNasc = document.getElementById("txtDataNascimento").value;
        var phone = document.getElementById("txtTelefone").value;
        var email = document.getElementById("txtEmail").value;


        localStorage.setItem('cpf', cpf);
        localStorage.setItem('dataNasc', dataNasc);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);

        valuesSub = [cpf, dataNasc, phone, email]

        if (isNull(valuesSub)) {
            alert("Por favor, preencha todos os campos!");
            event.preventDefault();
        } else if (!validarCPF(cpf)) {
            alert("Por favor, informe um cpf válido.");
            event.preventDefault();
        }

    });

    var cpf = document.getElementById('txtCPF');
    var data = document.getElementById('txtDataNascimento');
    var telefone = document.getElementById('txtTelefone');



    cpf.addEventListener('input', function () {

        cpf.value = formatarCPF(cpf.value);

    });


    data.addEventListener('input', function () {

        data.value = formatarDataNascimento(data.value);

    });


    telefone.addEventListener('input', function () {

        telefone.value = formatarTelefone(telefone.value);

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

function formatarCPF(cpf) {

    cpf = cpf.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
}

function formatarDataNascimento(data) {

    data = data.replace(/\D/g, '');

    data = data.replace(/(\d{2})(\d)/, '$1/$2');
    data = data.replace(/(\d{2})(\d)/, '$1/$2');
    data = data.replace(/(\d{4})(\d{1,2})$/, '$1');

    return data;
}

function formatarTelefone(telefone) {

    telefone = telefone.replace(/\D/g, '');

    if (telefone.length <= 10) {
        telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
        telefone = telefone.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
        telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
    }

    return telefone;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11)
        return false;

    var igual = true;
    for (var i = 1; i < cpf.length && igual; i++) {
        if (cpf[i] !== cpf[0])
            igual = false;
    }
    if (igual)
        return false;

    var soma = 0;
    for (var i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    var resto = soma % 11;
    var digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(9)) !== digitoVerificador1)
        return false;

    soma = 0;
    for (var i = 0; i < 10; i++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = soma % 11;
    var digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(10)) !== digitoVerificador2)
        return false;

    return true;
}