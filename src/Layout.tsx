import { Outlet } from 'react-router'
import './Layout.css'
import TopBar from './components/TopBar/TopBar'

function Layout() {


  return (
    <>
      <div className='layout'>
        <TopBar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
