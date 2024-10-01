import * as React from 'react';

import { cn } from '@/lib/utils';

// todo: make this actually polymorphic
const Card = React.forwardRef<
  HTMLDivElement | HTMLFormElement,
  React.HTMLAttributes<HTMLDivElement | HTMLFormElement> & { as?: React.ElementType }
>(({ className, as, ...props }, ref) => {
  const Component = as || 'div';
  return (
    <Component
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
      onSubmit={props.onSubmit}
    />
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: Extract<React.ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
  }
>(({ className, as, ...props }, ref) => {
  const Component = as || 'h3';
  return (
    <Component
      ref={ref}
      className={cn('font-semibold text-2xl leading-none tracking-tight', className)}
      {...props}
    />
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-base text-muted-foreground sm:text-sm', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
