import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Menu, X, Bell, Settings, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import websocketService from '../services/websocketService';
import TradingChart from '../components/TradingChart';
import OrderBook from '../components/OrderBook';
import Leaderboard from '../components/Leaderboard';
import PortfolioAnalytics from '../components/PortfolioAnalytics';

const TradingDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [portfolio, setPortfolio] = useState(null);
  const [marketData, setMarketData] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  // Mock data for demonstration
  const chartData = Array.from({ length: 50 }, (_, i) => ({
    time: `${9 + Math.floor(i / 12)}:${(i % 12) * 5}`,
    price: 150 + Math.random() * 10,
    change: (Math.random() - 0.5) * 2
  }));

  const buyOrders = Array.from({ length: 10 }, (_, i) => ({
    price: 150 - i * 0.5,
    volume: Math.floor(Math.random() * 1000) + 100
  }));

  const sellOrders = Array.from({ length: 10 }, (_, i) => ({
    price: 150 + i * 0.5,
    volume: Math.floor(Math.random() * 1000) + 100
  }));

  const mockLeaderboard = [
    { id: 1, username: 'TraderPro', totalPnl: 25000, roiPercentage: 25, totalTrades: 150, winRate: 68 },
    { id: 2, username: 'WolfOfWallSt', totalPnl: 18500, roiPercentage: 18.5, totalTrades: 120, winRate: 65 },
    { id: 3, username: 'BullRunner', totalPnl: 15000, roiPercentage: 15, totalTrades: 95, winRate: 62 },
    { id: 4, username: username, totalPnl: 12000, roiPercentage: 12, totalTrades: 80, winRate: 60 },
    { id: 5, username: 'MarketMaker', totalPnl: 10000, roiPercentage: 10, totalTrades: 70, winRate: 58 }
  ];

  const mockPortfolio = {
    totalValue: 112000,
    cashBalance: 50000,
    investedAmount: 62000,
    totalPnl: 12000,
    dailyPnl: 1500,
    roiPercentage: 12
  };

  useEffect(() => {
    setPortfolio(mockPortfolio);
    setLeaderboard(mockLeaderboard);

    // Connect WebSocket
    websocketService.connect(() => {
      console.log('Connected to trading platform');
    });

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const stocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Top Navigation */}
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TradeSim Pro
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
                <div className="text-right">
                  <p className="text-white font-medium">{username}</p>
                  <p className="text-gray-400 text-sm">Rank #4</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0 }}
          className="bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 overflow-hidden"
        >
          <div className="p-6 space-y-4">
            <h3 className="text-gray-400 text-sm font-medium uppercase">Watchlist</h3>
            {stocks.map((stock) => (
              <motion.button
                key={stock}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStock(stock)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedStock === stock
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{stock}</span>
                  <span className="text-green-400 text-sm">+2.3%</span>
                </div>
                <div className="text-sm mt-1 opacity-80">$150.25</div>
              </motion.button>
            ))}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Portfolio Analytics */}
          <PortfolioAnalytics portfolio={portfolio} />

          {/* Trading Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <TradingChart symbol={selectedStock} data={chartData} />
            </div>

            {/* Order Book */}
            <div>
              <OrderBook buyOrders={buyOrders} sellOrders={sellOrders} />
            </div>
          </div>

          {/* Leaderboard */}
          <Leaderboard traders={leaderboard} currentUser={username} />
        </main>
      </div>
    </div>
  );
};

export default TradingDashboard;
