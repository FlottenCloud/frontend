import { DefaultParams } from "./../../../types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadDashResponse } from "types/api/openstack/readDash";
import { useRouter } from "next/router";

export interface ReadDashParams extends DefaultParams {}

const readDash = async (params: ReadDashParams) => {
  const url = `/openstack/dashboard/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadDash = (params: ReadDashParams): QueryResult<ReadDashResponse> => {
  const router = useRouter();
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_dash", params],
    async () => readDash(params),
    {
      onSuccess: (res) => {
        successCallback && res && successCallback(res);
      },
      onError: (err) => {
        errorCallback && err && errorCallback(err);
        router.push({ pathname: "/clouddash" });
      },
      enabled,
      staleTime: 0,
      cacheTime: 0,
    }
  );
  return response;
};

export default useReadDash;
