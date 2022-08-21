import { DefaultParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadLicenseSummaryResponse } from "types/api/license/readLicenseSummary";

export interface ReadLicenseSummaryParams extends DefaultParams {
  user_sub: string;
}

const readUserSummary = async () => {
  const url = `/user/summary/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadUserSummary = (
  params: ReadLicenseSummaryParams,
): QueryResult<ReadLicenseSummaryResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_uesr_summary", params],
    async () => validate(params.user_sub) && readUserSummary(),
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

export default useReadUserSummary;

const validate = (uesr_sub: string): boolean => {
  return uesr_sub !== undefined && uesr_sub !== "";
};
