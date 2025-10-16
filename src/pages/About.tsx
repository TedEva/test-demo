import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80)'
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">关于我们</h1>
          <p className="text-xl">致力于为您提供最佳的旅行体验</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Company Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">我们的故事</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-4">
              TravelSite 成立于 2024 年，我们是一家专注于为旅行者提供高品质旅游服务的公司。
              我们的使命是帮助每一位旅行者发现世界的美好，创造难忘的旅行回忆。
            </p>
            <p className="text-gray-700 text-lg mb-4">
              我们精心挑选全球最美的目的地，为您提供详细的旅行信息和便捷的预定服务。
              无论您是寻找浪漫的海岛度假，还是探索文化古迹，我们都能为您提供完美的旅行方案。
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-blue-600 text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">全球精选</h3>
            <p className="text-gray-600">
              我们精心挑选全球最美的旅游目的地，确保每一次旅行都是独特的体验
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-green-600 text-5xl mb-4">💚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">贴心服务</h3>
            <p className="text-gray-600">
              24/7 客户服务，随时为您解答疑问，确保您的旅行顺利无忧
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-blue-600 text-5xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">品质保证</h3>
            <p className="text-gray-600">
              严格筛选合作伙伴，为您提供高品质的住宿、交通和旅游服务
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">我们的团队</h2>
          <p className="text-gray-700 text-lg text-center mb-8">
            我们拥有一支经验丰富、充满热情的专业团队，为您的每一次旅行保驾护航。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">李</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">李明</h3>
              <p className="text-gray-600 mb-2">创始人 & CEO</p>
              <p className="text-gray-500 text-sm">10年旅游行业经验</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">王</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">王芳</h3>
              <p className="text-gray-600 mb-2">运营总监</p>
              <p className="text-gray-500 text-sm">8年运营管理经验</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-bold">张</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">张伟</h3>
              <p className="text-gray-600 mb-2">客户服务总监</p>
              <p className="text-gray-500 text-sm">6年客户服务经验</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">联系我们</h2>
          <p className="text-lg mb-6">
            如有任何问题或建议，欢迎随时与我们联系
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-left">
            <div>
              <p className="font-semibold mb-2">📧 邮箱</p>
              <p>contact@travelsite.com</p>
            </div>
            <div>
              <p className="font-semibold mb-2">📞 电话</p>
              <p>400-123-4567</p>
            </div>
            <div>
              <p className="font-semibold mb-2">📍 地址</p>
              <p>北京市朝阳区旅游大厦 8 层</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
