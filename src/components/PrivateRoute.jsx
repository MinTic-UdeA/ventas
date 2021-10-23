import React, {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fecthAuth0Token = async () => {
      const accessToken = await getAccessTokenSilently({
        audience:`api-auth-udea`
      })
      console.log(accessToken)
      localStorage.setItem('token', accessToken)
    }
    if(isAuthenticated){
      fecthAuth0Token()
    }
  }, [isAuthenticated, getAccessTokenSilently])

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
