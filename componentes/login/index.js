import InputPublico from "../input-publico";
import Botao from "../../componentes/botao";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {validarEmail, validarSenha} from "../../utils/validadores"

import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/chave.svg";
import imagemLogo from "../../public/imagens/logo.svg";
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Login({aposAutenticacao}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    const validarFormulario = () => {
        return(
            validarEmail(email)
            && validarSenha(senha)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true);

        try {
            await usuarioService.login({
                login: email, 
                senha
            });

            if(aposAutenticacao){
                //redirecionar o usuario para a home
                aposAutenticacao();
            }
            
        } catch (error) {
            alert(
                "Erro ao realizar o login. " + error?.response?.data?.erro
            );
        }
        setEstaSubmetendo(false);
    }
    return(
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">
                <Image 
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O endereco informado é invalido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="Precisa ter pelo menos 4 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <Botao
                        texto={"Login"}
                        type="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta</p>
                    <Link href="/cadastro">Faça o seu cadastro agora</Link>
                </div>
            </div>
        </section>
    )
}