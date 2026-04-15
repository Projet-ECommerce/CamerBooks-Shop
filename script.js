// script.js - CamerBooks Shop (version améliorée)

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const books = [
    { id: 1, title: "Sur le Bord du Monde", author: "Antoine de Saint-Exupéry", price: 12.99, image: "https://picsum.photos/id/1015/300/400", category: "litterature" },
    { id: 2, title: "Regard d’Acier", author: "George Orwell", price: 9.99, image: "https://picsum.photos/id/201/300/400", category: "sf" },
    { id: 3, title: "Le Signal", author: "J.K. Rowling", price: 15.50, image: "https://picsum.photos/id/870/300/400", category: "fantasy" },
    { id: 4, title: "Dos au Large", author: "Albert Camus", price: 8.50, image: "https://picsum.photos/id/1005/300/400", category: "litterature" },
    { id: 5, title: "Garage Jaune", author: "Chinua Achebe", price: 11.99, image: "https://picsum.photos/id/133/300/400", category: "africaine" },
    { id: 6, title: "Écran Brumeux", author: "Frank Herbert", price: 14.99, image: "https://picsum.photos/id/160/300/400", category: "sf" },
    { id: 7, title: "Les grand piques", author: "J.R.R. Tolkien", price: 18.50, image: "https://picsum.photos/seed/picsum/200/300", category: "fantasy" },
    { id: 8, title: "Un fidel ami", author: "Mariama Bâ", price: 7.99, image: "https://picsum.photos/id/237/200/300", category: "africaine" }
];

const categories = [
    { name: "Tous", value: "all" },
    { name: "📖 Littérature africaine", value: "africaine" },
    { name: "🧙 Fantasy", value: "fantasy" },
    { name: "🔬 Science-fiction", value: "sf" },
    { name: "📚 Littérature", value: "litterature" }
];

// Afficher les livres
function displayBooks(filteredBooks) {
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    if (filteredBooks.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center py-12 text-slate-500">Aucun livre trouvé 😔</p>`;
        return;
    }

    filteredBooks.forEach(book => {
        const div = document.createElement('div');
        div.className = "bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition group";
        div.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="w-full h-80 object-cover group-hover:scale-105 transition">
            <div class="p-4">
                <h3 class="font-medium text-lg">${book.title}</h3>
                <p class="text-slate-500 text-sm">${book.author}</p>
                <div class="flex justify-between items-end mt-4">
                    <p class="text-2xl font-bold text-emerald-600">${book.price.toFixed(2)} Fcfa</p>
                    <button onclick="addToCart(${book.id})" class="bg-emerald-600 text-white px-5 py-2 rounded-2xl text-sm hover:bg-emerald-700 transition">Ajouter au panier</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Ajouter au panier
function addToCart(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;

    const existing = cart.find(item => item.id === book.id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${book.title} ajouté au panier !`);
}

// Mettre à jour compteur panier
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    countEl.textContent = totalItems;
}

// Notification
function showNotification(msg) {
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed; bottom:24px; right:24px; background:#10b981; color:white; padding:16px 24px; border-radius:9999px; box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.2); display:flex; align-items:center; gap:12px; z-index:9999;';
    notif.innerHTML = `✅ ${msg}`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2800);
}

// Afficher panier
function showCart() {
    const modal = document.getElementById('cart-modal');
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-center py-12 text-slate-500">Votre panier est vide</p>`;
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * (item.quantity || 1);
            total += itemTotal;

            const row = document.createElement('div');
            row.className = "flex gap-4 py-4 border-b last:border-none";
            row.innerHTML = `
                <img src="${item.image}" class="w-16 h-20 object-cover rounded-2xl">
                <div class="flex-1">
                    <p class="font-medium">${item.title}</p>
                    <p class="text-sm text-slate-500">${item.author}</p>
                    <p class="text-sm">${item.quantity || 1} × ${item.price.toFixed(2)} Fcfa</p>
                </div>
                <div class="text-right">
                    <p class="font-bold">${itemTotal.toFixed(2)} Fcfa</p>
                    <button onclick="removeFromCart(${index});" class="text-red-500 text-xs mt-2 hover:underline">Supprimer</button>
                </div>
            `;
            container.appendChild(row);
        });
    }

    totalEl.textContent = `${total.toFixed(2)} Fcfa`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

function checkout() {
    if (cart.length === 0) return;
    alert('🎉 Merci pour votre commande ! (Simulation - fonctionnalité complète bientôt)');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    closeCart();
    updateCartCount();
}

// Filtres catégories
function setupCategoryFilters() {
    const container = document.getElementById('category-filters');
    container.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `px-5 py-2 rounded-3xl text-sm font-medium transition ${cat.value === 'all' ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-emerald-100'}`;
        btn.textContent = cat.name;
        btn.onclick = () => filterByCategory(cat.value, btn);
        container.appendChild(btn);
    });

    // Catégories statiques en bas (même style)
    const staticContainer = document.getElementById('static-categories');
    staticContainer.innerHTML = categories.slice(1).map(cat => `
        <div onclick="filterByCategory('${cat.value}')" 
             class="bg-white p-6 rounded-3xl text-center hover:bg-emerald-50 transition cursor-pointer text-xl">
            ${cat.name}
        </div>
    `).join('');
}

let currentFilter = 'all';

function filterByCategory(category, activeBtn = null) {
    currentFilter = category;
    
    // Mise en évidence du bouton actif
    if (activeBtn) {
        document.querySelectorAll('#category-filters button').forEach(b => b.classList.remove('bg-emerald-600', 'text-white'));
        activeBtn.classList.add('bg-emerald-600', 'text-white');
    }

    let filtered = books;
    if (category !== 'all') {
        filtered = books.filter(book => book.category === category);
    }
    displayBooks(filtered);
}

// Recherche
function setupSearch() {
    const input = document.getElementById('search-input');
    input.addEventListener('input', () => {
        const term = input.value.toLowerCase().trim();
        let filtered = books;

        if (term) {
            filtered = books.filter(book => 
                book.title.toLowerCase().includes(term) || 
                book.author.toLowerCase().includes(term)
            );
        }

        // Appliquer aussi le filtre catégorie actuel
        if (currentFilter !== 'all') {
            filtered = filtered.filter(book => book.category === currentFilter);
        }

        displayBooks(filtered);
    });
}

// Connexion fictive
function setupLogin() {
    document.getElementById('login-button').addEventListener('click', () => {
        const name = prompt("Entrez votre prénom pour simuler la connexion :") || "Cher client";
        alert(`👋 Bienvenue ${name} ! Vous êtes maintenant connecté(e).`);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(books);
    setupCategoryFilters();
    setupSearch();
    setupLogin();
    updateCartCount();

    document.getElementById('cart-button').addEventListener('click', showCart);

    console.log('%c✅ CamerBooks Shop - JavaScript mis à jour avec succès !', 'color:#10b981; font-weight:bold');
});