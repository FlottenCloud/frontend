import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface ErrorParams extends DefaultParams {
  instance_pk: number;
}

const error = async (params: ErrorParams) => {
  const url = `/openstack/error-page/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    instance_pk: params.instance_pk,
  });
  return data;
};

const useError = () => {
  const queryClient = useQueryClient();
  return useMutation((params: ErrorParams) => error(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      //   queryClient.invalidateQueries("read_instance");
      //   queryClient.invalidateQueries("read_all_license");
      //   queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useError;
