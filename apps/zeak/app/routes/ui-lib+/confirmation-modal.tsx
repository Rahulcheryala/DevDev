import { useState } from "react";
import { ConfirmationModal } from "@zeak/ui";
import { Button } from "@zeak/react";
import { File } from "lucide-react";

export default function ConfirmationModalExample() {
    const [isOpenWarning, setIsOpenWarning] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenInfo2, setIsOpenInfo2] = useState(false);
    const [isOpenCustom, setIsOpenCustom] = useState(false);
    return (
        <div className="container mx-auto p-6 w-full">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Confirmation Modal Component</h1>
                <p className="text-gray-600 text-lg">
                    A customizable modal component for confirming user actions with different visual styles.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} ConfirmationModal {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <Button
                            onClick={() => setIsOpenWarning(true)}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 h-[56px] hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                        >
                            Warning Modal
                        </Button>
                        <Button
                            onClick={() => setIsOpenError(true)}
                            className="bg-gradient-to-r from-red-500 to-red-600 h-[56px] hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                        >
                            Danger Modal
                        </Button>
                        <Button
                            onClick={() => setIsOpenInfo(true)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-[56px] hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                        >
                            Custom Children
                        </Button>
                        <Button
                            onClick={() => setIsOpenSuccess(true)}
                            className="bg-gradient-to-r from-green-500 to-green-600 h-[56px] hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                        >
                            Success Modal
                        </Button>
                        <Button
                            onClick={() => setIsOpenInfo2(true)}
                            className="bg-gradient-to-r from-[#0D0844] to-[#1A1464] h-[56px] hover:from-[#0D0844] hover:to-[#0D0844] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                        >
                            Info Modal
                        </Button>
                        <Button
                            onClick={() => setIsOpenCustom(true)}
                            className="bg-gradient-to-r from-[#398E5F] to-[#2A7A4B] h-[56px] hover:from-[#2A7A4B] hover:to-[#398E5F] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                        >
                            Custom Modal
                        </Button>
                    </div>
                </div>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { ConfirmationModal } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <ConfirmationModal
        type="warning"
        title="Warning"
        message="You're about to leave this page. Continue?"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRightButtonClick={() => setIsOpen(false)}
        onLeftButtonClick={() => setIsOpen(false)}
      />
    </>
  );
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Five different modal types: warning, danger, info, success, and custom</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable title and message content</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Support for both string and array of strings as message</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Configurable button text and actions</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Responsive design with different size options</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Overlay customization</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Custom gradient colors for the title</span>
                    </li>
                </ul>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Props</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">isOpen</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Controls whether the modal is displayed</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onClose</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {"=>"} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function to call when the modal is closed</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onRightButtonClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {"=>"} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function to call when the right button is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onLeftButtonClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {"=>"} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Function to call when the left button is clicked</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Warning"</div>
                        <div>Title text for the modal</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">message</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string | string[]</code></div>
                        <div>No</div>
                        <div>Default message</div>
                        <div>Content to display in the modal body</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">rightButtonText</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Yes, Discard Changes"</div>
                        <div>Text for the confirm button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">leftButtonText</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"No, Save Changes"</div>
                        <div>Text for the cancel button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">type</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">"warning" | "danger" | "info" | "success" | "custom"</code></div>
                        <div>No</div>
                        <div>"warning"</div>
                        <div>Type of modal that determines the color scheme</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">overlay</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"default"</div>
                        <div>Controls the overlay appearance</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">size</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"md"</div>
                        <div>Controls the modal size</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">rightButtonClassName</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Class name for the right button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">leftButtonClassName</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Class name for the left button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">children</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">React.ReactNode</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Custom content to render below the message</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">formColor</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Starting color for custom gradient (used with type="custom")</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">toColor</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Ending color for custom gradient (used with type="custom")</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Examples</h2>
                <h3 className="text-xl font-medium text-indigo-600">Modal Types</h3>
                <p className="text-gray-600">The ConfirmationModal component supports five different types with unique color schemes:</p>
            </section>

            <ConfirmationModal
                type="warning"
                title="Attention"
                message={["You're about to leave the record you are currently editing. Any unsaved changes will be lost.", "Are you sure you want to proceed with this action?"]}
                isOpen={isOpenWarning}
                onClose={() => setIsOpenWarning(false)}
                onRightButtonClick={() => { setIsOpenWarning(false) }}
                onLeftButtonClick={() => { setIsOpenWarning(false) }}
            />

            <ConfirmationModal
                type="danger"
                title="Delete Confirmation"
                message="Are you sure you want to delete this integration?"
                isOpen={isOpenError}
                onClose={() => setIsOpenError(false)}
                onRightButtonClick={() => { setIsOpenError(false) }}
                leftButtonText="Confirm"
                rightButtonText="Cancel"
                leftButtonClassName="text-[#D30F45]"
                rightButtonClassName=""
                onLeftButtonClick={() => { setIsOpenError(false) }}
            />

            <ConfirmationModal
                type="danger"
                title="Information"
                message="You're unable to delete this integration due to the following:"
                isOpen={isOpenInfo}
                onClose={() => setIsOpenInfo(false)}
                onRightButtonClick={() => { setIsOpenInfo(false) }}
                onLeftButtonClick={() => { setIsOpenInfo(false) }}
                children={<div>
                    <div className="bg-[#F7F7F8] rounded-zeak p-4 flex items-center gap-2 ">
                        <File className="w-6 h-6" />
                        <p className="text-[#677281] text-[16px] font-medium">Active Mapping</p>
                    </div>
                </div>}
            />

            <ConfirmationModal
                type="success"
                title="Confirmation"
                message="Your changes have been saved. Would you like to continue editing?"
                isOpen={isOpenSuccess}
                onClose={() => setIsOpenSuccess(false)}
                onRightButtonClick={() => { setIsOpenSuccess(false) }}
                onLeftButtonClick={() => { setIsOpenSuccess(false) }}
            />

            <ConfirmationModal
                type="info"
                title="Information"
                message="Are you sure you want to duplicate this Integration?"
                isOpen={isOpenInfo2}
                onClose={() => setIsOpenInfo2(false)}
                onRightButtonClick={() => { setIsOpenInfo2(false) }}
                onLeftButtonClick={() => { setIsOpenInfo2(false) }}
            />

            <ConfirmationModal
                type="custom"
                title="Information"
                message="Are you sure you want to duplicate this Integration?"
                isOpen={isOpenCustom}
                onClose={() => setIsOpenCustom(false)}
                onRightButtonClick={() => { setIsOpenCustom(false) }}
                onLeftButtonClick={() => { setIsOpenCustom(false) }}
                formColor="#398E5F"
                toColor="#101828"
            />

        </div>
    )
}