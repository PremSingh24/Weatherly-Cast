import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { loginUserService } from "../services/login.service";
import { useToastContext } from "../context/toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [visibility, setVisibility] = useState(false);

  const { setOpen, setSeverity, setMessage } = useToastContext();

  const EyeIcon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => {
            setVisibility(!visibility);
          }}
        >
          {visibility ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  const handleLogin = async () => {
    const response = await loginUserService({ username, password });
    if (response?.status) {
      setSeverity("error");
      const res = await response.json();
      setMessage(res.message);
    } else {
      setMessage(response.message);
      setSeverity("success");
    }

    setOpen(true);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "300px",
          zIndex: 18,
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: 3,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blue(8px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          ":hover": { boxShadow: 20 },
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          gap: 5,
          p: { xs: 3, md: 4 },
          mt: "3rem",
        }}
      >
        <Typography variant="h5" fontWeight={"bold"} color={"black"}>
          Login
        </Typography>
        <TextField
          fullWidth
          variant="standard"
          label="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          fullWidth
          variant="standard"
          label="Password"
          type={visibility ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          InputProps={{
            endAdornment: <EyeIcon />,
          }}
        />

        <Button
          variant="contained"
          sx={{ fontWeight: "bold" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography fontWeight={"bold"}>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </Typography>
      </Card>
    </div>
  );
};

export default LoginPage;
