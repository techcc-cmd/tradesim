import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

const api = axios.create({ baseURL: 'http://localhost:8083/api' });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('Request:', config.method.toUpperCase(), config.url, 'Token:', token ? 'Present' : 'Missing');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  response => {
    console.log('Response:', response.config.url, response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.config?.url, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      console.log('Login response:', res.data);
      const token = res.data.data.token;
      console.log('Token:', token);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">TradeSim Pro</h1>
          <p className="text-gray-500">Smart Trading, Smarter Returns</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-11 text-gray-400 hover:text-gray-600">
              {showPassword ? '👁️' : '👁️🗨️'}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-emerald-500/30 disabled:opacity-50">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="text-center mt-6 text-gray-600">Don't have an account? <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">Register</Link></p>
      </div>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/auth/register', { username, email, password });
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-2xl mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">Join TradeSim</h1>
          <p className="text-gray-500">Start with ₹10,00,000 virtual capital</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}
        {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-4 text-sm">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-11 text-gray-400 hover:text-gray-600">
              {showPassword ? '👁️' : '👁️🗨️'}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-blue-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-emerald-500/30 disabled:opacity-50">{loading ? 'Creating...' : 'Create Account'}</button>
        </form>
        <p className="text-center mt-6 text-gray-600">Already have an account? <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">Login</Link></p>
      </div>
    </div>
  );
};

