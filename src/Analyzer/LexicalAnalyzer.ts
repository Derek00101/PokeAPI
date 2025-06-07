import { Token, Type } from "./Token";

class LexicalAnalyzer {

    private row: number;
    private column: number;
    private auxChar: string;
    private state: number;
    private tokenList: Token[];
    private errorList: Token[];

    constructor() {
        this.row = 1;
        this.column = 1;
        this.auxChar = '';
        this.state = 0;
        this.tokenList = [];
        this.errorList = [];
    }

    scanner(input: string) {
        input += '#'
        let char: string;

        for (let i: number = 0; i < input.length; i++) {
             
            char = input[i];

            switch(this.state) {
                case 0:
                    switch(char) {
                        case 'J': // 1
                            this.state = 1; // Palabra reservada
                            this.addCharacter(char);
                            break;
                        case 's': // 2
                            this.state = 8; // Palabra reservada
                            this.addCharacter(char);
                            break;
                        case 'a': // 3
                            this.state = 13; // Palabra reservada
                            this.addCharacter(char);
                            break;
                        case 'd': // 4
                            this.state = 19; // Palabra reservada    
                            this.addCharacter(char);
                            break;
                        case 'p': // 5
                            this.state = 34; // Palabra reservada
                            this.addCharacter(char);
                            break;
                        case 'f': // 6
                            this.state = 47; // Palabra reservada
                            this.addCharacter(char);
                            break;
                        case 'n': // 7
                            this.state = 52; // Palabra reservada
                            this.addCharacter(char);
                            break;
                        case '{': // 8
                            this.state = 58; // Llave abierta
                            this.addCharacter(char);
                            break;
                        case '}': // 9
                            this.state = 59; // Llave cerrada
                            this.addCharacter(char);
                            break;
                        case ':': // 10
                            this.state = 60; // Dos puntos
                            this.addCharacter(char);
                            break;
                        case '[': // 11
                            this.state = 61; // Corchete abierto
                            this.addCharacter(char);
                            break;
                        case ']': // 12
                            this.state = 62; // Corchete cerrado
                            this.addCharacter(char);
                            break;
                        case '=': // 13
                            this.state = 63; // Signo igual
                            this.addCharacter(char);
                            break;
                        case ';': // 14
                            this.state = 64; // Punto y coma
                            this.addCharacter(char);
                            break;
                        case '(': // 15
                            this.state = 65; // Paréntesis abierto
                            this.addCharacter(char);
                            break;
                        case ')': // 16
                            this.state = 66; // Paréntesis cerrado
                            this.addCharacter(char);
                            break;
                        case '"': // 17
                            this.state = 68; // Inicio de cadena
                            this.addCharacter(char);
                            break;
                        case ' ': 
                            this.column++;
                            break;
                        case '\n':
                        case '\r':
                            this.row++;
                            this.column = 1;
                            break;
                        case '\t':
                            this.column += 4; // Considerando tabulación como 4 espacios    
                            break;
                        default:
                            if (/\d/.test(char)) { 
                                // Es un dígito
                                this.state = 67; // Inicio de número
                                this.addCharacter(char);

                            }   else if (char === '#' && i === input.length - 1) {
                                // Fin del análisis

                                console.log("Fin del analisis");
                                
                            } else {
                                // Error léxico
                                this.addError(Type.UKNOWN, char, this.row, this.column);
                                this.column++;
                                this.state = 0; // Reiniciar estado
                            }
                            break;
                    }
                    break;
                case 1:
                    if (char != 'u') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 2; // Palabra reservada    
                    break;
                case 2:
                    if (char != 'g') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 3; // Palabra reservada
                    break;
                case 3:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 4; // Palabra reservada
                    break;
                case 4:
                    if (char != 'd') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 5; // Palabra reservada
                    break;
                case 5:
                    if (char != 'o') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 6; // Palabra reservada
                    break;
                case 6:
                    if (char != 'r') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 7; // Palabra reservada
                    break;
                case 7:
                    // Aceptación de "Jugador"
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // <-- Agrega esto
                    break;
                case 8:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 9; // Palabra reservada
                    break;
                case 9:
                    if (char != 'l') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 10; // Palabra reservada

                    break;
                case 10:
                    if (char != 'u') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 11; // Palabra reservada
                    break;
                case 11:
                    if (char != 'd') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 12; // Palabra reservada
                    break;
                case 12:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character

                    break;
                case 13:
                    if (char === 't') {
                        this.addCharacter(char);
                        this.state = 14; // Siguiente estado para 'ataque'
                    } else if (char === 'g') {
                        this.addCharacter(char);
                        this.state = 26; // Siguiente estado para 'agua'
                    } else {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    break;
                case 14:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 15; // Palabra reservada
                    break;
                case 15:
                    if (char != 'q') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 16; // Palabra reservada
                    break;
                case 16:
                    if (char != 'u') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 17; // Palabra reservada
                    break;
                case 17:
                    if (char != 'e') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 18; // Palabra reservada
                    break;
                case 18:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character
                    break;
                case 19:
                    if (char === 'e') {
                        this.addCharacter(char);
                        this.state = 20; // Siguiente estado para 'defensa'
                    } else if (char === 'r') {
                        this.addCharacter(char);
                        this.state = 29; // Siguiente estado para 'dragon'
                    } else {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    break;
                case 20:
                    if (char != 'f') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 21; // Palabra reservada

                    break;
                case 21:
                    if (char != 'e') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 22; // Palabra reservada

                    break;
                case 22:
                    if (char != 'n') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 23; // Palabra reservada
                    break;
                case 23:
                    if (char != 's') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 24; // Palabra reservada
                    break;
                case 24:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 25; // Palabra reservada
                    break;
                case 25:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character

                    break;
                case 26:
                    if (char != 'u') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 27; // Palabra reservada
                    
                    break;
                case 27:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 28; // Palabra reservada
                    break;
                case 28:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character

                    break;
                case 29:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 30; // Palabra reservada

                    break;
                case 30:
                    if (char != 'g') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 31; // Palabra reservada
                    break;
                case 31:
                    if (char != 'o') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 32; // Palabra reservada
                    break;
                case 32:
                    if (char != 'n') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 33; // Palabra reservada
                    break;
                case 33:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character
                    break;
                case 34:
                    if (char === 'l') {
                        this.addCharacter(char);
                        this.state = 35; // Siguiente estado para 'planta'
                    } else if (char === 's') {
                        this.addCharacter(char);
                        this.state = 40; // Siguiente estado para 'psiquico'
                    } else {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    break;
                case 35:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 36; // Palabra reservada
                    break;
                case 36:
                    if (char != 'n') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 37; // Palabra reservada
                    break;
                case 37:
                    if (char != 't') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 38; // Palabra reservada

                    break;
                case 38:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 39; // Palabra reservada
                    break;
                case 39:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character

                    break;
                case 40:
                    if (char != 'i') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 41; // Palabra reservada
                    break;
                case 41:
                    if (char != 'q') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 42; // Palabra reservada
                    break;
                case 42:
                    if (char != 'u') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 43; // Palabra reservada
                    break;
                case 43:
                    if (char != 'i') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 44; // Palabra reservada
                    break;
                case 44:
                    if (char != 'c') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 45; // Palabra reservada
                    break;
                case 45:
                    if (char != 'o') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 46; // Palabra reservada
                    break;
                case 46:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character

                    break;
                case 47:
                    if (char != 'u') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 48; // Palabra reservada
                    break;
                case 48:
                    if (char != 'e') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 49; // Palabra reservada
                    break;
                case 49:
                    if (char != 'g') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 50; // Palabra reservada
                    break;
                case 50:
                    if (char != 'o') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 51; // Palabra reservada
                    break;
                case 51:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character
                    break;
                case 52:
                    if (char != 'o') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 53; // Palabra reservada
                    break;
                case 53:
                    if (char != 'r') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 54; // Palabra reservada
                    break; 
                case 54:
                    if (char != 'm') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 55; // Palabra reservada
                    break;
                case 55:
                    if (char != 'a') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 56; // Palabra reservada
                    break;
                case 56:
                    if (char != 'l') {
                        //error lexico
                        this.addError(Type.UKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.state = 0; // Reset state
                        i--; // Decrement i to avoid skipping the next character
                        continue; // Skip to the next iteration
                    }
                    this.addCharacter(char);
                    this.state = 57; // Palabra reservada
                    break;
                case 57:
                    // Aceptación
                    this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrement i to avoid skipping the next character
                    break;
                case 58:
                    // Llave abierta
                    this.addToken(Type.CURLY_BRACKET_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                case 59:
                    // Llave cerrada
                    this.addToken(Type.CURLY_BRACKET_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                    
                case 60:
                    if (char == '=') {
                        
                        this.state = 70; // Nuevo estado para aceptar :=
                        this.addCharacter(char);
                        continue; // Continuar construyendo el token
                    } 
                        
                        this.addToken(Type.COLON, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--; 
                    break;
                case 61:
                    // Corchete abierto
                    this.addToken(Type.SQUARE_BRACKET_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                case 62:
                    // Corchete cerrado
                    this.addToken(Type.SQUARE_BRACKET_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                case 63:
                    // Signo igual
                    this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                case 64:
                    // Punto y coma
                    this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                case 65:
                    // Paréntesis abierto
                    this.addToken(Type.PAR_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                case 66:
                    // Paréntesis cerrado
                    this.addToken(Type.PAR_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Aceptación
                    break;
                case 67:
                    // Aceptación
                    if (/\d/.test(char)) {
                        this.addCharacter(char);
                        continue; // Continuar construyendo el número
                    }
                    
                    this.addToken(Type.NUMBER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; // Decrementar i para no saltar el siguiente carácter
                    // Si el carácter no es un dígito, se procesará en la siguiente iteración

                    break;
                case 68:
                    if (char == '"') {
                        this.state = 69; 
                        this.addCharacter(char);
                        continue;
                    }

                    this.addCharacter(char);
                    break;
                case 69:
                    // Aceptación
                    this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--; 

                    break;
                case 70:
                    // Aceptación de :=
                    this.addToken(Type.EQUAL_COLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
            }

        }

        return this.tokenList;
    }

    private addCharacter(char: string) {
        this.auxChar += char;
        this.column++;
    }

    
    private clean() {
        this.state = 0; 
        this.auxChar = ''; 
    }

    private addToken(type: Type, lexeme: string, row: number, column: number) {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    private addError(type: Type, lexeme: string, row: number, column: number) {
        this.errorList.push(new Token(type, lexeme, row, column));
    }

    getErrorList(){
        return this.errorList;
    }

}

export { LexicalAnalyzer };