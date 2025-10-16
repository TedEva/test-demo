import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockDestinations } from '../data/destinations';
import type { Destination } from '../types';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (id) {
      const found = mockDestinations.find(d => d.id === id);
      setDestination(found || null);
    }
  }, [id]);

  const handleBookNow = () => {
    if (destination) {
      navigate(`/booking?destination=${destination.id}`);
    }
  };

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">未找到目的地</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${destination.image})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl">{destination.location}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← 返回首页
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Header with Rating and Price */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{destination.name}</h2>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="text-lg text-gray-700 ml-2">{destination.rating} 评分</span>
                  <span className="mx-3 text-gray-400">|</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {destination.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm mb-1">起价</p>
                <p className="text-4xl font-bold text-green-600">¥{destination.price}</p>
                <p className="text-gray-500 text-sm">/ 人 / 天</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Description Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">目的地介绍</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {destination.description}
              </p>
            </div>

            {/* Image Gallery Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">精美图片</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <img
                  src={destination.image}
                  alt={`${destination.name} 2`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">特色亮点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">优美风景</h4>
                    <p className="text-gray-600">欣赏令人惊叹的自然美景</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">文化体验</h4>
                    <p className="text-gray-600">深度了解当地文化与传统</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">专业服务</h4>
                    <p className="text-gray-600">贴心周到的旅游服务保障</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">安全保障</h4>
                    <p className="text-gray-600">全方位的安全与保险服务</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-6" />

            {/* Booking CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">准备好开始您的旅程了吗？</h3>
              <p className="text-gray-600 mb-6">立即预定，享受优质的旅游体验</p>
              <button
                onClick={handleBookNow}
                className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
              >
                立即预定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
