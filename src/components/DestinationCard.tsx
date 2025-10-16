import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${destination.id}`);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booking?destination=${destination.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600 ml-1">{destination.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{destination.location}</p>
        <p className="text-gray-700 mb-4 overflow-hidden text-ellipsis" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>{destination.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">¥{destination.price}</span>
          <button
            onClick={(e) => handleBookNow(e)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            立即预定
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;