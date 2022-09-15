import { DefaultParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { useRouter } from "next/router";
import { ReadOneInstanceResponse } from "types/api/instance/readOneInstance";

export interface ReadDashParams extends DefaultParams {
  instance_pk: number;
}

const readOneInstance = async (params: ReadDashParams) => {
  const url = `/openstack/${params.instance_pk}/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadOneInstance = (
  params: ReadDashParams
): QueryResult<ReadOneInstanceResponse> => {
  const router = useRouter();
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_one_instance", params],
    async () => readOneInstance(params),
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

export default useReadOneInstance;
