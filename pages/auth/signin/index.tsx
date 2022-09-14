import Flex from "components/common/Flex";
import { useCallback, useState } from "react";
import _ from "lodash-es";
import CenteredLayout from "layout/CenteredLayout";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSignin from "hooks/api/auth/useSignin";
import usePostModal from "hooks/common/usePostModal";

const Signin = () => {
  const signin = useSignin();
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignupClick = useCallback(() => {
    router.push({ pathname: "/auth/signup" });
  }, [router]);

  const handleSigninClick = useCallback(() => {
    signin.mutate({
      id,
      password,
      successCallback: (res) => {
        router.push("/");
        localStorage.setItem("token", res.openstack_user_token);
        localStorage.setItem("apiKey", res.apiKey);
        localStorage.setItem("secretKey", res.secretKey);
        localStorage.setItem("userId", id);
      },
    });
  }, [router, signin, id, password]);

  usePostModal({ mutation: signin });

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
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button variant="contained" onClick={handleSigninClick}>
          Sign in
        </Button>
        <Button variant="text" onClick={handleSignupClick}>
          Sign up
        </Button>
      </form>
    </CenteredLayout>
  );
};

export default Signin;
