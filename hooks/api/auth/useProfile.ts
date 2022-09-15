import { DefaultParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadProfileResponse } from "types/api/auth/readProfile";

export interface ReadProfileParams extends DefaultParams {}

const readProfile = async (params: ReadProfileParams) => {
  const url = `/account/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadProfile = (
  params: ReadProfileParams
): QueryResult<ReadProfileResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_profile", params],
    async () => readProfile(params),
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

export default useReadProfile;
