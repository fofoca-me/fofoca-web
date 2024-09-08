import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import {
  addDoc,
  doc,
  getDoc,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import cn from 'clsx';
import { useEffect, useState, type ReactElement, type ReactNode } from 'react';
import {
  conversationsCollection,
  messagesCollection,
  usersCollection
} from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { useAuth } from '@lib/context/auth-context';
import { Message } from '@lib/types/message';
import {
  MessageLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayoutWithoutSidebar } from '@components/layout/main-layout-without-sidebar';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { Button } from '@components/ui/button';
import { motion } from 'framer-motion';
import type {
  Conversation,
  ConversationWithUser
} from '@lib/types/conversation';
import type { WithFieldValue } from 'firebase/firestore';
import { Loading } from '@components/ui/loading';
import type { MotionProps } from 'framer-motion';
import { BiNavigation } from 'react-icons/bi';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

export default function MessagePage(): JSX.Element {
  const [conversation, setConversation] = useState<ConversationWithUser>();
  const { user } = useAuth();
  const { back } = useRouter();
  const { conversation: conversationId } = useParams();

  const [inputValue, setInputValue] = useState('');

  const { data, loading } = useCollection(
    query(messagesCollection, where('conversationId', '==', conversationId))
  );

  useEffect(() => {
    void (async () => {
      const conversationData = (
        await getDoc(doc(conversationsCollection, conversationId as string))
      ).data();

      const userData = (
        await getDoc(
          doc(
            usersCollection,
            (conversationData?.targetUserId === user?.id
              ? conversationData?.userId
              : conversationData?.targetUserId) as string
          )
        )
      ).data();

      if (userData)
        setConversation({
          ...(conversationData as Conversation),
          user: userData
        });
    })();
  }, [data, conversationId, user]);

  const handleSendMessage = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    setInputValue('');

    await addDoc(messagesCollection, {
      conversationId: conversationId as string,
      text: inputValue,
      userId: user?.id,
      createdAt: serverTimestamp(),
      updatedAt: null
    } as WithFieldValue<Omit<Message, 'id'>>);
  };

  return (
    <main
      className={cn(
        'hover-animation flex min-h-[90vh] w-full max-w-xl flex-col xl:min-h-screen'
      )}
    >
      <SEO title='Mensagens / Fofoca.me' />
      <MainHeader
        useActionButton
        title={`Panelinha ${
          conversation?.user.name ? `com ${conversation.user.name}` : ''
        }`}
        action={back}
      >
      </MainHeader>

      {loading ? (
        <Loading />
      ) : (
        <div className='w-full h-[calc(100vh-52px)] '>
          <div className='
            items-center relative gap-0.5
            rounded-md bg-white dark:border-main-background
            dark:bg-zinc-900 flex h-full w-full flex-col justify-end'>
            <div className='h-full overflow-auto with-scroll flex flex-col-reverse'>
              <div className='mb-2 flex w-full flex-col justify-end gap-2 pb-2'>
                {data
                  ?.sort((a, b) => (a.createdAt as any) - (b.createdAt as any))
                  .map((message) => (
                    <motion.div
                      className={`flex w-full justify-start items-end relative ${
                        message.userId === user?.id
                          ? 'flex-row-reverse'
                          : ' flex-row'
                      }`}
                      key={message.id}
                      {...variants}
                    >
                      <div className={`border-4 border-t-transparent border-b-main-accent 
                          ${message.userId === user?.id
                            ? 'border-r-transparent border-l-main-accent rounded-r-lg'
                            : 'border-l-transparent border-r-main-accent rounded-l-lg'
                          }
                        `}>
                        {message.userId !== user?.id && (
                          <div className='border-4 border-t-transparent border-l-transparent border-r-white border-b-white dark:border-r-zinc-900 dark:border-b-zinc-900 absolute bottom-[2px] left-[5px]'></div>
                        )}
                      </div>
                      <div
                        className={`rounded-md max-w-[80%] px-2 py-1 border-2 border-main-accent ${
                          message.userId === user?.id
                            ? 'bg-main-accent text-white rounded-br-none '
                            : 'bg-main-secondary text-main-accent rounded-bl-none '
                        }
                      `}
                      >
                        <span>{message.text}</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>


            <form className='bg-red flex w-full gap-3' onSubmit={handleSendMessage}>
              <input
                className='
                  bg-transparent outline-none placeholder:text-light-secondary dark:placeholder:text-dark-secondary
                  rounded-md shadow-md bg-white px-4 py-3 transition focus-within:bg-main-background focus-within:ring-2
                  focus-within:ring-main-accent border border-gray-200 dark:bg-zinc-900 dark:border-main-background w-full
                '
                placeholder='Digite aqui sua fofoca'
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />

              <Button
                type='submit'
                className='bg-main-accent w-fit text-lg font-bold
                        text-white outline-none transition hover:brightness-90 active:brightness-75'
              >
                {/* <p className='block'>Enviar</p> */}
                <BiNavigation  size={24} className='text-white' />
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

MessagePage.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayoutWithoutSidebar>
      <MessageLayout>{page}</MessageLayout>
    </MainLayoutWithoutSidebar>
  </ProtectedLayout>
);
