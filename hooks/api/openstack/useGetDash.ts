import { DefaultParams } from "./../../../types/api/common/params";
import { QueryResult } from "types/api/common/response";
import { useQuery } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import { ReadDashResponse } from "types/api/openstack/readDash";
import { useRouter } from "next/router";
import useStatusStore from "store/common/server";

export interface ReadDashParams extends DefaultParams {}

const readDash = async (params: ReadDashParams) => {
  const url = `/openstack/dashboard/`;
  const { data } = await DefaultAxiosService.instance.get(url);
  return data;
};

const useReadDash = (params: ReadDashParams): QueryResult<ReadDashResponse> => {
  const router = useRouter();
  const statusStore = useStatusStore();
  const { successCallback, errorCallback, enabled } = params;
  const response = useQuery(
    ["read_dash", params],
    async () => readDash(params),
    {
      onSuccess: (res) => {
        successCallback && res && successCallback(res);
        if (statusStore.getStatus() === "cloudstack") {
          window.alert("오픈스택 서버가 복구되었습니다.");
        }
        statusStore.setStatus("openstack");
      },
      onError: (err) => {
        errorCallback && err && errorCallback(err);
        window.alert(
          "오픈스택 서버에 문제가 생겨 클라우드 스택 서버로 전환합니다."
        );
        router.push({ pathname: "/clouddash" });
        statusStore.setStatus("cloudstack");
      },
      enabled,
      staleTime: 0,
      cacheTime: 0,
    }
  );
  return response;
};

export default useReadDash;
