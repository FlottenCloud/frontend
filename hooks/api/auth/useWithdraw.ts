import usePostModal from "hooks/common/usePostModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";
import useDeleteInstance from "../instance/useDeleteInstance";

export interface SignupParams extends DefaultParams {}

const withdraw = async (params: SignupParams) => {
  const url = `/account/`;
  const { data } = await DefaultAxiosService.instance.delete(url);
  return data;
};

const useWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation((params: SignupParams) => withdraw(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      //   queryClient.invalidateQueries("read_license");
      //   queryClient.invalidateQueries("read_all_license");
      //   queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useWithdraw;

export const useWithdrawOpen = () => {
  const router = useRouter();
  const deleteWithdraw = useWithdraw();

  const handleAgree = useCallback(() => {
    deleteWithdraw.mutate({
      successCallback: () => {
        localStorage.setItem("token", "");
        localStorage.setItem("apiKey", "");
        localStorage.setItem("secretKey", "");
        router.push("/auth/signin");
        DefaultAxiosService.removeHeaderToken();
      },
    });
  }, [deleteWithdraw, router]);

  const handleOpen = useCallback(() => {
    if (window.confirm("Do you really want to leave from 뜬구름?")) {
      handleAgree();
    }
  }, [handleAgree]);

  usePostModal({
    mutation: deleteWithdraw,
  });

  return handleOpen;
};
