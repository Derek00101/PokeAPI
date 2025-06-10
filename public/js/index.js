document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[id^="poke-"]');
    images.forEach(img => {
        const pokeName = img.alt.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
            .then(res => res.json())
            .then(data => {
                img.src = data.sprites.other['official-artwork'].front_default;
            })
            .catch(() => {
                img.src = '';
            });
    });
});

function renderTokens(tokens) {
    let html = `
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Fila</th>
                <th>Columna</th>
                <th>Lexema</th>
                <th>Token</th>
            </tr>
        </thead>
        <tbody>
    `;
    tokens.forEach((token, idx) => {
        html += `
            <tr>
                <td>${idx + 1}</td>
                <td>${token.row}</td>
                <td>${token.column}</td>
                <td>${token.lexeme}</td>
                <td>${token.typeTokenString}</td>
            </tr>
        `;
    });
    html += `</tbody></table>`;
    document.getElementById('tabla-tokens').innerHTML = html;
}

function renderErrors(errors) {
    if (errors.length === 0) {
        document.getElementById('tabla-errores').innerHTML = '';
        return;
    }
    let html = `
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Fila</th>
                <th>Columna</th>
                <th>Carácter</th>
                <th>Descripción</th>
            </tr>
        </thead>
        <tbody>
    `;
    errors.forEach((err, idx) => {
        html += `
            <tr>
                <td>${idx + 1}</td>
                <td>${err.row}</td>
                <td>${err.column}</td>
                <td>${err.lexeme}</td>
                <td>Desconocido</td>
            </tr>
        `;
    });
    html += `</tbody></table>`;
    document.getElementById('tabla-errores').innerHTML = html;
}