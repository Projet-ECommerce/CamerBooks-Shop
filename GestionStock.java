let total = 0;
const buttons = document.querySelectorAll('.add-btn');
const displayTotal = document.getElementById('total-price');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseInt(button.getAttribute('data-price'));
        total += price;
        displayTotal.innerText = total;
        alert("Livre ajouté au panier !");
    });
});