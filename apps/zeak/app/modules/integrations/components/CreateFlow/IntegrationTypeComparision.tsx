import { IoMdClose } from 'react-icons/io';
import { IoCheckmark } from 'react-icons/io5';

interface ComparisonTableProps {
  onClose: () => void;
}

interface ComparisonRow {
  useCase: string;
  odata: boolean;
  restApi: boolean;
  webhook: boolean;
  database: boolean;
  ftp: boolean;
}

const comparisonData: ComparisonRow[] = [
  { useCase: 'Querying data', odata: true, restApi: true, webhook: false, database: true, ftp: false },
  { useCase: 'Securing API requests', odata: false, restApi: true, webhook: true, database: true, ftp: false },
  { useCase: 'Filtering and Sorting', odata: true, restApi: true, webhook: false, database: true, ftp: false },
  { useCase: 'User authentication', odata: false, restApi: true, webhook: false, database: true, ftp: false },
  { useCase: 'Support token expiry', odata: false, restApi: true, webhook: false, database: false, ftp: false },
  { useCase: 'Realtime processing', odata: false, restApi: false, webhook: false, database: false, ftp: false },
  { useCase: 'Batch processing', odata: true, restApi: true, webhook: false, database: true, ftp: true },
  { useCase: 'Event-driven', odata: false, restApi: false, webhook: true, database: false, ftp: false },
  { useCase: 'File-based transfers', odata: false, restApi: false, webhook: false, database: false, ftp: false },
  { useCase: 'Offline data storage', odata: false, restApi: false, webhook: false, database: true, ftp: true },
];

const IntegrationTypeComparison = ({ onClose }: ComparisonTableProps) => {
  return (
    <div className="bg-[#101828] text-white p-6 rounded-lg w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">Choosing the Right Integration Type</h2>
        <button className="text-gray-400" onClick={onClose}>
          <IoMdClose size={24} />
        </button>
      </div>
      
      <div className="text-sm text-gray-400 mb-8">
        OData vs. REST API vs. Webhook vs. Database vs. FTP
      </div>

      <div className="">
        <table className="min-w-full">
          <thead className='w-full'>
            <tr className="border-b-2 border-[#101828] text-sm bg-[#f8fafe12] rounded-lg w-full text-center whitespace-nowrap hover:bg-[#f8fafe12] divide-x divide-[#101828]">
              <th scope='col' className="py-3 px-4 font-medium text-left">USE CASE</th>
              <th scope='col' className="py-3 px-4 font-medium">ODATA</th>
              <th scope='col' className="py-3 px-4 font-medium">REST API</th>
              <th scope='col' className="py-3 px-4 font-medium">WEBHOOK</th>
              <th scope='col' className="py-3 px-4 font-medium">DATABASE</th>
              <th scope='col' className="py-3 px-4 font-medium">FTP</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr 
                key={index} 
                className="border-b border-[#101828] last:border-b-0 text-sm bg-[#f8fafe12] rounded-lg hover:bg-[#f8fafe12] divide-x divide-[#101828]"
              >
                <td className="py-3 px-4 text-sm text-left whitespace-nowrap">{row.useCase}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center w-full">
                    {row.odata ? (
                      <IoCheckmark className="text-green-500 mx-auto" size={20} />
                    ) : (
                      <IoMdClose className="text-red-500 mx-auto" size={20} />
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center w-full">
                    {row.restApi ? (
                      <IoCheckmark className="text-green-500 mx-auto" size={20} />
                    ) : (
                      <IoMdClose className="text-red-500 mx-auto" size={20} />
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center w-full">
                    {row.webhook ? (
                      <IoCheckmark className="text-green-500 mx-auto" size={20} />
                    ) : (
                      <IoMdClose className="text-red-500 mx-auto" size={20} />
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center w-full">
                    {row.database ? (
                      <IoCheckmark className="text-green-500 mx-auto" size={20} />
                    ) : (
                      <IoMdClose className="text-red-500 mx-auto" size={20} />
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center w-full">
                    {row.ftp ? (
                      <IoCheckmark className="text-green-500 mx-auto" size={20} />
                    ) : (
                      <IoMdClose className="text-red-500 mx-auto" size={20} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IntegrationTypeComparison;