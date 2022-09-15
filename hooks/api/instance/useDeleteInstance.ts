import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";
import usePostModal from "hooks/common/usePostModal";

export interface DeleteInstanceParams extends DefaultParams {
  instance_pk: number;
}

const deleteInstance = async (params: DeleteInstanceParams) => {
  const url = `/openstack/`;
  const { data } = await DefaultAxiosService.instance.delete(url, {
    data: {
      instance_pk: params.instance_pk,
    },
  });
  return data;
};

const useDeleteInstance = () => {
  const queryClient = useQueryClient();
  return useMutation((params: DeleteInstanceParams) => deleteInstance(params), {
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

export const useDeleteInstanceOpen = (id: number) => {
  const deleteInstance = useDeleteInstance();

  const handleAgree = useCallback(() => {
    deleteInstance.mutate({ instance_pk: id });
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
