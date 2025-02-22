import TaskBoard from '@/components/Home/TaskBoard'
import WelcomeSection from '@/components/Home/WelcomeSection'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <div className='dark:bg-gray-900'>
      <div className='w-11/12 mx-auto'>
      <Helmet>
        <title> TaskMaster</title>
      </Helmet>
      <WelcomeSection/>
      <TaskBoard/>
    </div>
    </div>
  )
}

export default Home
