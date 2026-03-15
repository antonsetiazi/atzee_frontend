import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@/core/ui/components";
import { useState } from "react";

export default function ModalSample() {
    const [openBasic, setOpenBasic] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    return (
        <div>
            <p>Basic Modal</p>
            <Button onClick={() => setOpenBasic(true)}>Open Basic</Button>
            <Modal open={openBasic} onClose={() => setOpenBasic(false)}>
                <ModalHeader>Create User</ModalHeader>

                <ModalContent>Form goes here</ModalContent>

                <ModalFooter>
                    <Button onClick={() => setOpenBasic(false)}>Cancel</Button>

                    <Button>Save</Button>
                </ModalFooter>
            </Modal>

            <p>Confirmation Dialog</p>
            <Button onClick={() => setOpenConfirm(true)}>Open Confirm</Button>
            <Modal open={openConfirm} onClose={close}>
                <ModalHeader>Delete User</ModalHeader>

                <ModalContent>
                    Are you sure you want to delete this user?
                </ModalContent>

                <ModalFooter>
                    <Button
                        variant="secondary"
                        onClick={() => setOpenConfirm(false)}
                    >
                        Cancel
                    </Button>

                    <Button variant="danger">Delete</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
