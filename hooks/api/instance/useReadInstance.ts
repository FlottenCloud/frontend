import { DefaultParams } from "../../../types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadInstanceResponse } from "types/api/instance/readInstance";

export interface ReadDashParams extends DefaultParams {}

const readInstance = async (params: ReadDashParams) => {
  const url = `/openstack/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadInstance = (
  params: ReadDashParams
): QueryResult<ReadInstanceResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_instance", params],
    async () => readInstance(params),
    {
      onSuccess: (res) => {
        successCallback && res && successCallback(res);
      },
      onError: (err) => {
        errorCallback && err && errorCallback(err);
      },
      enabled,
      staleTime: 0,
      cacheTime: 0,
    }
  );
  return response;
};

export default useReadInstance;
