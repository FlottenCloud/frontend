import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";
import usePostModal from "hooks/common/usePostModal";

export interface CreateInstanceParams extends DefaultParams {
  instance_id: string;
}

const deleteInstance = async (params: CreateInstanceParams) => {
  const url = `/openstack/`;
  const { data } = await DefaultAxiosService.instance.delete(url, {
    data: {
      instance_id: params.instance_id,
    },
  });
  return data;
};

const useDeleteInstance = () => {
  const queryClient = useQueryClient();
  return useMutation((params: CreateInstanceParams) => deleteInstance(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_instance");

      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useDeleteInstance;

export const useDeleteInstanceOpen = (id: string) => {
  const deleteInstance = useDeleteInstance();

  const handleAgree = useCallback(() => {
    deleteInstance.mutate({ instance_id: id });
  }, [deleteInstance, id]);

  const handleOpen = useCallback(() => {
    if (window.confirm("Do you really want to delete this Instance?")) {
      handleAgree();
    }
  }, [handleAgree]);

  usePostModal({
    mutation: deleteInstance,
  });

  return handleOpen;
};
