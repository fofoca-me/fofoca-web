import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const TERMS_LINK = [
  {
    id: 'uso-plataforma',
    title: 'Uso da Plataforma'
  },
  {
    id: 'moderacao',
    title: 'Moderação'
  },
  {
    id: 'lgpd',
    title: 'LGPD e Exclusão de Dados'
  },
  {
    id: 'Contato',
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

        <span className='font-bold'>Termos e Condições de Uso</span>
      </header>

      <div>
        <h1 className='text-8xl font-bold text-[#EF2182]'>
          Termos e Condições de Uso
        </h1>
      </div>

      <div className='flex items-start gap-16 bg-white p-10 text-gray-900'>
        <div className='sticky top-16 flex flex-col gap-2 py-2'>
          {TERMS_LINK.map((link) => (
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

        <div className='flex flex-col gap-2'>
          <p className='mb-4'>Última atualização: 07 de setembro de 2024</p>

          <div className='flex flex-col gap-2' id='uso-plataforma'>
            <h2 className='mb-2 text-2xl font-semibold'>
              1. Uso da Plataforma
            </h2>
            <p className='mb-4'>
              O serviço fofoca.me permite que você publique mensagens curtas,
              chamadas de &quot;fofocas&quot;. Mantenha o respeito ao interagir
              na plataforma.
            </p>
          </div>

          <div className='flex flex-col gap-2' id='moderacao'>
            <h2 className='mb-2 text-2xl font-semibold'>2. Moderação</h2>
            <p className='mb-4'>
              Reservamo-nos o direito de remover qualquer conteúdo considerado
              inadequado e suspender contas que violarem nossas políticas, sem
              aviso prévio.
            </p>
          </div>
          <div className='flex flex-col gap-2' id='lgpd'>
            <h2 className='mb-2 text-2xl font-semibold'>
              3. LGPD e Exclusão de Dados
            </h2>
            <p className='mb-4'>
              Em conformidade com a LGPD, você pode solicitar a exclusão dos
              seus dados a qualquer momento através do e-mail: dpo@fofoca.me.
            </p>
          </div>
          <div className='flex flex-col gap-2' id='contato'>
            <h2 className='mb-2 text-2xl font-semibold'>4. Contato</h2>
            <p className='mb-4'>
              Para mais informações, entre em contato pelo e-mail:
              contato@fofoca.me.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
