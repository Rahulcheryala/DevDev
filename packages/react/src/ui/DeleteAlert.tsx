
interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export default function DeleteDialog({ isOpen, onClose, onConfirm, title, message }: DeleteDialogProps) {
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[#BAEAE9CC] bg-opacity-50 z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className=" bg-[#f7f7f9] rounded-zeak flex items-center justify-center">
                <div className="w-full max-w-xl bg-white rounded-zeak shadow-lg  space-y-6">
                    <div className="rounded-t-zeak p-6 space-y-6">
                        <h2 className="text-[26px] font-[450] tracking-[0px] bg-gradient-to-r from-[#FF4A5F] to-[#6B0404] bg-clip-text text-transparent">
                            {title}
                        </h2>

                        <p className="text-[#475467] text-2xl">{message}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-b-zeak p-6 bg-[#EEF3F8]">
                        <button onClick={onConfirm} className="w-full px-6 py-4 text-[#d30f45] text-xl font-medium bg-white border-2  rounded-xl hover:bg-red-50 transition-colors">
                            Confirm
                        </button>
                        <button onClick={onClose} className="w-full px-6 py-4 text-white text-xl font-medium bg-[#0d0844] rounded-xl hover:bg-[#0d0844]/90 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

