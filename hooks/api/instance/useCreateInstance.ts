import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface CreateInstanceParams extends DefaultParams {
  system_num: number;
}

const createInstance = async (params: CreateInstanceParams) => {
  const url = `/openstack/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    system_num: params.system_num,
  });
  return data;
};

const useCreateInstance = () => {
  const queryClient = useQueryClient();
  return useMutation((params: CreateInstanceParams) => createInstance(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_instance");
      //   queryClient.invalidateQueries("read_all_license");
      //   queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useCreateInstance;
