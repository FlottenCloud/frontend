import { DefaultParams } from "types/api/common/params";
import { useMutation, useQueryClient } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface UpdateUserParams extends DefaultParams {
  company_name: string;
}

const updateUser = async (params: UpdateUserParams) => {
  const url = `/user/profile`;
  const { data } = await DefaultAxiosService.instance.put(url, {
    company_name: params.company_name,
  });
  return data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation((params: UpdateUserParams) => updateUser(params), {
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

export default useUpdateUser;
