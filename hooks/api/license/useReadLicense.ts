import { DefaultParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadLicenseResponse } from "types/api/license/readLicense";

export interface ReadLicenseParams extends DefaultParams {
  license_sub: string;
}

const readLicense = async (params: ReadLicenseParams) => {
  const url = `/license/${params.license_sub}`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadLicense = (params: ReadLicenseParams): QueryResult<ReadLicenseResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_license", params],
    async () => validate(params.license_sub) && readLicense(params),
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

export default useReadLicense;

const validate = (license_sub: string): boolean => {
  return license_sub !== undefined && license_sub !== "";
};
