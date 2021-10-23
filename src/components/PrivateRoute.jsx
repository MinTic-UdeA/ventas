import React, {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    console.log(user, isAuthenticated, isLoading);
  }, [user, isAuthenticated, isLoading])
  
  if (isLoading) return <div>Loading...</div>

  return isAuthenticated ? (<> {children} </>
    ) : (
    <div flex h-full items-center justify-center >
      <div> 
        NO AUTORIZADO
      </div>
    </div>)
}

export default PrivateRoute
