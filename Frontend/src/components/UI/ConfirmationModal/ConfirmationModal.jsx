import { Modal } from "antd";

const ConfirmationModal = ({
    open,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}) => {

    return (
        <Modal
            open={open}
            title={title}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={confirmText}
            cancelText={cancelText}
            confirmLoading={loading}
            centered
        >
            <p>{description}</p>
        </Modal>
    );
};

export default ConfirmationModal;