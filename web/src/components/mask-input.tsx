/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactInputMask, { Props } from 'react-input-mask'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type MaskInputProps = {
  mask: string
} & Props

function MaskInputBase(
  { mask, className, ...props }: MaskInputProps,
  ref: any
) {
  return (
    <ReactInputMask
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      mask={mask}
      ref={ref}
      {...props}
    />
  )
}

export const MaskInput = forwardRef(MaskInputBase)
