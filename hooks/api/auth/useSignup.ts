import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface SignupParams extends DefaultParams {
  id: string;
  email: string;
  password: string;
}

const signup = async (params: SignupParams) => {
  const url = `/account/register/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    user_id: params.id,
    email: params.email,
    password: params.password,
  });
  return data;
};

const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation((params: SignupParams) => signup(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      //   queryClient.invalidateQueries("read_license");
      //   queryClient.invalidateQueries("read_all_license");
      //   queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useSignup;