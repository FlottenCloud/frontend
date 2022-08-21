import { isObject } from "lodash-es";
import { useEffect } from "react";
import useMutateModalStore, { MUTATION_STATUS } from "store/common/useMutateModalStore";

interface usePostModalProps {
  mutation: any;
  isViewSuccess?: boolean;
  successCallback?: () => void;
  successMessage?: string;
  clickSuccessCallback?: (res: any) => void;
  errorCallback?: () => void;
  errorMessage?: string;
}

const useMutateModal = ({
  mutation,
  isViewSuccess = true,
  successCallback,
  successMessage,
  clickSuccessCallback,
  errorCallback,
  errorMessage,
}: usePostModalProps) => {
  const mutateModalStore = useMutateModalStore();

  useEffect(() => {
    if (mutation.isLoading) {
      mutateModalStore.setStatus(MUTATION_STATUS.LOADING);
    } else if (mutation.isSuccess) {
      if (isViewSuccess) {
        mutateModalStore.setStatus(MUTATION_STATUS.SUCCESS);
        if (successMessage) mutateModalStore.setMessage(successMessage);
        else mutateModalStore.setMessage("success!");
        successCallback && successCallback();
        clickSuccessCallback &&
          mutateModalStore.setSuccessCallback(() => clickSuccessCallback(mutation.data));
      } else {
        mutateModalStore.setStatus(MUTATION_STATUS.DEFAULT);
        successCallback && successCallback();
        clickSuccessCallback &&
          mutateModalStore.setSuccessCallback(() => clickSuccessCallback(mutation.data));
      }
    } else if (mutation.isError) {
      mutateModalStore.setStatus(MUTATION_STATUS.ERROR);
      if (errorMessage) mutateModalStore.setMessage(errorMessage);
      else
        mutateModalStore.setMessage(
          mutation.error?.response?.data?.detail === undefined ||
            isObject(mutation.error.response.data.detail)
            ? "Unknown Error"
            : mutation.error.response.data.detail,
        );
      errorCallback && errorCallback();
    }
    return () => {
      if (!isViewSuccess) mutateModalStore.setStatus(MUTATION_STATUS.DEFAULT);
    };
  }, [mutation.isLoading, mutation.isSuccess, mutation.isError]);
};

export default useMutateModal;
