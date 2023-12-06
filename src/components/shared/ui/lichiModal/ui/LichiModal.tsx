import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/react";
import { FC, useEffect } from "react";

import styles from "./lichiModal.module.sass";
import LichiButton from "../../lichiButton/ui/LichiButton";

interface contentsProps {
	header: JSX.Element | null;
	body: JSX.Element | null;
}

interface LichiModalProps {
	open?: boolean;
	contents?: contentsProps;
	onChange?: (value: boolean) => void;
	buttonLabel?: string;
	callback?: () => void;
}

export const LichiModal: FC<LichiModalProps> = ({
	open = false,
	contents = {
		header: <div>Хедер</div>,
		body: <div>Боди</div>,
	},
	onChange = () => {
		return null;
	},
	callback = () => console.warn("closed"),
	buttonLabel = "Закрыть",
}): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (open) {
			onOpen();
		}
	}, [open]);

	useEffect(() => {
		onChange(isOpen);
	}, [isOpen]);

	return (
		<Modal
			classNames={{
				body: styles.body,
				backdrop: styles.backdrop,
				wrapper: styles.wrapper,
				base: styles.base,
				header: styles.header,
				footer: styles.footer,
				closeButton: "hover:bg-white/5 active:bg-white/10",
			}}
			size="3xl"
			isOpen={isOpen}
			onClose={onClose}
			placement="center"
		>
			<ModalContent className="z-[9999]">
				{(close) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{contents.header}
						</ModalHeader>
						<ModalBody>{contents.body}</ModalBody>
						<ModalFooter>
							<LichiButton
								label={buttonLabel}
								onClick={() => {
									if (callback) callback();
									close();
								}}
							/>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
