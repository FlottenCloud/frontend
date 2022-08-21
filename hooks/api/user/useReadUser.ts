import { DefaultParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadUserResponse } from "types/api/user/readUser";

export interface ReadUserParams extends DefaultParams {
  user_sub: string;
  me?: boolean;
}

const readUser = async (params: ReadUserParams) => {
  const url = `/user/${params.user_sub}`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadUser = (params: ReadUserParams): QueryResult<ReadUserResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_user", params],
    async () => validate(params.user_sub) && readUser(params),
    {
      onSuccess: (res) => {
        successCallback && res && successCallback(res);
      },
      onError: (err) => {
        errorCallback && err && errorCallback(err);
      },
      enabled,
      staleTime: params.me ? Infinity : 0,
      cacheTime: params.me ? Infinity : 0,
    },
  );
  return response;
};

export default useReadUser;

const validate = (user_sub: string): boolean => {
  return user_sub !== undefined && user_sub !== "";
};
