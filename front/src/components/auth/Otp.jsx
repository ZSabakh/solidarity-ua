import { useRef } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function Otp({ digitCount, setOtp }) {
  let textInputs = useRef([]);

  const handleChange = (event) => {
    setOtp(
      textInputs.current
        .map((input) => input?.value)
        .join("")
        .slice(-4)
    );

    let index = parseInt(event.target.getAttribute("index"));

    event.target.style.border = "1px solid #FEFAF1";
    if (index < digitCount - 1) {
      if (event.target.value.length > 0) {
        textInputs.current[index + 1].value = "";
      }
      textInputs.current[index + 1].focus();
    }
  };
  return (
    <Grid container spacing={2}>
      {[...Array(digitCount)].map((e, i) => (
        <Grid key={i} item xs={12} sm={12 / digitCount}>
          <TextField margin="dense" required fullWidth inputRef={(input) => textInputs.current.push(input)} inputProps={{ index: i, maxLength: 1, style: { textAlign: "center" } }} onChange={handleChange} />
        </Grid>
      ))}
    </Grid>
  );
}
