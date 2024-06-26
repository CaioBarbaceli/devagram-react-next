import Link from "next/link";
import Image from "next/image";
import Botao from "../../componentes/botao";
import UploadImagem from "../../componentes/uploadImagem"
import InputPublico from "../../componentes/input-publico";

import { useState } from "react";
import { validarEmail, validarSenha, validarNome, validarConfirmacaoSenha } from "../../utils/validadores";
import UsuarioService from "../../services/UsuarioService";

import imagemLogo from "../../public/imagens/logo.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/chave.svg";
import imagemAvatar from "../../public/imagens/avatar.svg";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function Cadastro(){
    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const router = useRouter();

    const validarFormulario = () => {
        return(
            validarNome(nome)
            && validarEmail(email)
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmacaoSenha)
        )
    }

    const aoSubmeter = async (e) => {
        //evita o comportamento default de algum evento. Neste caso, evita o reload da pagina automático pelo HTML 
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true);
        
        try {
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nome);
            corpoReqCadastro.append("email", email);
            corpoReqCadastro.append("senha", senha);

            if(imagem?.arquivo){
                corpoReqCadastro.append("file", imagem.arquivo);
            }

            await usuarioService.cadastro(corpoReqCadastro);
            await usuarioService.login({
                login: email,
                senha
            });

            router.push('/');
        } catch (error) {
            alert(
                "Erro ao cadastrar Usuario. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return(
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                <Image 
                    priority
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setImagem}

                    />
                    <InputPublico
                        imagem={imagemUsuarioAtivo}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa de pelo menos 2 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />

                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="o endereço informado é invalido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="Precisa ter ao menos 4 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
                        valor={confirmacaoSenha}
                        mensagemValidacao="As precisam ser iguais"
                        exibirMensagemValidacao={confirmacaoSenha && !validarConfirmacaoSenha(senha, confirmacaoSenha) }
                    />

                    <Botao
                        texto="Cadastrar"
                        type="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora</Link>
                </div>
            </div>
        </section>
    );
}