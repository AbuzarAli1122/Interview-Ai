import { useSelector } from "react-redux"
import Loading from "../../../pages/Loading"
import { Navigate } from "react-router";

const Protected = ({children}) => {
     const { isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  );

    if (!isInitialized) {
    return <Loading message="Checking Authentication..." />;
  }
     // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
 return <main>{children}</main>;
}

export default Protected
