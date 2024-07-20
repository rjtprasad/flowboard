import useStore from "../../store";
import { Navigate } from "react-router-dom";

const PublicOnlyRotue = ({ Component }) => {
  const { isLoggedIn } = useStore();

  return isLoggedIn ? <Navigate to="/boards" replace /> : <Component />;
};

export default PublicOnlyRotue;
