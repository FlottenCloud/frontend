import { Typography } from "@mui/material";
import useReadProfile from "hooks/api/auth/useProfile";
import DefaultLayout from "layout/DefaultLayout";

const Profile = () => {
  const readProfile = useReadProfile({});

  return (
    <DefaultLayout>
      <Typography variant="h4">{readProfile?.data?.user_id}</Typography>
      <Typography>{readProfile?.data?.email}</Typography>
      <Typography>{`${readProfile?.data?.first_name} ${readProfile?.data?.last_name}`}</Typography>
    </DefaultLayout>
  );
};

export default Profile;
