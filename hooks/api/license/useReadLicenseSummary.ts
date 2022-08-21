import { DefaultParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadLicenseSummaryResponse } from "types/api/license/readLicenseSummary";

export interface ReadLicenseSummaryParams extends DefaultParams {
  user_sub: string;
  include_descendents?: boolean;
}

const readLicenseSummary = async (params: ReadLicenseSummaryParams) => {
  const url = `/license/summary/${params.user_sub}`;
  const { data } = await DefaultAxiosService.instance.get(url, {
    params: {
      include_descendents: params.include_descendents ?? false,
    },
  });
  return data;
};

const useReadLicenseSummary = (
  params: ReadLicenseSummaryParams,
): QueryResult<ReadLicenseSummaryResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_license_summary", params],
    async () => validate(params.user_sub) && readLicenseSummary(params),
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

export default useReadLicenseSummary;

const validate = (user_sub: string): boolean => {
  return user_sub !== undefined && user_sub !== "";
};
