/**
 * Searches for a keyword in all specified HTML pages and returns the results in Google-style format.
 * @param {string} query - The keyword to search for.
 * @param {string[]} pagePaths - Array of HTML page paths to search.
 * @returns {Promise<string>} - HTML of the results.
 */
async function searchAllPages(query, pagePaths) {
    const results = [];

    for (const path of pagePaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) continue;
            const html = await response.text();

            /* extract the title of the page */
            const titleMatch = html.match(/<title>(.*?)<\/title>/i);
            const title = titleMatch ? titleMatch[1] : path;

            /* search the query into 
            the text of the page */
            const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            const bodyText = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, ' ') : html.replace(/<[^>]+>/g, ' ');
            const index = bodyText.toLowerCase().indexOf(query.toLowerCase());

            if (index !== -1) {
                /* creates a snippet around the found word */
                const snippetStart = Math.max(0, index - 60);
                const snippetEnd = Math.min(bodyText.length, index + 60);
                let snippet = bodyText.substring(snippetStart, snippetEnd);
                snippet = snippet.replace(new RegExp(query, 'gi'), match => `<b style="color:red;">${match}</b>`);
                results.push({ title, path, snippet });
            }
        } catch (e) {
            // ignores errors during fetch
        }
    }

    /* Format the results in Google style */
    if (results.length === 0) {
        return `<p>Nessun risultato trovato per <b style="color:red;">${query}</b>.</p>`;
    }

    return results.map(r => `
        <div class="col md-6 lg-4">
            <div class="card mb-3 search-result">
                <div class="card-body">
                    <h5 class="card-title">${r.title}</h5>
                    <p class="card-text">${r.snippet}...</p>
                    <a href="${r.path}" class="btn btn-secondary">Vai alla pagina</a>
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
    "wish-list.html"
];
let query;

async function showResults() {
    const html = await searchAllPages(query, pagePaths);
    document.getElementById("result-search-container").innerHTML = html;
}

query = localStorage.getItem("searchQuery");
showResults();