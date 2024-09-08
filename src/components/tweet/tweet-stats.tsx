/* eslint-disable react-hooks/exhaustive-deps */

import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { ViewTweetStats } from '@components/view/view-tweet-stats';
import { useAuth } from '@lib/context/auth-context';
import { manageBookmark, manageLike, manageRetweet } from '@lib/firebase/utils';
import type { Tweet } from '@lib/types/tweet';
import { preventBubbling } from '@lib/utils';
import cn from 'clsx';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { TweetOption } from './tweet-option';
import { TweetShare } from './tweet-share';

type TweetStatsProps = Pick<
  Tweet,
  'userLikes' | 'userRetweets' | 'userReplies'
> & {
  reply?: boolean;
  userId: string;
  isOwner: boolean;
  tweetId: string;
  tweetCreatedBy: string;
  viewTweet?: boolean;
  openModal?: () => void;
};

export function TweetStats({
  reply,
  userId,
  isOwner,
  tweetId,
  tweetCreatedBy,
  userLikes,
  viewTweet,
  userRetweets,
  userReplies: totalReplies,
  openModal
}: TweetStatsProps): JSX.Element {
  const { userBookmarks } = useAuth();

  const totalLikes = userLikes.length;
  const totalTweets = userRetweets.length;

  const [{ currentReplies, currentTweets, currentLikes }, setCurrentStats] =
    useState({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });

  useEffect(() => {
    setCurrentStats({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTweets: totalTweets
    });
  }, [totalReplies, totalLikes, totalTweets]);

  const replyMove = useMemo(
    () => (totalReplies > currentReplies ? -25 : 25),
    [totalReplies]
  );

  const likeMove = useMemo(
    () => (totalLikes > currentLikes ? -25 : 25),
    [totalLikes]
  );

  const tweetMove = useMemo(
    () => (totalTweets > currentTweets ? -25 : 25),
    [totalTweets]
  );

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

  const tweetIsBookmarked = !!userBookmarks?.some(({ id }) => id === tweetId);

  const tweetIsLiked = userLikes.includes(userId);
  const tweetIsRetweeted = userRetweets.includes(userId);

  const isStatsVisible = !!(totalReplies || totalTweets || totalLikes);

  return (
    <>
      {viewTweet && (
        <ViewTweetStats
          likeMove={likeMove}
          userLikes={userLikes}
          tweetMove={tweetMove}
          replyMove={replyMove}
          userRetweets={userRetweets}
          currentLikes={currentLikes}
          currentTweets={currentTweets}
          currentReplies={currentReplies}
          isStatsVisible={isStatsVisible}
        />
      )}
      <div
        className={cn(
          'flex text-light-secondary inner:outline-none dark:text-dark-secondary',
          viewTweet ? 'justify-around py-2' : 'max-w-md justify-between'
        )}
      >
        <TweetOption
          className='hover:text-[#EF2182] focus-visible:text-[#EF2182]'
          iconClassName='group-hover:bg-[#EF2182]/10 group-active:bg-[#EF2182]/20 
                         group-focus-visible:bg-[#EF2182]/10 group-focus-visible:ring-[#EF2182]/80'
          tip='Responder'
          move={replyMove}
          stats={currentReplies}
          iconName='ChatBubbleOvalLeftIcon'
          viewTweet={viewTweet}
          onClick={openModal}
          disabled={reply}
        />
        <TweetOption
          className={cn(
            'hover:text-accent-green focus-visible:text-accent-green',
            tweetIsRetweeted && 'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20
                         group-focus-visible:bg-accent-green/10 group-focus-visible:ring-accent-green/80'
          tip={tweetIsRetweeted ? 'Desfazer refofoca' : 'Refofocar'}
          move={tweetMove}
          stats={currentTweets}
          iconName='ArrowPathRoundedSquareIcon'
          viewTweet={viewTweet}
          onClick={manageRetweet(
            tweetIsRetweeted ? 'unretweet' : 'retweet',
            userId,
            tweetId
          )}
        />
        <TweetOption
          className={cn(
            'hover:text-accent-pink focus-visible:text-accent-pink',
            tweetIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20
                         group-focus-visible:bg-accent-pink/10 group-focus-visible:ring-accent-pink/80'
          tip={tweetIsLiked ? 'Descurtir' : 'Curtir'}
          move={likeMove}
          stats={currentLikes}
          iconName='HeartIcon'
          viewTweet={viewTweet}
          onClick={manageLike(tweetIsLiked ? 'unlike' : 'like', userId, {
            id: tweetId,
            createdBy: tweetCreatedBy
          } as Tweet)}
        />
        <div className='z-[1] flex items-center justify-center gap-4'>
          <div className='relative'>
            <button
              className='group relative flex items-center gap-1 p-0 outline-none 
               transition-none hover:text-[#EF2182] focus-visible:text-[#EF2182]'
              onClick={preventBubbling(
                handleBookmark(
                  close,
                  !tweetIsBookmarked ? 'bookmark' : 'unbookmark',
                  userId,
                  tweetId
                )
              )}
            >
              <i className='relative rounded-full p-2 not-italic duration-200 group-hover:bg-[#EF2182]/10  group-focus-visible:bg-[#EF2182]/10 group-focus-visible:ring-2  group-focus-visible:ring-[#EF2182]/80 group-active:bg-[#EF2182]/20'>
                <HeroIcon
                  iconName={
                    !tweetIsBookmarked ? 'BookmarkIcon' : 'BookmarkSlashIcon'
                  }
                  className='h-5 w-auto'
                />
              </i>
              <ToolTip tip='Babadx' className='bottom-0' />
            </button>
          </div>
          <TweetShare userId={userId} tweetId={tweetId} viewTweet={viewTweet} />
        </div>
      </div>
    </>
  );
}
