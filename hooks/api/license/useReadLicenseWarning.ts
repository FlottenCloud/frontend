import { PageParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadLicenseWarningResponse } from "types/api/license/readLicenseWarning";

export interface ReadLicenseWarningParams extends PageParams {
  user_sub: string;
}

const readLicenseWarning = async (params: ReadLicenseWarningParams) => {
  const url = `/license/warning/${params.user_sub}`;
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

const useReadLicenseWarning = (
  params: ReadLicenseWarningParams,
): QueryResult<ReadLicenseWarningResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_license_warning", params],
    async () => validate(params) && readLicenseWarning(params),
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

export default useReadLicenseWarning;

const validate = (params: ReadLicenseWarningParams): boolean => {
  return (
    params.user_sub !== undefined && params.user_sub !== "" && params.page > 0 && params.size > 0
  );
};
