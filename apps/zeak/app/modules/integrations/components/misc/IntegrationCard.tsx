import React from 'react';
import moment from 'moment-timezone';
import { Link } from '@remix-run/react';
import Image from '~/components/Image';
import { IIntegrationModel } from '../../models/integration.model';
import ConnectionsPill from './connectionsPill';
import { useUnifiedContext } from '../../context';
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface IntegrationCardProps {
  records: IIntegrationModel[];
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  records,
}) => {
  const { openConnectionDrawer, dispatch } = useUnifiedContext();

  const handleAddConnection = (record: IIntegrationModel) => {
    dispatch({ type: "SET_SELECTED_INTEGRATION", payload: record });
    openConnectionDrawer("create");
  }

  const handleToggleFavorite = (record: IIntegrationModel) => {
    // dispatch({ type: "SET_SELECTED_INTEGRATION", payload: record });
    // openConnectionDrawer("create");
  }

  // Render a single card
  const renderCard = (record: IIntegrationModel) => {
    return (
      <div key={record.id} className="bg-white rounded-zeak p-6 transition-shadow hover:shadow-md flex flex-col min-w-[376px] max-w-[440px]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-shrink-0">
            <Image src={record.logo} alt={record.integrationName} className="w-10 h-10 rounded-full" />
          </div>
          <Link 
            to={`${record.id}`}
            className="text-text-tertiary hover:text-gray-600 flex items-center text-xs"
            aria-label="View URL"
          >
            URL
            <MdOutlineOpenInNew className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="mb-5">
          <div className="flex items-center mb-1">
            <h3 className="text-lg font-medium text-secondary">{record.integrationName}</h3>
            <span className="ml-2 text-xs text-text-tertiary uppercase px-0.5 py-0.5 rounded-sm border opacity-80">{record.integrationCategory}</span>
          </div>
          {record.description && (
            <p className="text-sm text-text-tertiary leading-relaxed">{record.description}</p>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <span className="block text-secondary-tertiary text-sm mb-1 font-semibold">Connections</span>
              <span className="block text-text-tertiary text-sm font-medium">
                <ConnectionsPill type="card" id={record.id} />
              </span>
            </div>
            <div>
              <span className="block text-secondary-tertiary text-sm mb-1 font-semibold">Last Updated</span>
              <span className="block text-text-tertiary text-sm font-medium tracking-widest">
                {moment(record.updatedAt || record.createdAt).format("DD/MM/YY")}{", "}
                <span className="font-normal tracking-normal">
                {moment(record.updatedAt || record.createdAt).format("hh:mm A")} |{" "}
                {moment(record.updatedAt || record.createdAt).tz("America/Chicago").format("z")}
                </span>
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => handleAddConnection(record)}
              className="bg-[#0D0844] text-white px-4 py-2 rounded-zeak text-sm font-medium hover:bg-[#0D0844]/80 transition-colors"
            >
              Add Connection
            </button>
            <button 
              onClick={() => handleToggleFavorite(record)}
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
    <div className="flex justify-start items-start self-stretch flex-wrap gap-4 transition-all duration-300 mt-2">
      {records.map(record => renderCard(record))}
    </div>
  );
};

export default IntegrationCard; 