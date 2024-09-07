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
        <h1 className='text-3xl sm:text-4xl font-bold mb-6'>Política de Uso de Cookies</h1>
      <p className='mb-4'>Última atualização: 7 de setembro de 2024</p>
      <p className='mb-4'>
        A fofoca.me respeita a privacidade dos seus usuários e atualmente não
        faz uso de cookies próprios para rastreamento ou armazenamento de
        informações no navegador.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>1. Cookies de Terceiros</h2>
      <p className='mb-4'>
        Utilizamos ferramentas como Clarity Microsoft, Google Tag Manager e
        Google Analytics que podem utilizar cookies para coletar informações de
        navegação.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>2. Gerenciamento de Cookies</h2>
      <p className='mb-4'>
        Você pode gerenciar ou desativar os cookies diretamente nas configurações do seu navegador.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>3. LGPD e Exclusão de Dados</h2>
      <p className='mb-4'>
        De acordo com a LGPD, caso você deseje solicitar a exclusão dos seus dados, por favor entre em contato via e-mail: dpo@fofoca.me.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>4. Contato</h2>
      <p className='mb-4'>
        Para dúvidas sobre o uso de cookies, entre em contato pelo e-mail: contato@fofoca.me.
      </p>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
