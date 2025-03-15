import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import Switch from "react-switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const PasswordGenerator = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [password, setPassword] = useState("");

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let availableChars = "";

    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSpecialChars) availableChars += specialChars;

    if (availableChars.length === 0) {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      generatedPassword += availableChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: darkMode ? "grey.900" : "grey.100",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            Password Generator
          </Typography>
          <Switch
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode}
            offColor="#ccc"
            onColor="#333"
            checkedIcon={<span style={{ color: "white", paddingLeft: "5px" }}>🌙</span>}
            uncheckedIcon={<span style={{ color: "black", paddingLeft: "5px" }}>☀️</span>}
          />
        </Box>
        <Box mt={3}>
          <Typography gutterBottom>Password Length</Typography>
          <Slider
            value={length}
            min={1}
            max={50}
            step={1}
            onChange={(e, val) => setLength(val)}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box mt={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
            }
            label="Include Uppercase Letters"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
            }
            label="Include Lowercase Letters"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
            }
            label="Include Numbers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSpecialChars}
                onChange={(e) => setIncludeSpecialChars(e.target.checked)}
              />
            }
            label="Include Special Characters"
          />
        </Box>
        <Box mt={3} display="flex" flexDirection="column" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={generatePassword}
            sx={{ width: "100%", mb: 2 }}
          >
            Generate Password
          </Button>
          <TextField
            value={password}
            placeholder="Your password will appear here"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={copyToClipboard}
            sx={{ mt: 2 }}
            disabled={!password}
          >
            Copy to Clipboard
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PasswordGenerator;
