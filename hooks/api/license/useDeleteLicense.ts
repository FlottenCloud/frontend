import useMutateModal from "hooks/common/useMutateModal";
import { DefaultParams } from "types/api/common/params";
import { useMutation, useQueryClient } from "react-query";
import { DefaultAxiosService } from "types/defaultAxiosService";
import useChoiceAlertStore, { choiceAlertInfo } from "store/common/useChoiceAlertStore";
import { useCallback } from "react";

export interface DeleteLicenseParams extends DefaultParams {
  license_sub: string;
}

const deleteLicense = async (params: DeleteLicenseParams) => {
  const url = `/license/${params.license_sub}`;
  const { data } = await DefaultAxiosService.instance.delete(url);
  return data;
};

const useDeleteLicense = () => {
  const queryClient = useQueryClient();
  return useMutation((params: DeleteLicenseParams) => deleteLicense(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_license");
      queryClient.invalidateQueries("read_all_license");
      queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useDeleteLicense;

export const useDeleteLicenseOpen = (license_sub: string, license_name: string) => {
  const deleteLicense = useDeleteLicense();
  const choiceAlertStore = useChoiceAlertStore();

  const handleClose = useCallback(() => {
    choiceAlertStore.setIsOpen(false);
  }, []);

  const handleDeleteStatusAgree = useCallback(() => {
    deleteLicense.mutate({ license_sub });
  }, [license_sub]);

  const handleOpen = useCallback(() => {
    const choiceAlertParams: choiceAlertInfo = {
      title: `${license_name} license delete`,
      desc: "is not recoverable",
      handleAgree: handleDeleteStatusAgree,
    };
    choiceAlertStore.setIsOpen(true);
    choiceAlertStore.setInfo(choiceAlertParams);
  }, [license_sub]);

  useMutateModal({
    mutation: deleteLicense,
    successCallback: handleClose,
  });

  return handleOpen;
};
