import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface ConsoleInstanceParams extends DefaultParams {
  instance_pk: number;
  isCloudStack?: boolean;
}

const consoleInstance = async (params: ConsoleInstanceParams) => {
  let url;
  if (params.isCloudStack) {
    url = `/cloudstack/instance-console/`;
  } else {
    url = `/openstack/instance-console/`;
  }
  const { data } = await DefaultAxiosService.instance.post(url, {
    instance_pk: params.instance_pk,
  });
  return data;
};

const useConsoleInstance = () => {
  return useMutation(
    (params: ConsoleInstanceParams) => consoleInstance(params),
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
