import { useState, useEffect, createContext } from 'react'
import EndpointCore from '../pages/Global'
import CustomImageLoader from '../components/CustomLoader/CustomImageLoader';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(EndpointCore.profile, config);

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();

        // The profile endpoint wraps the user in { data, user, success }
        // (or just returns the user directly, depending on backend) --
        // PrivateRoute and every consumer of useAuth() read auth.id /
        // auth.user_name directly, so store the flat user object here
        // rather than the wrapper.
        setAuth(data.user || data.data || data);
      } catch (error) {
        console.error('Authentication error:', error);
        setAuth({});
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  const logoutAuth = () => {
    setAuth({});
  };

  if (loading) {
    return <CustomImageLoader/>;
  }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                logoutAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export { 
    AuthProvider
}

export default AuthContext;