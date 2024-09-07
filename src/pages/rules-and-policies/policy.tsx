import React from 'react';
import Image from 'next/image';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className='max-w-4xl mx-auto p-4 sm:p-8 bg-gray-100 text-gray-800'>
        <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <Image
            alt='Logo da fofoca-me'
            width={64}
            height={64}
            src={'/logo-fofocame.png'}
        />
        <h1 className='text-3xl sm:text-4xl font-bold mb-6'>Política de Privacidade</h1>
        <p className='mb-4'>Última atualização: 07 de setembro de 2024</p>
        <p className='mb-4'>
            Na plataforma fofoca.me, levamos a privacidade dos nossos usuários muito
            a sério. Esta política de privacidade explica como coletamos, usamos e
            protegemos as informações fornecidas por você ao usar nosso serviço.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>1. Coleta de Dados</h2>
        <p className='mb-4'>
            Utilizamos o Firebase do Google para gerenciar o login dos usuários,
            permitindo o uso de Gmail e Apple ID. Não armazenamos nenhuma
            informação pessoal diretamente em nossos servidores, pois todos os dados
            são geridos e protegidos pelo Firebase.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>2. Uso das Informações</h2>
        <p className='mb-4'>
            As informações coletadas por meio do Firebase são usadas exclusivamente
            para autenticação e gestão de contas.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>3. LGPD e Exclusão de Dados</h2>
        <p className='mb-4'>
            Em conformidade com a LGPD, você pode solicitar a exclusão dos seus
            dados a qualquer momento, entrando em contato conosco pelo e-mail
            dpo@fofoca.me.
        </p>
        <h2 className='text-2xl font-semibold mb-2'>4. Contato</h2>
        <p className='mb-4'>
            Para qualquer dúvida sobre nossa política de privacidade, entre em contato pelo e-mail: contato@fofoca.me.
        </p>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
