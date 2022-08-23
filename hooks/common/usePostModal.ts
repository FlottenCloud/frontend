import { MUTATION_STATUS } from "./../../store/common/postModal/index";
import { useEffect } from "react";
import usePostModalStore from "store/common/postModal";

interface usePostModalProps {
  mutation: any;
  isViewSuccess?: boolean;
  successCallback?: () => void;
  successMessage?: string;
  errorCallback?: () => void;
  errorMessage?: string;
}

const usePostModal = ({
  mutation,
  isViewSuccess = true,
  successCallback,
  successMessage,
  errorCallback,
  errorMessage,
}: usePostModalProps) => {
  const postModalStore = usePostModalStore();

  useEffect(() => {
    if (mutation.isLoading) {
      postModalStore.setStatus(MUTATION_STATUS.LOADING);
    } else if (mutation.isSuccess) {
      if (isViewSuccess) {
        postModalStore.setStatus(MUTATION_STATUS.SUCCESS);
        if (successMessage) postModalStore.setMessage(successMessage);
        else {
          postModalStore.setMessage(
            mutation?.data?.message ?? mutation?.data?.data?.message
          );
        }
        successCallback && successCallback();
      } else {
        postModalStore.setStatus(MUTATION_STATUS.DEFAULT);
        successCallback && successCallback();
      }
    } else if (mutation.isError) {
      postModalStore.setStatus(MUTATION_STATUS.ERROR);
      if (errorMessage) postModalStore.setMessage(errorMessage);
      else {
        if (mutation.error.message.includes("Request failed")) {
          postModalStore.setMessage(mutation.error.response.data.message);
        } else {
          postModalStore.setMessage(mutation.error.message);
        }
      }
      errorCallback && errorCallback();
    }
    return () => {
      if (!isViewSuccess) postModalStore.setStatus(MUTATION_STATUS.DEFAULT);
    };
  }, [
    mutation.isLoading,
    mutation.isSuccess,
    mutation.isError,
    mutation?.data,
  ]);
};

export default usePostModal;
