import { SEO } from '@components/common/seo';
import { UserCards } from '@components/user/user-cards';
import { useUser } from '@lib/context/user-context';
import { usersCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import type { User } from '@lib/types/user';
import { query, where } from 'firebase/firestore';

type UserFollowProps = {
  type: 'following' | 'followers';
};

export function UserFollow({ type }: UserFollowProps): JSX.Element {
  const { user } = useUser();
  const { name, username } = user as User;

  const { data, loading } = useCollection(
    query(
      usersCollection,
      where(
        type === 'following' ? 'followers' : 'following',
        'array-contains',
        user?.id
      )
    ),
    { allowNull: true }
  );

  return (
    <>
      <SEO
        title={`People ${
          type === 'following' ? 'seguido pela' : 'seguindo'
        } ${name} (@${username}) / Fofoca.me`}
      />
      <UserCards follow data={data} type={type} loading={loading} />
    </>
  );
}
