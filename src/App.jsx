import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthScreen from "./screen/AuthScreen";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import useStore from "./store";

import AppLoader from "./components/layout/AppLoader";
import PublicOnlyRotue from "./components/utils/PublicOnlyRotue";
import PrivateRoute from "./components/utils/PrivateRoute";
import BoardsScreen from "./screen/BoardsScreen";
import SnackbarManager from "./components/layout/SnackbarManager";
import BoardScreen from "./screen/BoardScreen";

const App = () => {
  const { loader, setLoginStatus } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
      console.log(user);
    });

    return () => unsub();
  }, []);

  if (loader) return <AppLoader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarManager />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PublicOnlyRotue Component={AuthScreen} />}
          />
          <Route
            path="/boards"
            element={<PrivateRoute Component={BoardsScreen} />}
          />
          <Route
            path="/boards/:boardId"
            element={<PrivateRoute Component={BoardScreen} />}
          />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
