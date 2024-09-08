import Link from 'next/link';
import {
  CiHome,
  CiHashtag,
  CiMail,
  CiBellOn,
  CiBookmark,
  CiUser,
  CiSearch
} from 'react-icons/ci';
import { useState, useEffect } from 'react';
import LogoCat from '@components/common/logo-cat';
import { query, where } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useWindow } from '@lib/context/window-context';
import { useModal } from '@lib/hooks/useModal';
import { useCollection } from '@lib/hooks/useCollection';
import { notificationsCollection, conversationsCollection } from '@lib/firebase/collections';
import { Modal } from '@components/modal/modal';
import { Input } from '@components/input/input';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import { SidebarLink } from './sidebar-link';
import { MoreSettings } from './more-settings';
import { SidebarProfile } from './sidebar-profile';
import type { ReactNode } from 'react';

import type * as SolidIcons from '@heroicons/react/24/solid';
import type * as OutlineIcons from '@heroicons/react/24/outline';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

export type NavLink = {
  href: string;
  linkName: string;
  isNotification?: boolean;
  disabled?: boolean;
  canBeHidden?: boolean;
  icon?: ReactNode;
  iconName: IconName;
  count?: number;
};

export type NewNavLinks = Omit<NavLink, 'iconName'>;

export function Sidebar(): JSX.Element {
  const { user } = useAuth();
  const { isMobile } = useWindow();

  const { open, openModal, closeModal } = useModal();

  const username = user?.username as string;

  const [navLinksWithCount, setNavLinksWithCount] = useState<NewNavLinks[]>([
    {
      href: '/home',
      linkName: 'Home',
      count: 0,
      icon: <CiHome size={34} />
    },
    {
      href: '/trends',
      linkName: 'Tendências',
      disabled: false,
      canBeHidden: false,
      count: 0,
      icon: <CiHashtag size={34} />
    },
    {
      href: '/notifications',
      linkName: 'Notificações',
      disabled: false,
      isNotification: true,
      count: 0,
      icon: <CiBellOn size={34} />
    },
    {
      href: '/messages',
      linkName: 'Mensagens',
      count: 0,
      icon: <CiMail size={34} />
    },
    {
      href: '/bookmarks',
      linkName: 'Babados',
      canBeHidden: true,
      count: 0,
      icon: <CiBookmark size={34} />
    },
    {
      href: '/search',
      linkName: 'Pesquisar',
      disabled: false,
      canBeHidden: true,
      icon: <CiSearch size={34} />
    }
  ]);

  const { data: notifications } = useCollection(
    query(
      notificationsCollection,
      where('targetUserId', '==', user?.id),
      where('isChecked', '==', false)
    )
  );

  const { data: conversations } = useCollection(
    query(
      conversationsCollection,
      where('targetUserId', '==', user?.id)
    )
  );

  useEffect(() => {
    if (notifications) {
      setNavLinksWithCount((prevItems) =>
        prevItems.map((link: NewNavLinks) =>
          link.linkName === 'Notificações'
            ? { ...link, count: notifications.length }
            : link
        )
      );
    }
  }, [notifications]);

  useEffect(() => {
    if (conversations) {

      setNavLinksWithCount((prevItems) =>
        prevItems.map((link: NewNavLinks) =>
          link.linkName === 'Mensagens'
            ? { ...link, count: conversations.length }
            : link
        )
      );
    }
  }, [conversations]);

  return (
    <header
      id='sidebar'
      className='flex w-0 shrink-0 transition-opacity duration-200 xs:w-20 md:w-24
                 lg:max-w-none xl:-mr-4 xl:w-full xl:max-w-xs xl:justify-end'
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <Input modal closeModal={closeModal} />
      </Modal>
      <div
        className='fixed bottom-0 z-10 flex w-full flex-col justify-between border-t border-light-border 
                   bg-main-background py-0 dark:border-dark-border xs:top-0 xs:h-full xs:w-auto xs:border-0 
                   xs:bg-transparent xs:px-2 xs:py-3 xs:pt-2 md:px-4 xl:w-72'
      >
        <section className='flex flex-col justify-center gap-2 xs:items-center xl:items-stretch'>
          <h1 className='hidden xs:flex'>
            <Link href='/home'>
              <span
                className='custom-button main-tab text-accent-blue transition 
                           focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80
                           '
              >
                <LogoCat width={64} height={64} />
              </span>
            </Link>
          </h1>
          <nav className='flex items-center justify-around xs:flex-col xs:justify-center xl:block'>
            {navLinksWithCount.map(({ ...linkData }) => (
              <SidebarLink {...linkData} key={linkData.href} />
            ))}
            <SidebarLink
              href={`/user/${username}`}
              username={username}
              linkName='Perfil'
              icon={<CiUser size={34} />}
            />
            {!isMobile && <MoreSettings />}
          </nav>
          <Button
            className='accent-tab absolute right-4 -translate-y-[72px] bg-main-accent text-lg font-bold text-white
                      outline-none transition hover:brightness-90 active:brightness-75 xs:static xs:translate-y-0
                      xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 xl:w-11/12'
            onClick={openModal}
          >
            <CustomIcon
              className='block h-6 w-6 xl:hidden'
              iconName='FeatherIcon'
            />
            <p className='hidden xl:block'>Fofocar</p>
          </Button>
        </section>
        {!isMobile && <SidebarProfile />}
      </div>
    </header>
  );
}
