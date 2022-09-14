import Flex from "components/common/Flex";
import { useCallback, useState } from "react";
import _ from "lodash-es";
import CenteredLayout from "layout/CenteredLayout";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSignup from "hooks/api/auth/useSignup";
import usePostModal from "hooks/common/usePostModal";

const Signup = () => {
  const signup = useSignup();
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSigninClick = useCallback(() => {
    router.push({ pathname: "/auth/signin" });
  }, [router]);

  const handleSignupClick = useCallback(() => {
    signup.mutate({
      user_id: id,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      successCallback: () => {
        router.push("/auth/signin");
      },
    });
  }, [router, firstName, lastName, signup, id, email, password]);

  usePostModal({ mutation: signup });

  return (
    <CenteredLayout>
      <Flex style={{ marginBottom: "20px" }}>
        <Typography variant="h4">뜬구름</Typography>
      </Flex>
      <form
        onSubmit={() => {}}
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          width: "300px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          size="small"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          size="small"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          size="small"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          size="small"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          size="small"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button variant="contained" onClick={handleSignupClick}>
          Sign up
        </Button>
        <Button variant="text" onClick={handleSigninClick}>
          Sign in
        </Button>
      </form>
    </CenteredLayout>
  );
};

export default Signup;
