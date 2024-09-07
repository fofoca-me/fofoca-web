import { AnimatePresence } from 'framer-motion';
import { where, orderBy, getDoc, doc } from 'firebase/firestore';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import { useWindow } from '@lib/context/window-context';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { tweetsCollection, usersCollection } from '@lib/firebase/collections';
import { useAuth } from '@lib/context/auth-context';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { UpdateUsername } from '@components/home/update-username';
import { MainHeader } from '@components/home/main-header';
import { Tweet } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';

export default function Home(): JSX.Element {
  const { isMobile } = useWindow();
  const { user } = useAuth();
  const [following, setFollowing] = useState<string[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);

  useEffect(() => {
    const fetchFollowing = async () => {
      if (user?.id) {
        const userDoc = await getDoc(doc(usersCollection, user.id));
        const userData = userDoc.data();
        if (userData?.following) setFollowing(userData.following);
      }
    };
    void fetchFollowing();
  }, [user?.id]);

  const { data, loading, LoadMore } = useInfiniteScroll(
    tweetsCollection,
    showAllUsers
      ? [orderBy('createdAt', 'desc')]
      : following.length > 0
      ? [where('createdBy', 'in', following), orderBy('createdAt', 'desc')]
      : [],
    { includeUser: true, allowNull: true, preserve: true }
  );

  return (
    <MainContainer>
      <SEO title='Home / Fofoca.me' />

      <MainHeader
        useMobileSidebar
        title='Só fuxico'
        className='flex items-center justify-between'
      >
        <UpdateUsername />
      </MainHeader>
      {!isMobile && <Input />}

      <section className='mt-7 flex justify-around'>
        <button
          onClick={() => setShowAllUsers(false)}
          className={`rounded-full px-4 py-2 ${
            !showAllUsers ? 'bg-pink-500 text-white' : 'bg-pink-300 text-white'
          }`}
        >
          Chegados
        </button>
        <button
          onClick={() => setShowAllUsers(true)}
          className={`rounded-full px-4 py-2 ${
            showAllUsers
              ? 'bg-pink-500 text-white'
              : 'bg-pink-300 text-white hover:bg-pink-400'
          }`}
        >
          Nunca nem vi
        </button>
      </section>
        
      <section className='mt-0.5 py-4 xs:mt-0'>
        {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Algo deu errado' />
        ) : (
          <>
            <AnimatePresence mode='popLayout'>
              {data.map((tweet) => (
                <Tweet {...tweet} key={tweet.id} />
              ))}
            </AnimatePresence>
            <LoadMore />
          </>
        )}
      </section>
    </MainContainer>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
