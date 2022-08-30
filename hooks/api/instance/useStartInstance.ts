import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface CreateInstanceParams extends DefaultParams {
  instance_id: string;
}

const startInstance = async (params: CreateInstanceParams) => {
  const url = `/openstack/instance-start/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    instance_id: params.instance_id,
  });
  return data;
};

const useStartInstance = () => {
  const queryClient = useQueryClient();
  return useMutation((params: CreateInstanceParams) => startInstance(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_instance");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useStartInstance;
