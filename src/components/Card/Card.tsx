import classNames from 'classnames';

export interface CardProps extends React.ComponentPropsWithoutRef<'button'> {
  filled?: boolean;
}

function Card({ className, filled, ...rest }: CardProps) {
  return (
    <button
      type="button"
      className={classNames(
        className,
        'mx-4 w-44 h-64 flex flex-col items-center justify-center border-indigo-500 border-4 rounded-3xl text-10xl font-serif focus:outline-none',
        filled ? 'bg-indigo-500 text-white' : 'text-indigo-500 dark:bg-gray-900',
      )}
      {...rest}
    />
  );
}

export default Card;
