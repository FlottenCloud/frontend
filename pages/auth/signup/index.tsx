import Flex from "components/common/Flex";
import { useCallback, useState } from "react";
import _ from "lodash-es";
import CenteredLayout from "layout/CenteredLayout";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSignup from "hooks/api/auth/useSignup";

const Signup = () => {
  const signup = useSignup();
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSigninClick = useCallback(() => {
    router.push({ pathname: "/auth/signin" });
  }, [router]);

  const handleSignupClick = useCallback(() => {
    signup.mutate({
      id,
      email,
      password,
      successCallback: () => router.push("/auth/signin"),
    });
  }, [router, signup, id, email, password]);

  return (
    <CenteredLayout>
      <Flex style={{ marginBottom: "20px" }}>
        <Typography variant="h4">Team NOVA</Typography>
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
