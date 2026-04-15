// --- LOGIQUE INTERACTIVE LIVREGIT ---

document.addEventListener('DOMContentLoaded', () => {
    let count = 0;
    const cartCount = document.getElementById('cart-count');
    const searchInput = document.getElementById('search-input');

    // 1. Fonction pour ajouter au panier
    // On cible tous les boutons qui contiennent "Ajouter au panier"
    const addButtons = document.querySelectorAll('button');
    
    addButtons.forEach(btn => {
        if (btn.textContent.includes('Ajouter au panier')) {
            btn.addEventListener('click', () => {
                count++;
                cartCount.textContent = count;
                
                // Petite animation de confirmation sur le bouton
                const originalText = btn.textContent;
                btn.textContent = "✅ Ajouté !";
                btn.style.backgroundColor = "#059669"; // emerald-600
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = "";
                }, 1500);
            });
        }
    });

    // 2. Simulation de barre de recherche
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                alert("Recherche de : " + query + "\n(Cette fonctionnalité sera liée à la base de données bientôt !)");
            }
        });
    }

    console.log("LivreGit : Le système JavaScript est prêt !");
});ss