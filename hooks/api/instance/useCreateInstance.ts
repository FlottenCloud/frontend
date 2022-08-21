import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export interface CreateInstanceParams extends DefaultParams {
  token: string;
  name: string;
  imageRef: string;
  flavorRef: string;
  networks: [
    {
      uuid: string;
    }
  ];
}

const createInstance = async (params: CreateInstanceParams) => {
  const url = `/license/`;
  DefaultAxiosService.addHeaderToken(params.token);
  const { data } = await DefaultAxiosService.instance.post(url, {
    server: {
      name: params.name,
      imageRef: params.imageRef,
      flavorRef: params.flavorRef,
      networks: params.networks,
    },
  });
  return data;
};

const useCreateInstance = () => {
  const queryClient = useQueryClient();
  return useMutation((params: CreateInstanceParams) => createInstance(params), {
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

export default useCreateInstance;