const TradingPlatform = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState('RELIANCE');
  const [portfolio, setPortfolio] = useState(null);
  const [orders, setOrders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBuySell, setShowBuySell] = useState(false);
  const [tradeType, setTradeType] = useState('BUY');
  const [tradeQty, setTradeQty] = useState('');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [addFundAmount, setAddFundAmount] = useState('');
  const [timeframe, setTimeframe] = useState('1D');
  const [showMarketDepth, setShowMarketDepth] = useState(false);
  const [performance, setPerformance] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertSymbol, setAlertSymbol] = useState('');
  const [alertPrice, setAlertPrice] = useState('');
  const [alertCondition, setAlertCondition] = useState('ABOVE');
  const [heatmapData, setHeatmapData] = useState(null);
  const [tournaments, setTournaments] = useState([]);

  const filteredStocks = searchQuery ? stocks.filter(s => 
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : stocks;

  const selectedStockData = stocks.find(s => s.symbol === selectedStock) || stocks[0] || { symbol: '', name: '', currentPrice: 0, changePercent: 0 };
  
  const generateChartData = () => {
    const points = timeframe === '1D' ? 78 : timeframe === '1W' ? 35 : 90;
    const basePrice = selectedStockData.currentPrice || 1000;
    return Array.from({ length: points }, (_, i) => {
      const time = timeframe === '1D' ? `${9 + Math.floor(i / 12)}:${String((i % 12) * 5).padStart(2, '0')}` :
                   timeframe === '1W' ? `Day ${i + 1}` : `${i + 1}`;
      const variation = Math.sin(i / 10) * (basePrice * 0.03) + (Math.random() - 0.5) * (basePrice * 0.02);
      const price = basePrice + variation;
      return {
        time,
        price: price,
        high: price + (Math.random() * basePrice * 0.01),
        low: price - (Math.random() * basePrice * 0.01),
        volume: Math.floor(Math.random() * 10000) + 5000
      };
    });
  };
  
  const chartData = selectedStockData && selectedStockData.currentPrice ? generateChartData() : [];

  useEffect(() => {
    fetchPortfolio();
    fetchOrders();
    fetchPositions();
    fetchStocks();
    fetchWatchlist();
    fetchPerformance();
    fetchAlerts();
    fetchHeatmap();
    fetchTournaments();
    const interval = setInterval(fetchStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await api.get('/portfolio');
      setPortfolio(res.data.data);
    } catch (err) {
      console.error('Failed to fetch portfolio', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  const fetchPositions = async () => {
    try {
      const res = await api.get('/portfolio/positions');
      setPositions(res.data.data);
    } catch (err) {
      console.error('Failed to fetch positions', err);
    }
  };

  const fetchStocks = async () => {
    try {
      const res = await api.get('/stocks');
      setStocks(res.data.data);
    } catch (err) {
      console.error('Failed to fetch stocks', err);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await api.get('/watchlist');
      setWatchlist(res.data.data);
    } catch (err) {
      console.error('Failed to fetch watchlist', err);
    }
  };

  const fetchPerformance = async () => {
    try {
      const res = await api.get('/portfolio/performance');
      setPerformance(res.data.data);
    } catch (err) {
      console.error('Failed to fetch performance', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await api.get('/alerts');
      setAlerts(res.data.data);
    } catch (err) {
      console.error('Failed to fetch alerts', err);
    }
  };

  const fetchHeatmap = async () => {
    try {
      const res = await api.get('/portfolio/heatmap');
      setHeatmapData(res.data.data);
    } catch (err) {
      console.error('Failed to fetch heatmap', err);
    }
  };

  const fetchTournaments = async () => {
    try {
      const res = await api.get('/tournaments');
      setTournaments(res.data.data);
    } catch (err) {
      console.error('Failed to fetch tournaments', err);
    }
  };

  const toggleWatchlist = async (symbol) => {
    try {
      if (watchlist.includes(symbol)) {
        await api.delete(`/watchlist/${symbol}`);
        setWatchlist(watchlist.filter(s => s !== symbol));
      } else {
        await api.post(`/watchlist/${symbol}`);
        setWatchlist([...watchlist, symbol]);
      }
    } catch (err) {
      console.error('Failed to toggle watchlist', err);
    }
  };

  const handleBuySell = async () => {
    if (!tradeQty || tradeQty <= 0) return;
    
    try {
      await api.post('/orders', {
        symbol: selectedStock,
        orderType: 'MARKET',
        side: tradeType,
        quantity: parseInt(tradeQty),
        price: selectedStockData.currentPrice
      });
      toast.success(`${tradeType} order for ${tradeQty} ${selectedStock} executed successfully! ₹${(selectedStockData.currentPrice * parseInt(tradeQty)).toLocaleString()}`);
      fetchPortfolio();
      fetchOrders();
      fetchPositions();
      fetchPerformance();
      setShowBuySell(false);
      setTradeQty('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    }
  };

  const handleAddFunds = async () => {
    const amount = parseFloat(addFundAmount);
    if (!amount || amount <= 0) return;
    try {
      console.log('Adding funds:', amount);
      const res = await api.post(`/portfolio/add-funds?amount=${amount}`);
      console.log('Add funds response:', res.data);
      toast.success(`₹${amount.toLocaleString()} added to your account successfully!`);
      await fetchPortfolio();
      setShowAddFunds(false);
      setAddFundAmount('');
    } catch (err) {
      console.error('Add funds error:', err.response || err);
      toast.error(err.response?.data?.message || 'Failed to add funds');
    }
  };

  const handleExportReport = async () => {
    try {
      const res = await api.get('/portfolio/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'portfolio-report.txt');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Portfolio report downloaded successfully!');
    } catch (err) {
      toast.error('Failed to export report');
    }
  };

  const handleCreateAlert = async () => {
    if (!alertSymbol || !alertPrice) return;
    try {
      await api.post('/alerts', {
        symbol: alertSymbol,
        targetPrice: parseFloat(alertPrice),
        conditionType: alertCondition
      });
      toast.success(`Alert set for ${alertSymbol} at ₹${alertPrice}`);
      fetchAlerts();
      setShowAlertModal(false);
      setAlertSymbol('');
      setAlertPrice('');
    } catch (err) {
      toast.error('Failed to create alert');
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await api.delete(`/alerts/${id}`);
      toast.success('Alert deleted');
      fetchAlerts();
    } catch (err) {
      toast.error('Failed to delete alert');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: '#fff', color: '#1f2937', border: '1px solid #e5e7eb', borderRadius: '12px' } }} />
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">TradeSim Pro</h1>
            <div className="flex gap-1">
              {['dashboard', 'heatmap', 'alerts', 'tournaments', 'performance', 'orders', 'holdings', 'positions', 'funds'].map(view => (
                <button key={view} onClick={() => setActiveView(view)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${activeView === view ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>{view}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-gray-500">Available</div>
              <div className="text-lg font-bold text-emerald-600">₹{portfolio?.cashBalance?.toLocaleString() || '0'}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Invested</div>
              <div className="text-lg font-bold text-gray-900">₹{portfolio?.investedAmount?.toLocaleString() || '0'}</div>
            </div>
            <button onClick={() => setShowAddFunds(true)} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-emerald-500/30">+ Add Funds</button>
            <button onClick={handleExportReport} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-blue-500/30">📄 Export</button>
            <div className="border-l border-gray-200 pl-6">
              <div className="text-sm font-medium text-gray-900">{username}</div>
              <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-600">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-auto p-6">
        {showBuySell && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-200 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{tradeType} {selectedStock}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 text-sm">Price</label>
                  <div className="text-2xl font-bold text-gray-900">₹{selectedStockData?.currentPrice || 0}</div>
                </div>
                <div>
                  <label className="text-gray-600 text-sm block mb-2">Quantity</label>
                  <input type="number" value={tradeQty} onChange={(e) => setTradeQty(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter quantity" />
                </div>
                {tradeQty && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Total Amount</span>
                      <span className="text-gray-900 font-bold">₹{(selectedStockData?.currentPrice * parseInt(tradeQty || 0)).toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button onClick={handleBuySell} className={`flex-1 py-3 rounded-xl font-semibold shadow-lg ${tradeType === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30' : 'bg-red-500 hover:bg-red-600 shadow-red-500/30'} text-white`}>{tradeType}</button>
                  <button onClick={() => setShowBuySell(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddFunds && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Add Funds</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Amount (₹)</label>
                  <input type="number" value={addFundAmount} onChange={(e) => setAddFundAmount(e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white" placeholder="Enter amount" />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddFunds} className="flex-1 py-3 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white">Add Funds</button>
                  <button onClick={() => setShowAddFunds(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-sm opacity-90 mb-2">Portfolio Value</div>
                <div className="text-3xl font-bold">₹{portfolio?.totalValue?.toLocaleString() || '10,00,000'}</div>
                <div className="text-sm mt-2 flex items-center gap-1">
                  <span className="text-emerald-100">{portfolio?.totalPnl >= 0 ? '↑' : '↓'}</span>
                  <span>{portfolio?.totalPnl >= 0 ? '+' : ''}₹{portfolio?.totalPnl?.toFixed(2) || '0'}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-sm opacity-90 mb-2">Today's P&L</div>
                <div className="text-3xl font-bold">+₹{portfolio?.dailyPnl?.toFixed(2) || '0'}</div>
                <div className="text-sm mt-2">+{portfolio?.roiPercentage?.toFixed(2) || '0'}%</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-sm opacity-90 mb-2">Invested</div>
                <div className="text-3xl font-bold">₹{portfolio?.investedAmount?.toLocaleString() || '0'}</div>
                <div className="text-sm mt-2 opacity-90">{positions.length} positions</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-sm opacity-90 mb-2">Available Cash</div>
                <div className="text-3xl font-bold">₹{portfolio?.cashBalance?.toLocaleString() || '0'}</div>
                <div className="text-sm mt-2 opacity-90">Ready to trade</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Market Watch</h3>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search stocks..." className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {filteredStocks && filteredStocks.length > 0 ? filteredStocks.map(stock => (
                  <div key={stock.symbol} onClick={() => setSelectedStock(stock.symbol)} className={`p-4 rounded-xl cursor-pointer transition relative ${selectedStock === stock.symbol ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}>
                    <button onClick={(e) => { e.stopPropagation(); toggleWatchlist(stock.symbol); }} className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600">
                      {watchlist.includes(stock.symbol) ? '⭐' : '☆'}
                    </button>
                    <div className="font-bold text-gray-900">{stock.symbol}</div>
                    <div className="text-xs text-gray-500 mb-2">{stock.name}</div>
                    <div className="text-lg font-bold text-gray-900">₹{stock.currentPrice}</div>
                    <div className={`text-sm font-medium ${stock.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                    </div>
                  </div>
                )) : <div className="col-span-4 text-center text-gray-400 py-8">Loading stocks...</div>}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedStock || 'Select Stock'}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-3xl font-bold text-gray-900">₹{selectedStockData?.currentPrice || 0}</span>
                    <span className={`text-lg font-semibold ${selectedStockData?.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {selectedStockData?.changePercent >= 0 ? '+' : ''}{selectedStockData?.changePercent}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{selectedStockData?.name || 'No stock selected'}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowMarketDepth(!showMarketDepth)} className={`px-4 py-2 rounded-lg font-medium transition ${showMarketDepth ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Market Depth</button>
                  <button onClick={() => { setTradeType('BUY'); setShowBuySell(true); }} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium shadow-lg shadow-emerald-500/30">BUY</button>
                  <button onClick={() => { setTradeType('SELL'); setShowBuySell(true); }} className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-lg shadow-red-500/30">SELL</button>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                {['1D', '1W', '1M'].map(tf => (
                  <button key={tf} onClick={() => setTimeframe(tf)} className={`px-4 py-1 rounded-lg text-sm font-medium transition ${timeframe === tf ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>{tf}</button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="time" stroke="#ffffff60" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#ffffff60" domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} />
                      <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} fill="url(#colorPrice)" />
                      <Line type="monotone" dataKey="high" stroke="#10b981" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="low" stroke="#ef4444" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                    </ComposedChart>
                  </ResponsiveContainer>
                  <div className="mt-2 flex justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded"></div><span className="text-gray-400">Price</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-1 bg-green-500"></div><span className="text-gray-400">High</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-1 bg-red-500"></div><span className="text-gray-400">Low</span></div>
                  </div>
                </div>

                {showMarketDepth ? (
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-bold mb-3">Market Depth</h4>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400 grid grid-cols-3 gap-2 pb-2 border-b border-white/10">
                        <span>Bid Qty</span><span className="text-center">Price</span><span className="text-right">Ask Qty</span>
                      </div>
                      {[0,1,2,3,4].map(i => {
                        const bidQty = Math.floor(Math.random() * 500) + 100;
                        const askQty = Math.floor(Math.random() * 500) + 100;
                        const price = selectedStockData.currentPrice + (2 - i) * 0.5;
                        return (
                          <div key={i} className="grid grid-cols-3 gap-2 text-sm">
                            <span className="text-green-400">{bidQty}</span>
                            <span className="text-white text-center">₹{price.toFixed(2)}</span>
                            <span className="text-red-400 text-right">{askQty}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-bold mb-3">Quick Trade</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 5, 10, 25].map(qty => (
                          <button key={qty} onClick={() => { setTradeQty(qty.toString()); setTradeType('BUY'); setShowBuySell(true); }} className="px-3 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-sm font-medium border border-green-600/30">Buy {qty}</button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 5, 10, 25].map(qty => (
                          <button key={qty} onClick={() => { setTradeQty(qty.toString()); setTradeType('SELL'); setShowBuySell(true); }} className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium border border-red-600/30">Sell {qty}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="text-xs text-gray-400 mb-2">Stock Info</div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-gray-400">Open</span><span className="text-white">₹{selectedStockData?.openPrice || 0}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">High</span><span className="text-green-400">₹{selectedStockData?.highPrice || 0}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Low</span><span className="text-red-400">₹{selectedStockData?.lowPrice || 0}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Prev Close</span><span className="text-white">₹{selectedStockData?.previousClose || 0}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'performance' && performance && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Performance Metrics</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
                  <div className="text-sm opacity-80 mb-2">Total P&L</div>
                  <div className="text-3xl font-bold">₹{performance.totalPnl?.toFixed(2)}</div>
                  <div className="text-sm mt-2">{performance.totalPnlPercentage?.toFixed(2)}%</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                  <div className="text-sm opacity-80 mb-2">Win Rate</div>
                  <div className="text-3xl font-bold">{performance.winRate?.toFixed(2)}%</div>
                  <div className="text-sm mt-2">{performance.winningTrades}/{performance.totalTrades} trades</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
                  <div className="text-sm opacity-80 mb-2">Avg Profit/Trade</div>
                  <div className="text-3xl font-bold">₹{performance.avgProfitPerTrade?.toFixed(2)}</div>
                  <div className="text-sm mt-2">Per trade average</div>
                </div>
                <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 text-white">
                  <div className="text-sm opacity-80 mb-2">Current Streak</div>
                  <div className="text-3xl font-bold">{performance.currentStreak}</div>
                  <div className="text-sm mt-2">{performance.streakType} streak</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Trade Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Total Trades</span>
                    <span className="text-2xl font-bold text-white">{performance.totalTrades}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Winning Trades</span>
                    <span className="text-2xl font-bold text-green-400">{performance.winningTrades}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Losing Trades</span>
                    <span className="text-2xl font-bold text-red-400">{performance.losingTrades}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Best & Worst</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                    <span className="text-gray-400">Best Trade</span>
                    <span className="text-2xl font-bold text-green-400">+₹{performance.bestTrade?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                    <span className="text-gray-400">Worst Trade</span>
                    <span className="text-2xl font-bold text-red-400">₹{performance.worstTrade?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-400">Sharpe Ratio</span>
                    <span className="text-2xl font-bold text-purple-400">{performance.sharpeRatio?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'heatmap' && heatmapData && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Heatmap</h2>
            <div className="grid grid-cols-4 gap-4">
              {heatmapData.items && heatmapData.items.map(item => (
                <div key={item.symbol} className={`p-6 rounded-xl border-2 ${item.pnlPercentage >= 0 ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'}`} style={{minHeight: `${Math.max(100, item.percentage * 2)}px`}}>
                  <div className="font-bold text-gray-900 text-lg">{item.symbol}</div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">₹{item.value?.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.percentage?.toFixed(2)}% of portfolio</div>
                  <div className={`text-lg font-bold mt-2 ${item.pnlPercentage >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {item.pnlPercentage >= 0 ? '+' : ''}{item.pnlPercentage?.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'alerts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Price Alerts</h2>
                <button onClick={() => setShowAlertModal(true)} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium shadow-lg shadow-emerald-500/30">+ Create Alert</button>
              </div>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div>
                      <div className="font-bold text-gray-900">{alert.symbol}</div>
                      <div className="text-sm text-gray-600">
                        Alert when price goes {alert.conditionType.toLowerCase()} ₹{alert.targetPrice}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteAlert(alert.id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm">Delete</button>
                  </div>
                ))}
                {alerts.length === 0 && <div className="text-center text-gray-400 py-8">No alerts set. Create one to get notified!</div>}
              </div>
            </div>
          </div>
        )}

        {showAlertModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-gray-200 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Price Alert</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 text-sm block mb-2">Stock Symbol</label>
                  <input type="text" value={alertSymbol} onChange={(e) => setAlertSymbol(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., RELIANCE" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm block mb-2">Target Price</label>
                  <input type="number" value={alertPrice} onChange={(e) => setAlertPrice(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Enter price" />
                </div>
                <div>
                  <label className="text-gray-600 text-sm block mb-2">Condition</label>
                  <select value={alertCondition} onChange={(e) => setAlertCondition(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="ABOVE">Above</option>
                    <option value="BELOW">Below</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleCreateAlert} className="flex-1 py-3 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">Create Alert</button>
                  <button onClick={() => setShowAlertModal(false)} className="flex-1 py-3 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'tournaments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trading Tournaments</h2>
              <div className="grid grid-cols-2 gap-4">
                {tournaments.map(tournament => (
                  <div key={tournament.id} className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl text-white shadow-xl">
                    <div className="text-2xl font-bold mb-2">{tournament.name}</div>
                    <div className="text-sm opacity-90 mb-4">{tournament.description}</div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm opacity-90">Prize Pool</div>
                        <div className="text-xl font-bold">₹{tournament.prizePool?.toLocaleString()}</div>
                      </div>
                      <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100">Join Now</button>
                    </div>
                  </div>
                ))}
                {tournaments.length === 0 && (
                  <div className="col-span-2 text-center text-gray-400 py-8">
                    <div className="text-4xl mb-4">🏆</div>
                    <div>No active tournaments. Check back soon!</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'orders' && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Order Book</h2>
            <table className="w-full">
              <thead className="text-left text-gray-400 border-b border-white/10">
                <tr>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 text-gray-300">{new Date(order.createdAt).toLocaleTimeString()}</td>
                    <td><span className={`px-3 py-1 rounded-full text-xs font-medium ${order.side === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{order.side}</span></td>
                    <td className="font-medium text-white">{order.symbol}</td>
                    <td className="text-gray-300">{order.quantity}</td>
                    <td className="text-gray-300">₹{order.price}</td>
                    <td><span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeView === 'holdings' && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Holdings</h2>
            <table className="w-full">
              <thead className="text-left text-gray-400 border-b border-white/10">
                <tr>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3">Avg Price</th>
                  <th className="pb-3">LTP</th>
                  <th className="pb-3">P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map(pos => {
                  const pnl = (pos.currentPrice - pos.averagePrice) * pos.quantity;
                  const pnlPercent = ((pos.currentPrice - pos.averagePrice) / pos.averagePrice) * 100;
                  return (
                    <tr key={pos.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 font-medium text-white">{pos.symbol}</td>
                      <td className="text-gray-300">{pos.quantity}</td>
                      <td className="text-gray-300">₹{pos.averagePrice}</td>
                      <td className="text-white font-medium">₹{pos.currentPrice}</td>
                      <td className={`font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)} ({pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeView === 'positions' && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
            <table className="w-full">
              <thead className="text-left text-gray-400 border-b border-white/10">
                <tr>
                  <th className="pb-3">Stock</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3">Avg Price</th>
                  <th className="pb-3">LTP</th>
                  <th className="pb-3">P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map(pos => {
                  const pnl = (pos.currentPrice - pos.averagePrice) * pos.quantity;
                  const pnlPercent = ((pos.currentPrice - pos.averagePrice) / pos.averagePrice) * 100;
                  return (
                    <tr key={pos.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 font-medium text-white">{pos.symbol}</td>
                      <td className="text-gray-300">{pos.quantity}</td>
                      <td className="text-gray-300">₹{pos.averagePrice}</td>
                      <td className="text-white font-medium">₹{pos.currentPrice}</td>
                      <td className={`font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)} ({pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeView === 'funds' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Equity</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Available margin</span>
                  <span className="text-2xl font-bold text-green-400">₹{portfolio?.cashBalance?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Used margin</span>
                  <span className="text-2xl font-bold text-white">₹{portfolio?.investedAmount?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Opening balance</span>
                  <span className="text-xl font-bold text-white">₹10,00,000.00</span>
                </div>
                <button onClick={() => setShowAddFunds(true)} className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-semibold">+ Add Funds</button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Margin Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Cash</span>
                  <span className="text-xl font-bold text-white">₹{portfolio?.cashBalance?.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Collateral</span>
                  <span className="text-xl font-bold text-white">₹0.00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-bold text-purple-400">₹{portfolio?.cashBalance?.toLocaleString() || '0'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><TradingPlatform /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
