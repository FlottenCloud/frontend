import { LicenseType } from "types/common/licenseType";
import { DefaultParams } from "types/api/common/params";
import { useMutation, useQueryClient } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ActivatedType } from "types/common/activatedType";

export interface CreateLicenseParams extends DefaultParams {
  user_sub: string;
  license_type: string;
  sensors: Array<any>;
  allow_features: Array<any>;
  lidar_count: number;
  gpu_algo_node_count: number;
  algo_node_count: number;
  max_argos_session_count: number;
}

const putGrant = async (params: CreateLicenseParams) => {
  const url = `/user/grant/${params.license_type}/${params.user_sub}`;
  const { data } = await DefaultAxiosService.instance.put(url, {
    sensors: params.sensors,
    allow_features: params.allow_features,
    lidar_count: params.lidar_count,
    gpu_algo_node_count: params.gpu_algo_node_count,
    algo_node_count: params.algo_node_count,
    max_argos_session_count: params.max_argos_session_count,
  });
  return data;
};

const usePutGrant = () => {
  const queryClient = useQueryClient();
  return useMutation((params: CreateLicenseParams) => putGrant(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_license");
      queryClient.invalidateQueries("read_all_license");
      queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default usePutGrant;
