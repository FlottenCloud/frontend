import { Button, Typography } from "@mui/material";
import DisableBackground from "components/common/DisableBackground";
import Flex from "components/common/Flex";
import useReadProfile from "hooks/api/auth/useProfile";
import { useWithdrawOpen } from "hooks/api/auth/useWithdraw";

interface ProfileProps {
  close: () => void;
}

const Profile = (props: ProfileProps) => {
  const readProfile = useReadProfile({});

  const handleWithdrawOpen = useWithdrawOpen();

  return (
    <DisableBackground zIndex={999} onClick={props.close}>
      <Flex
        padding={[20, 20, 20, 20]}
        align="center"
        justify="center"
        style={{ backgroundColor: "white", borderRadius: "8px" }}
      >
        <Flex width={180}>
          <Typography variant="h5">{readProfile?.data?.user_id}</Typography>
          <Typography>{`user email : ${readProfile?.data?.email}`}</Typography>
          <Typography>{`user name : ${readProfile?.data?.first_name} ${readProfile?.data?.last_name}`}</Typography>
          <Flex style={{ paddingTop: "10px" }}>
            <Button variant="contained" onClick={handleWithdrawOpen}>
              회원탈퇴
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </DisableBackground>
  );
};

export default Profile;
