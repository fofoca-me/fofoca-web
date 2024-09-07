import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';
import { NextImage } from '@components/ui/next-image';
import { useAuth } from '@lib/context/auth-context';
import Image from 'next/image';

export function LoginMain(): JSX.Element {
  const { signInWithGoogle } = useAuth();

  return (
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      <div className='relative hidden items-center justify-center  lg:flex'>
        <NextImage
          imgClassName='object-cover'
          src='/assets/login-background.png'
          alt='Fofoca banner'
          layout='fill'
          useSkeleton
        />
      </div>
      <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
          <Image
            alt='Logo da fofoca-me'
            width={64}
            height={64}
            src={'/logo-fofocame.png'}
          />
        </i>
        <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
          <h1 className='text-3xl lg:text-6xl'>
            Aqui você pode fofocar a vontade
          </h1>
          <h2 className='hidden text-xl lg:block lg:text-3xl'>
            Cadastre-se no Fofoca hoje.
          </h2>
        </div>
        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>
            <Button
              className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                         hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                         dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
              onClick={signInWithGoogle}
            >
              <CustomIcon iconName='GoogleIcon' /> Inscreva-se no Google
            </Button>
            <Button
              className='flex cursor-not-allowed justify-center gap-2 border border-light-line-reply font-bold text-light-primary
                         transition hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0
                         dark:bg-white dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
            >
              <CustomIcon iconName='AppleIcon' /> Inscreva-se na Apple
            </Button>

            <p
              className='inner:custom-underline inner:custom-underline text-center text-xs
                         text-light-secondary inner:text-[#EF2182] dark:text-dark-secondary'
            >
              Ao se inscrever, você concorda com os{' '}
              <a
                href='https://fofoca.me/terms'
                target='_blank'
                rel='noreferrer'
              >
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a
                href='https://fofoca.me/policy'
                target='_blank'
                rel='noreferrer'
              >
                Política de Privacidade
              </a>
              , incluindo{' '}
              <a
                href='#'
                target='_blank'
                rel='noreferrer'
                className='pointer-events-none'
              >
                uso de cookies
              </a>
              .
            </p>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Já tem uma conta?</p>
            <Button
              className='border border-light-line-reply font-bold text-[#EF2182] hover:bg-[#EF2182]/10
                         focus-visible:bg-[#EF2182]/10 focus-visible:!ring-[#EF2182]/80 active:bg-[#EF2182]/20
                         dark:border-light-secondary'
              onClick={signInWithGoogle}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
