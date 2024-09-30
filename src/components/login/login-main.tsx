/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';
import { NextImage } from '@components/ui/next-image';
import { LoginSingIn } from './login-sign-in';
import { LoginSingUp } from './login-sign-up';

interface Navigator {
  standalone?: boolean;
}

const isWebView = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined')
    return false;

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPhone|iPod|iPad/i.test(userAgent) && !window.MSStream)
    return (
      (window.navigator as Navigator).standalone === false ||
      /Instagram/.test(userAgent)
    );

  return /wv|Android.*AppleWebKit(?!.*Safari)/i.test(userAgent);
};

export function LoginMain(): JSX.Element {
  const { signInWithGoogle } = useAuth();
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

  const isInWebView = isWebView();

  const handleCloseSignIn = () => setIsSignInOpen(!isSignInOpen);
  const handleCloseSignUp = () => setIsSignUpOpen(!isSignUpOpen);

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
          <h1
            className='text-3xl before:content-["Aqui_você_pode_fofocar_a_vontade."] 
                       lg:text-6xl lg:before:content-["Aqui_você_pode_fofocar_a_vontade."]'
          />
          <h2 className='hidden text-xl lg:block lg:text-3xl'>
            Cadastre-se no Fofoca hoje.
          </h2>
        </div>
        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>
            {!isInWebView && (
              <Button
                className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                         hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                         dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
                onClick={signInWithGoogle}
              >
                <CustomIcon iconName='GoogleIcon' /> Inscreva-se com Google
              </Button>
            )}

            {/* <Button
              className='flex cursor-not-allowed justify-center gap-2 border border-light-line-reply font-bold text-light-primary
                         transition hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0
                         dark:bg-white dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
            >
              <CustomIcon iconName='AppleIcon' /> Inscreva-se com Apple
            </Button> */}

            <Button
              onClick={() => setIsSignUpOpen(true)}
              className='border border-light-line-reply bg-[#EF2182] font-bold text-[#FFF] hover:bg-[#EF2182]/10
                         focus-visible:bg-[#EF2182]/10 focus-visible:!ring-[#EF2182]/80 active:bg-[#EF2182]/20
                         dark:border-light-secondary'
            >
              Criar conta
            </Button>

            <p
              className='inner:custom-underline inner:custom-underline text-center text-xs
                         text-light-secondary inner:text-[#EF2182] dark:text-dark-secondary'
            >
              Ao se inscrever, você concorda com os{' '}
              <a
                href='/rules-and-policies/terms'
                target='_blank'
                rel='noreferrer'
              >
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a
                href='/rules-and-policies/policy'
                target='_blank'
                rel='noreferrer'
              >
                Política de Privacidade
              </a>
              , incluindo{' '}
              <a
                href='/rules-and-policies/cookies'
                target='_blank'
                rel='noreferrer'
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
              onClick={() => setIsSignInOpen(true)}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>

      <LoginSingIn
        title='Faça o login no Fofoca.me'
        googleProviderTitle='Entrar'
        isModalOpen={isSignInOpen}
        onCloseModal={handleCloseSignIn}
        verifyWebView={isInWebView}
      />

      <LoginSingUp
        title='Cadastre-se no Fofoca.me'
        googleProviderTitle='Inscreva-se'
        isModalOpen={isSignUpOpen}
        onCloseModal={handleCloseSignUp}
      />
    </main>
  );
}
