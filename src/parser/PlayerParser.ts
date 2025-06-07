import { Token } from "../Analyzer/Token";

export function parsePlayers(tokens: Token[]): any {
    let players: any[] = [];
    let i = 0;

    while (i < tokens.length) {
        // Buscar palabra reservada "Jugador"
        if (
            tokens[i].getTypeTokenString() === "RESERVED_WORD" &&
            tokens[i].getLexeme() === "Jugador"
        ) {
            // Saltar hasta encontrar el STRING (nombre del jugador)
            i++;
            while (tokens[i] && tokens[i].getTypeTokenString() !== "STRING") i++;
            let name = tokens[i] ? tokens[i].getLexeme().replace(/"/g, "") : "";
            // Saltar hasta encontrar la llave de apertura
            i++;
            while (tokens[i] && tokens[i].getTypeTokenString() !== "CURLY_BRACKET_OPEN") i++;
            i++; // Avanza después de la llave
            let listPokemon: any[] = [];

            // Procesar todos los pokémon de este jugador
            while (
                tokens[i] &&
                tokens[i].getTypeTokenString() === "STRING"
            ) {
                let pokemonName = tokens[i].getLexeme().replace(/"/g, "");
                // Saltar hasta encontrar el tipo (palabra reservada entre corchetes)
                i++;
                while (tokens[i] && tokens[i].getTypeTokenString() !== "RESERVED_WORD") i++;
                let type = tokens[i] ? tokens[i].getLexeme() : "";
                // Saltar hasta encontrar el parentesis de apertura
                while (tokens[i] && tokens[i].getTypeTokenString() !== "PAR_OPEN") i++;
                i++; // Avanza después del paréntesis
                let health = 0, attack = 0, defense = 0;

                // Leer stats hasta cerrar el parentesis
                while (
                    tokens[i] &&
                    tokens[i].getTypeTokenString() !== "PAR_CLOSE"
                ) {
                    if (
                        tokens[i].getTypeTokenString() === "RESERVED_WORD"
                    ) {
                        let stat = tokens[i].getLexeme();
                        // Saltar hasta encontrar el número
                        while (tokens[i] && tokens[i].getTypeTokenString() !== "NUMBER") i++;
                        let value = tokens[i] ? parseInt(tokens[i].getLexeme()) : 0;
                        if (stat === "salud") health = value;
                        if (stat === "ataque") attack = value;
                        if (stat === "defensa") defense = value;
                    }
                    i++;
                }
                // Saltar el paréntesis de cierre
                if (tokens[i] && tokens[i].getTypeTokenString() === "PAR_CLOSE") i++;
                listPokemon.push({ name: pokemonName, type, health, attack, defense });

                // Saltar posibles separadores o saltos de línea hasta el siguiente STRING o fin de bloque
                while (
                    tokens[i] &&
                    tokens[i].getTypeTokenString() !== "STRING" &&
                    tokens[i].getTypeTokenString() !== "CURLY_BRACKET_CLOSE"
                ) {
                    i++;
                }
            }
            players.push({ name, listPokemon });

            // Saltar la llave de cierre del jugador
            while (tokens[i] && tokens[i].getTypeTokenString() !== "CURLY_BRACKET_CLOSE") i++;
            if (tokens[i] && tokens[i].getTypeTokenString() === "CURLY_BRACKET_CLOSE") i++;
        } else {
            i++;
        }
    }
    return { players };
}