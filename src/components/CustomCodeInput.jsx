import { TextField } from "@mui/material";

function CustomCodeInput({ codeRefs, index, onChange }) {
  return (
    <TextField
      margin="normal"
      inputProps={{
        maxLength: "1",
        inputMode: "numeric",
        pattern: "[0-9]*",
        style: { textAlign: "center" },
      }}
      inputRef={(el) => (codeRefs.current[index] = el)}
      onChange={(e) => onChange(e, index)}
    />
  );
}
export default CustomCodeInput;
