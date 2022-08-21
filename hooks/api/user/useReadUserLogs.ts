import { PageParams } from "types/api/common/params";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadUserLogsResponse } from "types/api/user/readUserLogs";

export interface ReadUserLogsParams extends PageParams {
  user_sub: string;
}

const readUserLogs = async (pageParam, params: ReadUserLogsParams) => {
  const url = `/user/logs/${params.user_sub}`;
  const { data } = await DefaultAxiosService.instance.get(url, {
    params: {
      page: pageParam + 1,
      size: 50,
    },
  });
  return {
    result: data,
    nextPage: pageParam + 1,
    isLast: pageParam === data.total - 1,
  };
};

const useReadUserLogs = (
  params: ReadUserLogsParams,
): UseInfiniteQueryResult<{ result: ReadUserLogsResponse; nextPage: number; isLast: boolean }> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useInfiniteQuery(
    ["read_user_logs", params],
    async ({ pageParam = 0 }) => validate(params) && readUserLogs(pageParam, params),
    {
      getNextPageParam: (lastPage, page) => (!lastPage.isLast ? lastPage.nextPage : undefined),
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

export default useReadUserLogs;

const validate = (params: ReadUserLogsParams): boolean => {
  return (
    params.user_sub !== undefined && params.user_sub !== "" && params.page > 0 && params.size > 0
  );
};
