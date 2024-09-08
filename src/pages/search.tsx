import { query, orderBy, startAt, endAt } from 'firebase/firestore';
import { useState, type ReactElement, type ReactNode } from 'react';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { useDebounce } from '@lib/hooks/useDebounce';
import { MainContainer } from '@components/home/main-container';
import {
  ExploreLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { UserCard } from '@components/user/user-card';
import { UserSearchBar } from '@components/user/user-search';
import { MainHeader } from '@components/home/main-header';
import { UpdateUsername } from '@components/home/update-username';

export default function SearchPage(): JSX.Element {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);

  const { data, loading } = useCollection(
    query(
      usersCollection,
      orderBy('username'),
      startAt(debouncedInput),
      endAt(debouncedInput + '\uf8ff')
    ),
    { allowNull: true }
  );

  return (
    <MainContainer>
      <MainHeader
        useMobileSidebar
        title='Pesquisar'
        className='flex items-center justify-between'
      >
        <UpdateUsername />
      </MainHeader>

      <div className='container mx-auto p-4'>
        <UserSearchBar
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <section className='mt-6'>
          {loading ? (
            <p>Carregando usuários...</p>
          ) : data?.length === 0 ? (
            <p className='text-center'>Nenhum usuário encontrado</p>
          ) : (
            <div>
              {data?.map((user) => (
                <UserCard key={user?.id} {...user} />
              ))}
            </div>
          )}
        </section>
      </div>
    </MainContainer>
  );
}

SearchPage.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <ExploreLayout>{page}</ExploreLayout>
    </MainLayout>
  </ProtectedLayout>
);
