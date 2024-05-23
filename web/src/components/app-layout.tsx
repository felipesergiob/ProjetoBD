import { Outlet } from 'react-router-dom'
import { Header } from './header'

export function AppLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}
