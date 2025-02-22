import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />

  if(user){
    return children
  }


  return <Navigate to='/login' state={{ from: "/" }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute
