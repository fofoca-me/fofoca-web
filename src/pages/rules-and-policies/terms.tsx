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
        <h1 className='text-3xl sm:text-4xl font-bold mb-6'>Termos e Condições de Uso</h1>
      <p className='mb-4'>Última atualização: 07 de setembro de 2024</p>
      <h2 className='text-2xl font-semibold mb-2'>1. Uso da Plataforma</h2>
      <p className='mb-4'>
        O serviço fofoca.me permite que você publique mensagens curtas,
        chamadas de &quot;fofocas&quot;. Mantenha o respeito ao interagir na plataforma.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>2. Moderação</h2>
      <p className='mb-4'>
        Reservamo-nos o direito de remover qualquer conteúdo considerado
        inadequado e suspender contas que violarem nossas políticas, sem aviso
        prévio.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>3. LGPD e Exclusão de Dados</h2>
      <p className='mb-4'>
        Em conformidade com a LGPD, você pode solicitar a exclusão dos seus
        dados a qualquer momento através do e-mail: dpo@fofoca.me.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>4. Contato</h2>
      <p className='mb-4'>
        Para mais informações, entre em contato pelo e-mail: contato@fofoca.me.
      </p>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
