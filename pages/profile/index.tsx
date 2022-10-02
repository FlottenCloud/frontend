import { Button, Typography } from "@mui/material";
import Flex from "components/common/Flex";
import useReadProfile from "hooks/api/auth/useProfile";
import { useWithdrawOpen } from "hooks/api/auth/useWithdraw";
import DefaultLayout from "layout/DefaultLayout";

const Profile = () => {
  const readProfile = useReadProfile({});

  const handleWithdrawOpen = useWithdrawOpen();

  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};

export default Profile;
