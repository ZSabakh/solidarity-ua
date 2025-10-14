import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy" target="_blank">
          Privacy Policy
        </a>
        <span> and </span>
        <a href="https://policies.google.com/terms" target="_blank">
          Terms of Service
        </a>
        <span> apply. </span>
        <IconButton
          color="info"
          sx={{ paddingY: 0 }}
          onClick={() => window.open("https://fb.me/UAunity.2022", "_blank")}
        >
          <FacebookIcon />
        </IconButton>
      </div>
    </footer>
  );
}
