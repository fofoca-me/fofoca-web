/* eslint-disable linebreak-style */
import cn from 'clsx';
import Image from 'next/image';
import { useWindow } from '@lib/context/window-context';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { MobileSidebar } from '@components/sidebar/mobile-sidebar';
import type { ReactNode } from 'react';
import type { IconName } from '@components/ui/hero-icon';

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  disableSticky?: boolean;
  useActionButton?: boolean;
  useMobileSidebar?: boolean;
  action?: () => void;
};

export function MainHeader({
  tip,
  title,
  children,
  iconName,
  className,
  disableSticky,
  useActionButton,
  useMobileSidebar,
  action
}: HomeHeaderProps): JSX.Element {
  const { isMobile } = useWindow();
  return (
    <header
      className={cn(
        'hover-animation even z-10 bg-main-background/60 px-4 py-2 backdrop-blur-md',
        !disableSticky && 'sticky top-0',
        className ?? 'flex items-center gap-6'
      )}
    >
      {useActionButton && (
        <Button
          className='dark-bg-tab group relative p-2 hover:bg-light-primary/10 active:bg-light-primary/20 
                     dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
          onClick={action}
        >
          <HeroIcon
            className='h-5 w-5'
            iconName={iconName ?? 'ArrowLeftIcon'}
          />
          <ToolTip tip={tip ?? 'Voltar'} />
        </Button>
      )}
      {title && (
        <div className='flex items-center gap-8 md:gap-28'>
          {useMobileSidebar && <MobileSidebar />}
          <h2 className='text-xl font-bold' key={title}>
            {title}
          </h2>
          {isMobile && (
            <a
              href='https://play.google.com/store/apps/details?id=com.pinkecode.fofoca.ai'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/assets/google-play-selo.png'
                alt='Login Background'
                width={140}
                height={140}
              />
            </a>
          )}
        </div>
      )}
      {children}
    </header>
  );
}
