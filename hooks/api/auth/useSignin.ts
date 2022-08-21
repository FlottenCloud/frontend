import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface SigninParams extends DefaultParams {
  id: string;
  password: string;
}

const signin = async (params: SigninParams) => {
  const url = `/account/login/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    user_id: params.id,
    password: params.password,
  });
  return data;
};

const useSignin = () => {
  const queryClient = useQueryClient();
  return useMutation((params: SigninParams) => signin(params), {
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

export default useSignin;
