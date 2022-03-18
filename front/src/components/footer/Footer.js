import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and {""}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        <IconButton color="info" sx={{ paddingY: 0 }} onClick={() => window.open("https://fb.me/UAunity.2022", "_blank")}>
          <FacebookIcon />
        </IconButton>
      </div>
    </footer>
  );
}
