// Maneja el envio del formulario
document.getElementById('analizarForm').onsubmit = function(e) {
    e.preventDefault();
    const texto = document.getElementById('editor').value;
    fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: texto
    })
    .then(res => res.json())
    .then(data => {
        renderTokens(data.tokens);
        renderErrors(data.errors);
        if (data.players) renderJugadores(data.players);
    });
}

// Limpia el contenido del editor
function limpiarEditor() {
    document.getElementById('editor').value = '';
}

// Carga el contenido de un archivo al editor
function cargarArchivo(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('editor').value = e.target.result;
    };
    reader.readAsText(file);
}

// Guarda el contenido del editor en un archivo
function guardarArchivo() {
    const text = document.getElementById('editor').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'archivo.pklfp';
    a.click();
}

// Muestra u oculta la tabla de errores
function mostrarErrores() {
    const errorContainer = document.getElementById('tabla-errores');
    const currentDisplay = errorContainer.style.display;
    errorContainer.style.display = currentDisplay === 'none' ? 'block' : 'none';
    
    if (errorContainer.style.display === 'block') {
        errorContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Muestra los errores en la tabla
function renderErrors(errors) {
    const errorContainer = document.getElementById('tabla-errores');
    const errorTbody = document.getElementById('error-tbody');
    
    if (!errors || errors.length === 0) {
        errorContainer.style.display = 'none';
        return;
    }

    // Limpiar el contenido anterior
    errorTbody.innerHTML = '';

    // Agregar cada error a la tabla
    errors.forEach((error, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${error.row}</td>
            <td>${error.column}</td>
            <td>${error.lexeme}</td>
            <td>Carácter Desconocido</td>
        `;
        errorTbody.appendChild(row);
    });

    // Mostrar la tabla de errores
    errorContainer.style.display = 'block';
    
    // Hacer scroll hacia la tabla de errores
    errorContainer.scrollIntoView({ behavior: 'smooth' });
}

// Renderiza las cartas de jugadores y sus Pokemon
async function renderJugadores(players) {
    const container = document.getElementById('jugadores-container');
    if (!players || players.length === 0) {
        container.innerHTML = `
            <video class="video-background" autoplay muted loop playsinline>
                <source src="/img/pokemon-gym.mp4" type="video/mp4">
                Tu navegador no soporta el elemento video.
            </video>
            <p>No se encontraron jugadores.</p>
        `;
        return;
    }

    // Mantener el video y agregar el contenedor de pokédex
    container.innerHTML = `
        <video class="video-background" autoplay muted loop playsinline>
            <source src="/img/pokemon-gym.mp4" type="video/mp4">
            Tu navegador no soporta el elemento video.
        </video>
        <h3>Jugadores Analizados</h3>
        <div class="pokedex-container"></div>
    `;

    const pokedexContainer = container.querySelector('.pokedex-container');

    for (const jugador of players) {
        const trainerCard = document.createElement('div');
        trainerCard.className = 'trainer-card';

        // Crear el encabezado del entrenador
        const trainerHeader = `
            <div class="trainer-header">
                <div class="trainer-avatar">
                    <img src="/img/trainer-icon.png" alt="Trainer" style="width: 50px; height: 50px;">
                </div>
                <div class="trainer-info">
                    <h3>${jugador.name}</h3>
                    <span>Pokémon Trainer</span>
                </div>
            </div>
        `;

        // Decidir si usar grid o carrusel basado en la cantidad de Pokémon
        const useCarousel = jugador.listPokemon.length > 6;
        const pokemonContainer = document.createElement('div');
        pokemonContainer.className = useCarousel ? 'pokemon-carousel' : 'pokemon-grid';

        if (useCarousel) {
            pokemonContainer.innerHTML = `
                <button class="carousel-button carousel-prev">←</button>
                <div class="pokemon-carousel-container"></div>
                <button class="carousel-button carousel-next">→</button>
                <div class="pokemon-counter">${jugador.listPokemon.length} Pokémon</div>
            `;

            const carouselContainer = pokemonContainer.querySelector('.pokemon-carousel-container');

            // Agregar navegación del carrusel
            const prevButton = pokemonContainer.querySelector('.carousel-prev');
            const nextButton = pokemonContainer.querySelector('.carousel-next');
            
            prevButton.onclick = () => {
                carouselContainer.scrollBy({ left: -220, behavior: 'smooth' });
            };
            
            nextButton.onclick = () => {
                carouselContainer.scrollBy({ left: 220, behavior: 'smooth' });
            };

            // Agregar Pokémon al carrusel
            for (const poke of jugador.listPokemon) {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name.toLowerCase()}`);
                    if (!res.ok) throw new Error(`No se pudo cargar el Pokémon: ${poke.name}`);
                    const data = await res.json();

                    const pokemonCard = document.createElement('div');
                    pokemonCard.className = 'pokemon-card';
                    pokemonCard.style.flex = '0 0 200px';
                    pokemonCard.style.scrollSnapAlign = 'start';
                    pokemonCard.innerHTML = `
                        <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" 
                             alt="${poke.name}">
                        <div class="pokemon-info">
                            <div class="pokemon-name">${poke.name}</div>
                            <div class="pokemon-type">${poke.type}</div>
                        </div>
                    `;

                    carouselContainer.appendChild(pokemonCard);
                } catch (error) {
                    console.error(error);
                }
            }
        } else {
            // Usar grid para 6 o menos Pokémon
            for (const poke of jugador.listPokemon) {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name.toLowerCase()}`);
                    if (!res.ok) throw new Error(`No se pudo cargar el Pokémon: ${poke.name}`);
                    const data = await res.json();

                    const pokemonCard = document.createElement('div');
                    pokemonCard.className = 'pokemon-card';
                    pokemonCard.innerHTML = `
                        <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" 
                             alt="${poke.name}">
                        <div class="pokemon-info">
                            <div class="pokemon-name">${poke.name}</div>
                            <div class="pokemon-type">${poke.type}</div>
                        </div>
                    `;

                    pokemonContainer.appendChild(pokemonCard);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        trainerCard.innerHTML = trainerHeader;
        trainerCard.appendChild(pokemonContainer);
        pokedexContainer.appendChild(trainerCard);
    }
}

// Intercepta el submit del formulario
document.getElementById('analizarForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const editor = document.getElementById('editor').value;
    try {
        const res = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ editor })
        });
        const data = await res.json();

        // Actualizar tabla de tokens
        const tablaTokens = document.getElementById('tabla-tokens');
        tablaTokens.innerHTML = `
            <h3>Tabla de Tokens</h3>
            ${data.tokens && data.tokens.length > 0 ? 
                `<div class="table-container">
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
                            ${data.tokens.map((token, idx) => `
                                <tr>
                                    <td>${idx + 1}</td>
                                    <td>${token.row}</td>
                                    <td>${token.column}</td>
                                    <td>${token.lexeme}</td>
                                    <td>${token.typeTokenString}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>` : 
                '<div class="empty-state">No hay tokens para mostrar</div>'
            }`;

        // Actualizar tabla de errores
        if (data.errors && data.errors.length > 0) {
            renderErrors(data.errors);
        }

        // Renderizar jugadores
        if (data.players) {
            await renderJugadores(data.players);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});