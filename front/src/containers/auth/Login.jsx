import "./auth.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../../components/header/Header";

export default function Login() {
  return (
    <div>
      <Header />
      <div className="auth_container">
        <form action="" id="auth">
          <h1>Authenticate</h1>
          <div>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="E-mail"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Password"
              variant="filled"
              name="password"
              type="password"
            />
          </div>
          <div>
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
