import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@zeak/react'
import React from 'react'

interface IntegrationConfirmationProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose?: () => void;
    onConfirm?: () => void;
}

function IntegrationConfirmationModal({ isOpen, title, message, onClose, onConfirm }: IntegrationConfirmationProps) {
    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent size="small">
                <ModalHeader className='border-b-0'>
                    <p className='text-[#0D0C22] text-2xl font-semibold'>{title}</p>
                </ModalHeader>
                <ModalBody className='px-5'>
                    <p className='text-[#0D0C22] text-sm'>{message}</p>
                </ModalBody>
                <ModalFooter className='flex items-center px-5 pb-6'>
                    <button className='flex-1 py-4 border-2 rounded-[12px] border-[#0D0844] text-[#0D0844]' onClick={onClose}>Cancel</button>
                    <button className='flex-1 py-4 rounded-[12px] bg-[#0D0844] text-white' onClick={onConfirm}>OK</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default IntegrationConfirmationModal;