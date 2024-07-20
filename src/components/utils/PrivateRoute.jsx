import { Navigate } from "react-router-dom";
import useStore from "../../store";

const PrivateRoute = ({ Component }) => {
  const { isLoggedIn } = useStore();
  return !isLoggedIn ? <Navigate to="/" repalce /> : <Component />;
};

export default PrivateRoute;
