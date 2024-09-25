import { Toaster } from 'react-hot-toast';
import { SEO } from '@components/common/seo';
import { AuthLayout } from '@components/layout/auth-layout';
import { LoginFooter } from '@components/login/login-footer';
import { LoginMain } from '@components/login/login-main';
import type { ReactElement, ReactNode } from 'react';
import type { DefaultToastOptions } from 'react-hot-toast';

const toastOptions: DefaultToastOptions = {
  style: {
    color: 'white',
    borderRadius: '4px',
    backgroundColor: 'rgb(var(--main-accent))'
  },
  success: { duration: 4000 }
};

export default function Login(): JSX.Element {
  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <SEO
        title='Fofoca-me - A nossa rede social!'
        description='Desde os nossos memes aos debates políticos, tudo você encontra aqui.'
      />

      <LoginMain />
      <LoginFooter />
    </div>
  );
}

Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>
    <Toaster
      position='bottom-center'
      toastOptions={toastOptions}
      containerClassName='mb-12 xs:mb-0'
    />
    {page}
  </AuthLayout>
);
