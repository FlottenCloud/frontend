import { PageParams } from "types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadAllUserResponse } from "types/api/user/readAllUser";

export interface ReadAllUserParams extends PageParams {
  user_sub: string;
}

const readAllUser = async (params: ReadAllUserParams) => {
  const url = `/user/all/${params.user_sub}`;
  const { data } = await DefaultAxiosService.instance.get(url, {
    params: {
      page: params.page,
      size: params.size,
    },
  });
  return data;
};

const useReadAllUser = (params: ReadAllUserParams): QueryResult<ReadAllUserResponse> => {
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_all_user", params],
    async () => validate(params) && readAllUser(params),
    {
      onSuccess: (res) => {
        successCallback && res && successCallback(res);
      },
      onError: (err) => {
        errorCallback && err && errorCallback(err);
      },
      enabled,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  return response;
};

export default useReadAllUser;

const validate = (params: ReadAllUserParams): boolean => {
  return (
    params.user_sub !== undefined && params.user_sub !== "" && params.page > 0 && params.size > 0
  );
};
