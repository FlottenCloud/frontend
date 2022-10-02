import { DefaultParams } from "../../../types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadLogsResponse } from "types/api/common/readLogs";

export interface ReadDashParams extends DefaultParams {
  id: string;
}

const readLogs = async (params: ReadDashParams) => {
  const url = `/account/${params.id}/logs/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadLogs = (params: ReadDashParams): QueryResult<ReadLogsResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_logs", params],
    async () => validate(params.id) && readLogs(params),
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

export default useReadLogs;

const validate = (id: string) => {
  return id !== "";
};
