import CabecalhoPerfil from '../../../componentes/cabecalhoPerfil';
import Feed from '../../../componentes/feed'
import comAutorizacao from '../../../hoc/comAutorizacao';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Perfil({ usuarioLogado }) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    useEffect(async () => {
        setUsuario({
            nome: 'Douglas Oliveira'
        });
        console.log('chegou aqui')
    }, [router.query.id]);

    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />
            <Feed usuarioLogado={usuarioLogado} />
        </div>
    );
}

export default comAutorizacao(Perfil);