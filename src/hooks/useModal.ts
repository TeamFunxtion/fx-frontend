import { useRecoilState } from "recoil";
import { globalModalState } from "@/store/atoms";

export default function useModal() {
  const [modal, setModal] = useRecoilState(globalModalState);

  const showModal = (modalName: string) => {
    setModal({
      ...modal,
      [modalName]: true,
    });
  };

  const hideModal = (modalName: string) => {
    setModal({
      ...modal,
      [modalName]: false,
    });
  };

  const toggleModal = (modalName: string) => {
    setModal({
      ...modal,
      [modalName]: !modal[modalName],
    });
  };

  return {
    modal,
    setModal,
    showModal,
    hideModal,
    toggleModal,
  };
}
