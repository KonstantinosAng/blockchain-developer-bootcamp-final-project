import Modal from "react-modal"
import { useState, useMemo } from "react"

Modal.setAppElement("#__next")

interface ReturnProps {
	renderModal: () => void
	ModalElement: any
}

export const useModal = (ModalContent: any): ReturnProps => {
	const [isOpen, setIsOpen] = useState(false)

	const style = useMemo(
		() => ({
			overlay: {
				height: "100vh",
				width: "100vw",
				backgroundColor: "rgba(255, 255, 255, 0.5)",
				zIndex: 20,
			},
			content: {
				border: "0",
				borderRadius: "4px",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				backgroundColor: "#0d1636",
				zIndex: 30,
				height: "fit-content",
				width: "fit-content",
				minWidth: "70%",
				minHeight: "50%",
			},
		}),
		[],
	)

	const openModal = () => {
		setIsOpen(true)
	}

	const afterOpenModal = () => {
		// references are now sync'd and can be accessed.
		// subtitle.style.color = '#f00';
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return {
		ModalElement: ({ ...props }): any => (
			<Modal isOpen={isOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} contentLabel="Modal Content" style={style} {...props}>
				<ModalContent closeModal={closeModal} />
			</Modal>
		),
		renderModal: openModal,
	}
}
