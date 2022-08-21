import { DefaultParams } from "types/api/common/params";
import { useMutation, useQueryClient } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface CreateUserParams extends DefaultParams {
  email: string;
  is_reseller: boolean;
}

const createUser = async (params: CreateUserParams) => {
  const url = `/user/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    email: params.email,
    is_reseller: params.is_reseller,
  });
  return data;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation((params: CreateUserParams) => createUser(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_user");
      queryClient.invalidateQueries("read_all_user");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useCreateUser;
