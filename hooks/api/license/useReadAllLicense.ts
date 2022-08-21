import { PageParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadAllLicenseResponse } from "types/api/license/readAllLicense";

export interface ReadAllLicenseParams extends PageParams {
  user_sub: string;
}

const readAllLicense = async (params: ReadAllLicenseParams) => {
  const url = `/license/all/${params.user_sub}`;
  const { data } = await DefaultAxiosService.instance.get(url, {
    params: {
      page: params.page,
      size: params.size,
      name: params.search,
      ascending: params.ascending,
      sort_field: params.sort_field,
    },
  });
  return data;
};

const useReadAllLicense = (params: ReadAllLicenseParams): QueryResult<ReadAllLicenseResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_all_license", params],
    async () => validate(params) && readAllLicense(params),
    {
      onSuccess: (res) => {
        successCallback && res && successCallback(res);
      },
      onError: (err) => {
        errorCallback && err && errorCallback(err);
      },
      enabled,
    },
  );
  return response;
};

export default useReadAllLicense;

const validate = (params: ReadAllLicenseParams): boolean => {
  return (
    params.user_sub !== undefined && params.user_sub !== "" && params.page > 0 && params.size > 0
  );
};
