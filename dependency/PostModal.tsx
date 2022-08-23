import Requesting from "components/common/Requesting";
import useExit from "hooks/common/useExit";
import { useCallback, useEffect } from "react";
import usePostModalStore, { MUTATION_STATUS } from "store/common/postModal";

const PostModal = () => {
  const postModalStore = usePostModalStore();

  // 모달이 켜진상태로 다른 곳으로 이동하면 모달을 끔
  const exitCallback = useCallback(() => {
    postModalStore.setStatus(MUTATION_STATUS.DEFAULT);
  }, []);
  useExit({ callback: exitCallback });

  const status = postModalStore.getStatus();

  useEffect(() => {
    if (status === MUTATION_STATUS.SUCCESS) {
      postModalStore.setStatus(MUTATION_STATUS.DEFAULT);
    }
    if (status === MUTATION_STATUS.ERROR) {
      window.alert(postModalStore.getMessage() ?? "알 수 없는 에러입니다.");
      postModalStore.setStatus(MUTATION_STATUS.DEFAULT);
    }
  }, [status]);

  return <>{status === MUTATION_STATUS.LOADING && <Requesting />}</>;
};

export default PostModal;
