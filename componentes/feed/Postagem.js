import Image from "next/image";
import Link from "next/link";
import Avatar from "../avatar";

import imgCurtir from '../../public/imagens/curtir.svg'
import imgCurtido from '../../public/imagens/curtido.svg'
import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg'
import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg'
import { useState } from "react";
import { FazerComentario } from "./FazerComentario";

const tamanhoLimiteDescricao = 90;

export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado
}){
    const [deveExibirSecaoParaComentar, setdeveExibirSecaoParaComentar] = useState(false);
    const [tamanhoAtualDescricao, setTamanhoAtualDaDescricao] = useState(
        tamanhoLimiteDescricao
    );

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
    }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDescricao;
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDescricao);
        if(descricaoMaiorQueLimite()){
            mensagem += '...'
        }
        return mensagem;
    }


    
    return(
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar}/>
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoDaPostagem">
                <img src={fotoDoPost} alt='foto da postagem'/>
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDoRodapeDaPostagem">
                    <Image
                        src={imgCurtir}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={() => console.log('curtir')}
                    />

                    <Image
                        src={imgComentarioCinza}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setdeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeDeCurtidas">
                        Curtido por <strong>32 pessoas</strong>
                    </span>
                </div>

                <div className="descricaoDaPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                                <span 
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                    mais
                                </span>
                            )
                        }
                    </p>
                </div>

                <div className="comentariosDaPublicacao">
                    {comentarios.map((comentario, i) =>(
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {
                deveExibirSecaoParaComentar &&
                <FazerComentario usuarioLogado={usuarioLogado}/>
            }

        </div>
    );
}