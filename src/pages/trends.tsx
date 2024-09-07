import { useRouter } from 'next/router';
import {
  TrendsLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { limit, orderBy, query } from 'firebase/firestore';
import { trendsCollection } from '@lib/firebase/collections';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';
import { useCollection } from '@lib/hooks/useCollection';
import type { ReactElement, ReactNode } from 'react';

export default function Bookmarks(): JSX.Element {
  const { back } = useRouter();
  const { data, loading } = useCollection(
    query(
      trendsCollection,
      orderBy('counter', 'desc'),
      ...([])
    ),
    { allowNull: true, includeUser: true }
  );

  return (
    <MainContainer>
      <SEO title='Tendências / Fofoca.me' />
      <MainHeader useActionButton title='Tendências' action={back}>
        <Button
          className='dark-bg-tab group relative ml-auto cursor-not-allowed p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
        >
          <HeroIcon className='h-5 w-5' iconName='Cog8ToothIcon' />
          <ToolTip tip='Settings' />
        </Button>
      </MainHeader>
      <div>
        {/* <AsideTrends inTrendsPage /> */}
      </div>
    </MainContainer>
  );
}

Bookmarks.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <TrendsLayout>{page}</TrendsLayout>
    </MainLayout>
  </ProtectedLayout>
);
