import { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  title: string
}

export function Section({ children, title }: SectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-3xl">{title}</h2>
      {children}
    </div>
  )
}
