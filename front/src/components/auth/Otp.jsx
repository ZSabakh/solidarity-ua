import { useRef } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

export default function Otp({ digitCount, setOtp }) {
  const classes = useStyles();

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
    <div className={classes.otpWrapper}>
      {[...Array(digitCount)].map((_, index) => (
        <div key={index}>
          <TextField
            margin="dense"
            required
            inputRef={(input) => textInputs.current.push(input)}
            inputProps={{
              inputMode: "numeric",
              index: index,
              maxLength: 1,
              style: { textAlign: "center" },
            }}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}

const useStyles = makeStyles({
  otpWrapper: {
    display: "grid",
    gridGap: "10px",
    gridAutoFlow: "column",
    "& div": {
      width: "100%",
    },
  },
});
