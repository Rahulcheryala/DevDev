import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@zeak/react'
import { FiExternalLink } from 'react-icons/fi';
import { PiUsersFill } from 'react-icons/pi';
import { useNavigate } from '@remix-run/react';

interface DeletionBlocker {
    title: string;
    count: number;
    link: string;
}

interface DeletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    blockers: DeletionBlocker[];
}

const DeletionModal: React.FC<DeletionModalProps> = ({ isOpen, onClose, blockers }: DeletionModalProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Modal open={isOpen} onOpenChange={onClose}>
            <ModalContent size="small">
                <ModalHeader className='border-b-0'>
                    <p className='text-[#0D0C22] text-2xl font-semibold'>Unable to Delete</p>
                </ModalHeader>
                <ModalBody>
                    <p className='text-[#0D0C22] text-sm px-5'>You're unable to delete this department due to the following:</p>
                    <div className='pl-[30px] pr-3 bg-[#F0F3F4] py-6 mt-5'>
                        {blockers.map((item, index) => <div key={index} className='flex justify-between items-center'>
                            <p className='text-[#0D0C22] text-sm gap-5 flex items-center'>
                                <PiUsersFill className='text-2xl' /> {item.title}</p>
                            <p className='text-[#0D0C22] text-sm gap-2 flex items-center'>
                                {item.count}
                                <span className='cursor-pointer' onClick={() => {
                                    navigate(item.link)
                                    onClose();
                                }}>
                                    <FiExternalLink />
                                </span>
                            </p>
                        </div>)}
                    </div>
                </ModalBody>
                <ModalFooter className='flex items-center justify-end px-5 pb-6'>
                    <button className='py-4 rounded-[12px] bg-[#0D0844] text-white px-24' onClick={onClose}>OK</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default DeletionModal;
