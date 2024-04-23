import Avatar from "../avatar";
import { useState } from "react";

export function FazerComentario({ usuarioLogado, comentar }) {
    const [linhas, setLinhas] = useState(1);
    const [comentario, setComentario] = useState('');

    const aoDigitarComentario = (e) => {
        const valorInput = e.target.value;
        console.log(valorInput);
        setComentario(valorInput);
        setLinhas(valorInput.length > 0 ? 2 : 1);
    }

    const aoPressionarQualquerTecla = (e) => {
        if (e.key === 'Enter') {
            fazerComentario();
        }
    }

    const fazerComentario = () => {
        if (comentario.trim().length === 0 || !comentar) {
            return;
        }

        comentar(comentario);
    }

    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar} />
            <textarea
                rows={1}
                onChange={aoDigitarComentario}
                onKeyDown={aoPressionarQualquerTecla}
                value={comentario}
                placeholder="Adicione um comentario...">
            </textarea>

            <button
                type="button"
                className="btnPublicacao desktop"
                onClick={fazerComentario}
            >
                Publicar
            </button>
        </div>
    )
}