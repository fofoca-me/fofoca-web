import Link from 'next/link';
import { motion } from 'framer-motion';
import { query, updateDoc, where, doc, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { preventBubbling } from '@lib/utils';
import { notificationsCollection } from '@lib/firebase/collections';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { useAuth } from '@lib/context/auth-context';
import { Error } from '@components/ui/error';
import { Loading } from '@components/ui/loading';
import { NotificationTypes } from '@components/common/notifications';
import type { NotificationWithUser } from '@lib/types/notification';
import type { MotionProps } from 'framer-motion';
import { formatDate } from '@lib/date';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

export function NotificationCard(): JSX.Element {
  const { user } = useAuth();
  const navigator = useRouter();

  const { data, loading } = useInfiniteScroll(
    query(notificationsCollection),
    [where('targetUserId', '==', user?.id)],
    { includeUser: 'userId' }
  );

  return (
    <section>
      {loading ? (
        <Loading />
      ) : data ? (
        <motion.div className='space-y-2 py-4' {...variants}>
          {data.map((notification) => {
            const NotificationProps = NotificationTypes(
              notification as NotificationWithUser
            );

            return (
              <Link
                href={NotificationProps.url}
                key={notification.id}
                legacyBehavior
              >
                <a
                  className='hover-animation accent-tab relative flex flex-col gap-0.5 rounded-md border bg-white p-4 duration-200 hover:shadow-md dark:border-main-background dark:bg-zinc-900'
                  onClick={async (): Promise<void> => {
                    preventBubbling();
                    void navigator.push(NotificationProps.url);

                    const docRef = doc(
                      notificationsCollection,
                      notification.id
                    );

                    await updateDoc(docRef, {
                      isChecked: true
                    });
                  }}
                >
                  <div className='flex w-full items-center'>
                    <Image
                      src={NotificationProps.image_url}
                      className='mr-2  h-14 w-14 rounded-full object-cover'
                      width={56}
                      height={56}
                      objectFit='cover'
                      alt={`Imagem do usuário ${
                        (notification as NotificationWithUser).user.name
                      }`}
                    />
                    <div className='flex flex-col items-start'>
                      <p className='font-bold'>{NotificationProps.title}</p>
                      <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                        {NotificationProps.description}
                      </p>
                    </div>
                  </div>

                  {!notification.isChecked && (
                    <div className='absolute right-2 top-2 h-3 w-3 rounded-full bg-main-accent'></div>
                  )}
                </a>
              </Link>
            );
          })}
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
