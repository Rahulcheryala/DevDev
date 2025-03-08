import React from 'react';
import { Integration } from '../../models/constants';
import Image from '~/components/Image';
import { MdOutlineOpenInNew } from "react-icons/md";
import { Link } from '@remix-run/react';
import ConnectionsPill from './connectionsPill';
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface IntegrationCardProps {
  records: Integration[];
  onAddConnection: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  records,
  onAddConnection,
  onToggleFavorite,
}) => {
  // Render a single card
  const renderCard = (record: Integration) => {
    return (
      <div key={record.id} className="bg-white rounded-zeak p-6 transition-shadow hover:shadow-md flex flex-col min-w-[376px] max-w-[500px]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-shrink-0">
            <Image src={record.logo} alt={record.integrationName} className="w-10 h-10 rounded-full" />
          </div>
          <Link 
            to={`${record.id}`}
            className="text-gray-400 hover:text-gray-600 flex items-center text-xs"
            aria-label="View URL"
          >
            URL
            <MdOutlineOpenInNew className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="mb-5">
          <div className="flex items-center mb-1">
            <h3 className="text-lg font-medium text-gray-900">{record.integrationName}</h3>
            <span className="ml-2 text-xs text-gray-500 uppercase px-0.5 py-0.5 rounded-sm border opacity-80">{record.integrationCategory}</span>
          </div>
          {record.purpose && (
            <p className="text-sm text-[#9BA2AC] leading-relaxed">{record.purpose}</p>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <span className="block text-gray-500 text-sm mb-1 font-semibold">Connections</span>
              <span className="block text-gray-800 text-sm font-medium">
                <ConnectionsPill type="card" connections={record.connections} />
              </span>
            </div>
            <div>
              <span className="block text-gray-500 text-sm mb-1 font-semibold">Last Updated</span>
              <span className="block text-[#9BA2AC] text-sm font-medium">
                {new Date(record.lastUpdated).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })}
                <span className="text-[#9BA2AC] font-normal">, {new Date(record.lastUpdated).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })} | CST</span>
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => onAddConnection(record.id)}
              className="bg-[#0D0844] text-white px-4 py-2 rounded-zeak text-sm font-medium hover:bg-[#0D0844]/80 transition-colors"
            >
              Add Connection
            </button>
            <button 
              onClick={() => onToggleFavorite(record.id)}
              className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
              aria-label={record.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {record.isFavorite ? (
                <FaHeart className="w-5 h-5 text-rose-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-start items-start self-stretch flex-wrap gap-4 transition-all duration-300">
      {records.map(record => renderCard(record))}
    </div>
  );
};

export default IntegrationCard; 