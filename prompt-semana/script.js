let resposta = Number(prompt("Digite o número equivalente ao dia da semana:"));
console.log(resposta);

function diadasemana( ) {
    if (resposta === 1) {
        document.getElementById("resp").innerHTML="Domingo";
    } else if (resposta === 2) {
        document.getElementById("resp").innerHTML="Segunda";
    } else if (resposta === 3) {
        document.getElementById("resp").innerHTML="Terça";
    } else if (resposta === 4) {
        document.getElementById("resp").innerHTML="Quarta";
    } else if (resposta === 5) {
        document.getElementById("resp").innerHTML="Quinta";
    } else if (resposta === 6) {
        document.getElementById("resp").innerHTML="Sexta";
    } else if (resposta === 7) {
        document.getElementById("resp").innerHTML="Sabádo";
    } else {
        document.getElementById("resp").innerHTML="Não é um dia da semana!";
    }
}
diadasemana();