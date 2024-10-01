import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { Popover } from '@headlessui/react';
import { useAuth } from '@lib/context/auth-context';
import { siteURL } from '@lib/env';
import { manageBookmark } from '@lib/firebase/utils';
import { preventBubbling } from '@lib/utils';
import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { variants } from './tweet-actions';

type TweetShareProps = {
  userId: string;
  tweetId: string;
  viewTweet?: boolean;
};

export function TweetShare({
  userId,
  tweetId,
  viewTweet
}: TweetShareProps): JSX.Element {
  const { userBookmarks } = useAuth();

  const handleBookmark =
    (closeMenu: () => void, ...args: Parameters<typeof manageBookmark>) =>
    async (): Promise<void> => {
      const [type] = args;

      closeMenu();
      await manageBookmark(...args);

      toast.success(
        type === 'bookmark'
          ? (): JSX.Element => (
              <span className='flex gap-2'>
                Fofoca adicionada aos seus babados
                <Link href='/bookmarks'>
                  <span className='custom-underline font-bold'>Visualizar</span>
                </Link>
              </span>
            )
          : 'Tweet removido dos seus favoritos'
      );
    };

  const handleCopy = (closeMenu: () => void) => async (): Promise<void> => {
    closeMenu();
    await navigator.clipboard.writeText(`${siteURL}/fofoca/${tweetId}`);
    toast.success('Copiado para a área de transferência');
  };

  const tweetIsBookmarked = !!userBookmarks?.some(({ id }) => id === tweetId);

  return (
    <Popover className='relative'>
      {({ open, close }): JSX.Element => (
        <>
          <Popover.Button
            className={cn(
              `group relative flex items-center gap-1 p-0 outline-none 
               transition-none hover:text-[#EF2182] focus-visible:text-[#EF2182]`,
              open && 'text-[#EF2182] inner:bg-[#EF2182]/10'
            )}
          >
            <i
              className='relative rounded-full p-2 not-italic duration-200 group-hover:bg-[#EF2182]/10 
                         group-focus-visible:bg-[#EF2182]/10 group-focus-visible:ring-2 
                         group-focus-visible:ring-[#EF2182]/80 group-active:bg-[#EF2182]/20'
            >
              <HeroIcon
                className={viewTweet ? 'h-6 w-6' : 'h-5 w-5'}
                iconName='ArrowUpTrayIcon'
              />
              {!open && <ToolTip tip='Compartilhar' />}
            </i>
          </Popover.Button>
          <AnimatePresence>
            {open && (
              <Popover.Panel
                className='menu-container group absolute right-0 top-11 whitespace-nowrap text-light-primary dark:text-dark-primary'
                as={motion.div}
                {...variants}
                static
              >
                <Popover.Button
                  className='accent-tab flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-main-sidebar-background'
                  as={Button}
                  onClick={preventBubbling(handleCopy(close))}
                >
                  <HeroIcon iconName='LinkIcon' />
                  Copiar link da Fofoca
                </Popover.Button>

                {/* {!tweetIsBookmarked ? (
                  <Popover.Button
                    className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                    as={Button}
                    onClick={preventBubbling(
                      handleBookmark(close, 'bookmark', userId, tweetId)
                    )}
                  >
                    <HeroIcon iconName='BookmarkIcon' />
                    Marcador
                  </Popover.Button>
                ) : (
                  <Popover.Button
                    className='accent-tab flex w-full gap-3 rounded-md rounded-t-none p-4 hover:bg-main-sidebar-background'
                    as={Button}
                    onClick={preventBubbling(
                      handleBookmark(close, 'unbookmark', userId, tweetId)
                    )}
                  >
                    <HeroIcon iconName='BookmarkSlashIcon' />
                    Remover Tweet dos Favoritos
                  </Popover.Button>
                )} */}
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
