// script.js - CamerBooks Shop

let cart = [];

// Données des livres (on peut en ajouter facilement)
const books = [
    {
        id: 1,
        title: "Le Petit Prince",
        author: "Antoine de Saint-Exupéry",
        price: 12.99,
        image: "https://picsum.photos/id/1015/300/400"
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        price: 9.99,
        image: "https://picsum.photos/id/201/300/400"
    },
    {
        id: 3,
        title: "Harry Potter à l'école des sorciers",
        author: "J.K. Rowling",
        price: 15.50,
        image: "https://picsum.photos/id/870/300/400"
    },
    {
        id: 4,
        title: "L'Étranger",
        author: "Albert Camus",
        price: 8.50,
        image: "https://picsum.photos/id/1005/300/400"
    },
    {
        id: 5,
        title: "Le monde s'effondre",
        author: "Chinua Achebe",
        price: 11.99,
        image: "https://picsum.photos/id/133/300/400"
    }
];

// Fonction pour afficher les livres
function displayBooks(filteredBooks) {
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = "bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition group";
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" 
                 class="w-full h-80 object-cover group-hover:scale-105 transition">
            <div class="p-4">
                <h3 class="font-medium text-lg">${book.title}</h3>
                <p class="text-slate-500 text-sm">${book.author}</p>
                <div class="flex justify-between items-end mt-4">
                    <p class="text-2xl font-bold text-emerald-600">${book.price.toFixed(2)} €</p>
                    <button onclick="addToCart(${book.id})" 
                            class="bg-emerald-600 text-white px-5 py-2 rounded-2xl text-sm hover:bg-emerald-700 transition">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
        container.appendChild(bookCard);
    });
}

// Ajouter au panier
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const existing = cart.find(item => item.id === book.id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    updateCartCount();
    showNotification(`${book.title} ajouté au panier !`);
}

// Mettre à jour le compteur du panier
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    countEl.textContent = totalItems;
}

// Notification simple
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = "fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50";
    notif.innerHTML = `✅ ${message}`;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.transition = 'opacity 0.5s';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 500);
    }, 2500);
}

// Afficher le panier
function showCart() {
    const modal = document.getElementById('cart-modal');
    const itemsContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    itemsContainer.innerHTML = '';

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="text-slate-500 py-8 text-center">Votre panier est vide</p>`;
        totalEl.textContent = '0 €';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * (item.quantity || 1);
            total += itemTotal;

            const div = document.createElement('div');
            div.className = "flex gap-4 py-3 border-b last:border-0";
            div.innerHTML = `
                <img src="${item.image}" class="w-16 h-20 object-cover rounded-xl">
                <div class="flex-1">
                    <p class="font-medium">${item.title}</p>
                    <p class="text-sm text-slate-500">${item.author}</p>
                    <p class="text-sm">${item.quantity || 1} × ${item.price.toFixed(2)} €</p>
                </div>
                <div class="text-right">
                    <p class="font-bold">${itemTotal.toFixed(2)} €</p>
                    <button onclick="removeFromCart(${index})" class="text-red-500 text-xs mt-2">Supprimer</button>
                </div>
            `;
            itemsContainer.appendChild(div);
        });
        totalEl.textContent = `${total.toFixed(2)} €`;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Fermer le panier
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Supprimer du panier
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    showCart(); // rafraîchir le modal
}

// Recherche en temps réel
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        
        if (!term) {
            displayBooks(books);
            return;
        }

        const filtered = books.filter(book => 
            book.title.toLowerCase().includes(term) || 
            book.author.toLowerCase().includes(term)
        );
        
        displayBooks(filtered);
    });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    // Afficher tous les livres au départ
    displayBooks(books);
    
    // Configurer la recherche
    setupSearch();
    
    // Ouvrir le panier au clic
    document.getElementById('cart-button').addEventListener('click', showCart);
    
    // Mise à jour initiale du compteur
    updateCartCount();
    
    console.log('%c✅ CamerBooks Shop - JavaScript chargé avec succès !', 'color: #10b981; font-weight: bold');
});