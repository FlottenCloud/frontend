import { DefaultParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { useRouter } from "next/router";
import { ReadOneInstanceResponse } from "types/api/instance/readOneInstance";

export interface ReadDashParams extends DefaultParams {
  instance_pk: number;
}

const readOneCloudstack = async (params: ReadDashParams) => {
  const url = `/cloudstack/${params.instance_pk}/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadOneCloudstack = (
  params: ReadDashParams
): QueryResult<ReadOneInstanceResponse> => {
  const router = useRouter();
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_one_cloudstack", params],
    async () => validate(params.instance_pk) && readOneCloudstack(params),
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

export default useReadOneCloudstack;

const validate = (id: number) => {
  return id > 0;
};
