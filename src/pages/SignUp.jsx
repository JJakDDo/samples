import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import EmailVerify from "../components/EmailVerify";

function SignUp() {
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  if (!showEmailVerify) {
    return (
      <SignUpForm
        setShowEmailVerify={setShowEmailVerify}
        setEmail={setEmail}
        setPw={setPw}
      />
    );
  } else {
    return (
      <EmailVerify
        setShowEmailVerify={setShowEmailVerify}
        email={email}
        pw={pw}
      />
    );
  }
}

export default SignUp;
