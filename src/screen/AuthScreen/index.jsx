import { useState } from "react";
import { Container, Stack, TextField, Button, Typography } from "@mui/material";
import ImageEl from "../../components/utils/ImageEl";
import LogoImg from "../../assets/logo.svg";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import useStore from "../../store";

const initForm = {
  email: "",
  password: "",
};

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initForm);
  const { setToastr } = useStore();
  const authText = isLogin
    ? "Do not have an account?"
    : "Already have an account?";

  const handleChange = (e) =>
    setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));

  const handleAuth = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (error) {
      const msg = error.code.split("auth/")[1].split("-").join(" ");
      setToastr(msg);
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <ImageEl src={LogoImg} alt="FlowBoard Logo" />
        <Typography color="rgba(255, 255, 255, 0.6)">
          Visualize Your Workflow for Increased Productivity.
          <br />
          Access Your Tasks Anytime, Anywhere.
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          onChange={handleChange}
          value={form.email}
          name="email"
          label="Email"
        />
        <TextField
          onChange={handleChange}
          value={form.password}
          name="password"
          label="Password"
          type="password"
        />
        <Button
          disabled={loading || !form.email.trim() || !form.password.trim()}
          onClick={handleAuth}
          size="large"
          variant="contained"
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </Stack>
      <Typography
        onClick={() => setIsLogin((prev) => !prev)}
        sx={{ cursor: "pointer" }}
        textAlign="center"
        mt={3}
      >
        {authText}
      </Typography>
    </Container>
  );
};

export default AuthScreen;
