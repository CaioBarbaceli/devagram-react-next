import React, { useState, useEffect } from 'react';
import Postagem from './Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export function Feed({ usuarioLogado }) {
    const [listaDePostagens, setListaDePostagens] = useState([]);

    useEffect(async () => {
        const { data } = await feedService.carregarPostagens();
        console.log(data);

        // const postagensFormatadas = data.map((postagem) => (
        //     {
        //         id: postagem._id,
        //         usuario: {
        //             id: postagem.userId,
        //             nome: postagem.usuario.nome,
        //             avatar: postagem.usuario.avatar
        //         },
        //         fotoDoPost: postagem.foto,
        //         descricao: postagem.descricao,
        //         curtidas: postagem.likes,
        //         comentarios: postagem.comentarios.map(c => ({
        //             nome: c.nome,
        //             mensagem: c.comentario
        //         }))
        //     }
        // ));

        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Douglas',
                    avatar: null
                },
                fotoDoPost: 'https://static.vecteezy.com/ti/fotos-gratis/t1/22784466-ilustracao-do-jesus-rezar-cercado-de-pombas-em-uma-nuvem-generativo-ai-foto.jpg',
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet pharetra lacus quis dignissim. Proin vestibulum ex est. Curabitur euismod sit amet dolor nec cursus. Duis sit amet dui eget velit mattis vestibulum eu sed turpis. Nunc nec metus eu diam imperdiet accumsan. Sed vulputate gravida eros et consectetur. Phasellus pharetra malesuada mauris, sit amet aliquet metus hendrerit eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero metus, id imperdiet libero consectetur vitae. In vestibulum erat pretium metus semper posuere.',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Fulano',
                        mensagem: 'Muito Brabo'
                    },
                    {
                        nome: 'Fulano de Tal',
                        mensagem: 'Brabo Demais'
                    },
                    {
                        nome: 'Ciclano',
                        mensagem: 'Brabíssimo'
                    }
                ]

            },
            {
                id: '2',
                usuario: {
                    id: '2',
                    nome: 'Carlos',
                    avatar: null
                },
                fotoDoPost: 'https://cdn.awsli.com.br/2500x2500/1672/1672036/produto/229027340/quadro-jesus-cristo-fonte-de-luz-aey86nbklo.jpg',
                descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet pharetra lacus quis dignissim. Proin vestibulum ex est. Curabitur euismod sit amet dolor nec cursus. Duis sit amet dui eget velit mattis vestibulum eu sed turpis. Nunc nec metus eu diam imperdiet accumsan. Sed vulputate gravida eros et consectetur. Phasellus pharetra malesuada mauris, sit amet aliquet metus hendrerit eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero metus, id imperdiet libero consectetur vitae. In vestibulum erat pretium metus semper posuere.',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Fulano',
                        mensagem: 'Muito Brabo'
                    },
                    {
                        nome: 'Fulano de Tal',
                        mensagem: 'Brabo Demais'
                    },
                    {
                        nome: 'Ciclano',
                        mensagem: 'Brabíssimo'
                    }
                ]

            }
        ]);
        // setListaDePostagens(postagensFormatadas);
    }, [usuarioLogado]);

    return (
        <div className='feedContainer largura30pctDesktop'>
            {listaDePostagens.map(dadosPostagem => (
                <Postagem
                    key={dadosPostagem.id}
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                />
            ))}
        </div>
    )
}