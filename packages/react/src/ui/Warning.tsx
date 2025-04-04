
import { cn } from "../utils/cn";
interface AlertModalProps {
    isOpen: boolean;    
    onClose: () => void;
    title?: string;

    onConfirm?: () => void;
}

const Warning = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Error",
   
}: AlertModalProps) => {
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
                        <h2 className={cn(`text-[26px] font-[450] tracking-[0px] bg-gradient-to-r w-32  bg-clip-text text-transparent from-[#FFCC00] to-[#F56B1E]`, {

                        })}>
                            {title}
                        </h2>

                        <p className="text-[#475467] text-2xl">You're about to leave the record you are currently editing. Any unsaved changes will be lost.</p>
                        <p className="text-[#475467] text-2xl">Are you sure you want to continue? </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-b-zeak p-6 bg-[#EEF3F8]">
                        <button onClick={onClose} className="w-full px-6 py-4 text-black text-xl font-medium bg-white  rounded-xl hover:bg-gray-100 transition-colors">
                            No, Save Changes
                        </button>
                        <button onClick={onConfirm} className="w-full px-6 py-4 text-white  text-xl font-medium bg-[#0d0844] border-2  rounded-xl hover:bg-[#0d0844]/90">
                            Yes, Discard Changes
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Warning;
