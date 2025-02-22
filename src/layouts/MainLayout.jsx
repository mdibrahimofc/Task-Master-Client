import { Outlet } from 'react-router-dom'
import Footer from '../components/Shared/Footer/Footer'
import Header from '@/components/Header'
const MainLayout = () => {
  return (
    <div className='bg-white dark:bg-gray-900'>
      <Header/>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
