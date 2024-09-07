import Image from 'next/image';
import Link from 'next/link';

export default function Help() {
  return (
    <div className='grid  grid-rows-[1fr,auto] items-start gap-12 px-52'>
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

        <span className='font-bold'>Ajuda</span>
      </header>

      <div className='text-center'>
        <h1 className='text-8xl font-bold text-[#EF2182]'>
          Como podemos ajudar?
        </h1>
      </div>

      <div className='flex items-center justify-center gap-16 bg-white p-10 text-center text-gray-900'>
        <div className='flex flex-col gap-2'>
          <p className='mb-4 max-w-5xl'>
            Encontre as respostas que você precisa para aproveitar ao máximo
            nossa plataforma de mídia social. Encontre as respostas que precisa
          </p>

          <div className='flex max-w-5xl flex-col gap-2' id='uso-plataforma'>
            <h2 className='mb-2 text-2xl font-semibold text-[#EF2182]'>
              adm@fofoca.me
            </h2>
            <p className='mb-4'>
              Estamos aqui para te ajudar! Se você encontrar qualquer problema
              na plataforma ou tiver dúvidas sobre como utilizar nossos
              serviços, sinta-se à vontade para entrar em contato. Você pode nos
              enviar um e-mail com qualquer solicitação, desde questões técnicas
              até sugestões de melhoria. Nossa equipe de suporte fará o possível
              para responder o mais rápido possível.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
