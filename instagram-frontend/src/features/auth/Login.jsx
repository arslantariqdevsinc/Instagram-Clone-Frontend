import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const validationSchema = Yup.object({
    username: Yup.string("Enter your username").required(
      "Username is required"
    ),
    password: Yup.string("Enter your password")
      // .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      (async () => {
        try {
          const userData = await login(values).unwrap();
          dispatch(
            setCredentials({
              accessToken: userData.access_token,
              refreshToken: userData.refresh_token,
              user: userData.user.username,
            })
          );
          localStorage.setItem("user", userData.user.username);
          localStorage.setItem("accessToken", userData.access_token);
          localStorage.setItem("refreshToken", userData.refresh_token);
          navigate("/profile");
        } catch (err) {
          setErrMsg(err.data?.detail);
        }
      })();
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="text"
                name="username"
                margin="normal"
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
            <Typography className="text-center">{errMsg}</Typography>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/forgot"
                  style={{ textDecoration: "none" }}
                  variant="body1"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item sx={{ textAlign: "end" }}>
                <Typography>Don't have an account?</Typography>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                    padding: "10px",
                  }}
                >
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
