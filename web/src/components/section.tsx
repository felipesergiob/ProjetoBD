import { ReactNode } from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

type SectionProps = {
  children: ReactNode
  title: string
  href?: string
}

export function Section({ children, title, href }: SectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">{title}</h2>

        {href && (
          <Button asChild>
            <Link to={href}>Ver mais</Link>
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
