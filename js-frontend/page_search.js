/**
 * Cerca una parola chiave in tutte le pagine HTML specificate e restituisce i risultati in stile Google.
 * @param {string} query - La parola chiave da cercare.
 * @param {string[]} pagePaths - Array di percorsi delle pagine HTML da cercare.
 * @returns {Promise<string>} - HTML dei risultati.
 */
async function searchAllPages(query, pagePaths) {
    const results = [];

    for (const path of pagePaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) continue;
            const html = await response.text();

            // Estrai il titolo della pagina
            const titleMatch = html.match(/<title>(.*?)<\/title>/i);
            const title = titleMatch ? titleMatch[1] : path;

            // Cerca la query nel testo della pagina
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            const bodyText = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, ' ') : html.replace(/<[^>]+>/g, ' ');
            const index = bodyText.toLowerCase().indexOf(query.toLowerCase());

            if (index !== -1) {
                // Crea uno snippet attorno alla parola trovata
                const snippetStart = Math.max(0, index - 60);
                const snippetEnd = Math.min(bodyText.length, index + 60);
                let snippet = bodyText.substring(snippetStart, snippetEnd);
                snippet = snippet.replace(new RegExp(query, 'gi'), match => `<b>${match}</b>`);
                results.push({ title, path, snippet });
            }
        } catch (e) {
            // Ignora errori di fetch
        }
    }

    // Formatta i risultati in stile Google
    if (results.length === 0) {
        return `<p>Nessun risultato trovato per <b>${query}</b>.</p>`;
    }

    return results.map(r => `
        <div class="col md-6 lg-4">
            <div class="card mb-3 search-result">
                <div class="card-body">
                    <h5 class="card-title">
                        <a href="${r.path}" class="text-decoration-none">${r.title}</a>
                    </h5>
                    <p class="card-text">${r.snippet}...</p>
                </div>
            </div>
        </div>
    `).join('');
}

/* define all the possible pages */
const pagePaths = [
    "admin_add-items.html",
    "car-configurator.html",
    "index.html",
    "login.html",
    "profile.html",
    "purchase-list.html",
    "shopping-cart.html",
    "sign-up.html",
    "terms-and-conditions.html",
    "wish-list.html",
    "../posts/car-details_purchase-list.html",
    "../posts/car-details_showroom.html"
];
let query;

async function showResults() {
    const html = await searchAllPages(query, pagePaths);
    document.getElementById("result-search-container").innerHTML = html;
}

query = localStorage.getItem("searchQuery");
showResults();