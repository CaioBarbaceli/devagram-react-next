import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import comAutorizacao from "../../hoc/comAutorizacao";
import UploadImagem from "../../componentes/uploadImagem"
import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg';
import Botao from '../../componentes/botao/index';
import imagemsetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import FeedService from "../../services/FeedService";

const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

function Publicacao() {
    const [imagem, setImagem] = useState();
    const [descricao, setDescricao] = useState('');
    const [inputImagem, setInputImagem] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const router = useRouter();

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm() && imagem) {
            return 'cancelar'
        }

        return '';
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }

        if (estaNaEtapaUm()) {
            return 'Avançar'
        }

        return 'Compartilhar';
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()) {
            inputImagem.value = null;
            setImagem(null);
            return;
        }
        setEtapaAtual(1);
    }

    const aoClicarAcaoDireitaCabecalho = () => {
        if (estaNaEtapaUm()) {
            setEtapaAtual(2);
            return;
        }

        publicar();
    }

    const obterClassNameCabecalho = () => {
        if (estaNaEtapaUm()) {
            return 'primeiraEtapa';
        }

        return 'segundaEtapa';
    }

    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert('A descricao precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada.');
                return;
            }

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

            await feedService.FazerPublicacao(corpoPublicacao);
            router.push('/');
        } catch (error) {
            alert('Erro ao salvar publicacao');
        }
    }

    const validarFormulario = () => {
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        );
    }

    return (
        <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes
                className={obterClassNameCabecalho}
                iconeEsquerda={estaNaEtapaUm() ? null : imagemsetaEsquerda}
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
                titulo='Nova publicação'
            />

            <hr className="linhaDivisoria" />

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                    ? (
                        <div className="primeiraEtapa">
                            <UploadImagem
                                setImagem={setImagem}
                                aoSetarAReferencia={setInputImagem}
                                imagemPreviewClassName={!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'}
                                imagemPreview={imagem?.preview || imagemPublicacao.src}
                            />

                            <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>

                            <Botao
                                texto='Selecionar uma Imagem'
                                manipularClique={() => inputImagem?.click()}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="segundaEtapa">
                                <UploadImagem
                                    setImagem={setImagem}
                                    imagemPreview={imagem?.preview}
                                />

                                <textarea
                                    rows={3}
                                    value={descricao}
                                    placeholder="Escreva uma legenda..."
                                    onChange={e => setDescricao(e.target.value)}
                                ></textarea>

                            </div>
                            <hr className="linhaDivisoria" />
                        </>
                    )}

            </div>
        </div>


    )
}

export default comAutorizacao(Publicacao);