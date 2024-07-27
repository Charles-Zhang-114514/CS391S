import {useState} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: ${({theme}) => theme.backgroundColor};
    color: ${({theme}) => theme.textColor};
  }
  h1 {
    font-size: 2.55rem;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px 0;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
`;

const ChangeThemeButton = styled.button`
  padding: 10px;
  font-size: 16px;
  margin: 10px auto;
`;

// create two themes, define in each theme, which text and bg color will be used
const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
};

const darkTheme = {
  backgroundColor: '#1a2f51',
  textColor: '#ffffff',
};

export default function AntiBot({siteKey, veriKey}) {
  //Hook for user input
  const [input, setInput] = useState('');
  //Hook for storing RECP token
  const [captchaToken, setCaptchaToken] = useState('');
  //Hook for verifying user have already taken the RECP test
  const [isHuman, setIsHuman] = useState(false);
  //Hook for sharing text message of failed
  const [message, setMessage] = useState('');
  //Hook for switch light modes, and default is light theme
  const [theme, setTheme] = useState(lightTheme);

  const handleSubmit = (noFresh) => {
    // prevent normally performing the default action, which is sending the form data to the server and reloading the page
    noFresh.preventDefault();

    // If both RECP and my personal verification passed, return true, vise versa
    if (input === veriKey && captchaToken) {
      setIsHuman(true);
      setMessage('Success! You have passed the test');
    } else {
      setIsHuman(false);
      setMessage('Failed! Please try again');
    }
  };

  // This function is a callback for the reCAPTCHA component, it can receive token and store token for future use
  const onChange = (token) => {
    setCaptchaToken(token);
  };

  // Change theme by switching two themes
  const changeTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
      <>
        <GlobalStyle theme={theme}/>
        <AppWrapper>
          <h1>Anti-Bot Verification App</h1>
          <StyledForm onSubmit={handleSubmit}>
            <StyledInput
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Type your key to pass'/>

            <ReCAPTCHA
                sitekey={siteKey}
                onChange={onChange}/>

            <StyledButton type="submit">Submit</StyledButton>
          </StyledForm>
          {(
              <div><h3>{message}</h3></div>
          )}
          <ChangeThemeButton onClick={changeTheme}>
            Change Theme
          </ChangeThemeButton>
        </AppWrapper>
      </>
  );
}





