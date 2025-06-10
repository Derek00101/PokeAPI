import { Request, Response } from 'express';
import { parsePlayers } from '../parser/PlayerParser';
import { LexicalAnalyzer } from '../Analyzer/LexicalAnalyzer';

export const analyze = (req: Request, res: Response) => {
    // Obtiene el texto de entrada
    const input = typeof req.body.editor !== 'undefined' ? req.body.editor : req.body;
    
    // Realiza el analisis lexico
    const lexer = new LexicalAnalyzer();
    const tokenList = lexer.scanner(input);
    const errorList = lexer.getErrorList();
    const parsed = parsePlayers(tokenList);

    // Retorna respuesta JSON si es necesario
    if (req.headers.accept?.includes('application/json') || 
        req.headers['content-type'] === 'application/json' || 
        req.xhr) {
        return res.json({
            players: parsed.players,
            tokens: tokenList,
            errors: errorList,
            input
        });
    }

    // Maneja errores y renderiza la vista
    if (errorList.length > 0) {
        return res.render('pages/index', { tokens: tokenList, errors: errorList, input });
    }

    res.render('partials/jugador', { jugadores: parsed.players });
};