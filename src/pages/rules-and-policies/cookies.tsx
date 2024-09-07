import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const COOKIES_LINK = [
  {
    id: 'cookies-terceiros',
    title: 'Cookies de Terceiros'
  },
  {
    id: 'gerenciamento-cookies',
    title: 'Gerenciamento de Cookies'
  },
  {
    id: 'lgpd',
    title: 'LGPD e Exclusão de Dados'
  },
  {
    id: 'contato',
    title: 'Contato'
  }
];

const PrivacyPolicy: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('');

  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto] items-start gap-12 px-52'>
      <header className='sticky top-0 z-10 flex items-center gap-2 bg-black'>
        <i className='!m-0 self-center lg:mb-10 lg:self-auto'>
          <Link href='/'>
            <Image
              alt='Logo da fofoca-me'
              width={64}
              height={64}
              src={'/logo-fofocame.png'}
            />
          </Link>
        </i>

        <span className='font-bold'>
          Política de Uso de Cookies do Fofoca.me
        </span>
      </header>

      <div>
        <h1 className='text-8xl font-bold text-[#EF2182]'>
          Política de Uso de Cookies do Fofoca.me
        </h1>
      </div>

      <div className='flex items-start gap-16 bg-white p-10 text-gray-900'>
        <div className='sticky top-16 flex flex-col gap-2 py-2'>
          {COOKIES_LINK.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className={`rounded-lg p-2 font-medium  transition hover:transition ${
                activeLink === link.id
                  ? 'bg-[#EF2182] text-white'
                  : 'text-[#EF2182] hover:bg-[#EF2182]/10'
              }`}
              onClick={() => setActiveLink(link.id)}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div>
          <p className='mb-4'>Última atualização: 07 de setembro de 2024</p>

          <div className='flex flex-col gap-2' id='cookies-terceiros'>
            <p className='mb-4'>
              A fofoca.me respeita a privacidade dos seus usuários e atualmente
              não faz uso de cookies próprios para rastreamento ou armazenamento
              de informações no navegador.
            </p>
            <h2 className='mb-2 text-2xl font-semibold'>
              1. Cookies de Terceiros
            </h2>
            <p className='mb-4'>
              Utilizamos ferramentas como Clarity Microsoft, Google Tag Manager
              e Google Analytics que podem utilizar cookies para coletar
              informações de navegação.
            </p>
          </div>

          <div className='flex flex-col gap-2' id='gerenciamento-cookies'>
            <h2 className='mb-2 text-2xl font-semibold'>
              2. Gerenciamento de Cookies
            </h2>
            <p className='mb-4'>
              Você pode gerenciar ou desativar os cookies diretamente nas
              configurações do seu navegador.
            </p>
          </div>
          <div className='flex flex-col gap-2' id='lgpd'>
            <h2 className='mb-2 text-2xl font-semibold'>
              3. LGPD e Exclusão de Dados
            </h2>
            <p className='mb-4'>
              De acordo com a LGPD, caso você deseje solicitar a exclusão dos
              seus dados, por favor entre em contato via e-mail: dpo@fofoca.me.
            </p>
          </div>
          <div className='flex flex-col gap-2' id='contato'>
            <h2 className='mb-2 text-2xl font-semibold'>4. Contato</h2>
            <p className='mb-4'>
              Para dúvidas sobre o uso de cookies, entre em contato pelo e-mail:
              contato@fofoca.me.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
