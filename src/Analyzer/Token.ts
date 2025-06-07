enum Type{
    UKNOWN, 
    PAR_OPEN,
    PAR_CLOSE,
    SEMICOLON,
    COLON,
    SQUARE_BRACKET_CLOSE,
    SQUARE_BRACKET_OPEN,
    CURLY_BRACKET_OPEN,
    CURLY_BRACKET_CLOSE,
    EQUAL,
    RESERVED_WORD,
    NUMBER,
    STRING,
    EQUAL_COLON,
}

class Token {

    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;
    private typeTokenString: string;

    constructor(typeToken: Type, lexeme: string, row: number, column: number){
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken];
        this.lexeme = lexeme;
        this.column = column;
        this.row = row;
    }

    public getLexeme() {
        return this.lexeme;
    }

    public getTypeTokenString() {
        return this.typeTokenString;
    }

    public getRow() {
        return this.row;
    }

    public getColumn() {
        return this.column;
    }
}

export { Token, Type }