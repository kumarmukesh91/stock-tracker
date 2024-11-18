import {PropsWithChildren} from 'react'
import './typography.scss'

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'

type Status = 'default' | 'error' | 'success'

interface TypographyProps extends PropsWithChildren {
  variant?: Variant
  component?: keyof JSX.IntrinsicElements
  className?: string
  status?: Status
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  component = 'p',
  className = '',
  status = 'default',
  children,
  ...props
}) => {
  const Component = component

  return (
    <Component className={`typography ${variant} ${status} ${className}`} {...props}>
      {children}
    </Component>
  )
}
