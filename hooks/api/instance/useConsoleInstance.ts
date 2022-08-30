import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface CreateInstanceParams extends DefaultParams {
  instance_id: string;
}

const consoleInstance = async (params: CreateInstanceParams) => {
  const url = `/openstack/instance-console/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    instance_id: params.instance_id,
  });
  return data;
};

const useConsoleInstance = () => {
  return useMutation(
    (params: CreateInstanceParams) => consoleInstance(params),
    {
      onMutate: (variables) => {},
      onSuccess: (res, variables, context) => {
        variables.successCallback && res && variables.successCallback(res);
      },
      onError: (err, variables, context) => {
        variables.errorCallback && err && variables.errorCallback(err);
      },
    }
  );
};

export default useConsoleInstance;
