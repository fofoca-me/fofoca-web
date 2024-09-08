import Link from 'next/link';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { limit, orderBy, query } from 'firebase/firestore';
import { formatNumber } from '@lib/date';
import { preventBubbling } from '@lib/utils';
import { trendsCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { Error } from '@components/ui/error';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { Loading } from '@components/ui/loading';
import type { MotionProps } from 'framer-motion';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

export function AsideTrends(): JSX.Element {
  const { data, loading } = useCollection(
    query(trendsCollection, orderBy('counter', 'desc'), ...[limit(3)]),
    { allowNull: true, includeUser: true }
  );

  return (
    <section className='rounded-md border border-gray-200  bg-white shadow-md dark:border-main-background dark:bg-zinc-900'>
      {loading ? (
        <Loading />
      ) : data ? (
        <motion.div className={cn('inner inner:px-4')} {...variants}>
          <div className='py-3'>
            <h2 className='text-xl font-extrabold'>Na boca do povo</h2>
            <p className='text-sm font-normal text-light-secondary dark:text-dark-secondary'>
              Tendências
            </p>
          </div>
          {data.map(({ text, counter, user: { name } }) => (
            <Link
              href={''}
              key={text}
              className='hover-animation accent-tab hover-card relative block px-4 py-3'
            >
              <span
                className='flex  flex-col gap-0.5'
                onClick={preventBubbling()}
              >
                <div className='absolute right-2 top-2 hidden'>
                  <Button
                    className='hover-animation group relative  p-2
                               hover:bg-accent-blue/10 focus-visible:bg-accent-blue/20 
                               focus-visible:!ring-accent-blue/80'
                    onClick={preventBubbling()}
                  >
                    <HeroIcon
                      className='h-5 w-5 text-light-secondary group-hover:text-accent-blue 
                                 group-focus-visible:text-accent-blue dark:text-dark-secondary'
                      iconName='EllipsisHorizontalIcon'
                    />
                    <ToolTip tip='More' />
                  </Button>
                </div>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  Tendências
                </p>
                <p className='font-bold'>{text}</p>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  Criada por {name}
                </p>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  {formatNumber(counter + 1)} fofocas
                </p>
              </span>
            </Link>
          ))}
          <Link
            href='/trends'
            className='custom-button accent-tab hover-card block w-full rounded-2xl rounded-t-none
          py-4 text-center text-main-accent'
          >
            Mostrar mais
          </Link>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
