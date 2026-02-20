import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const OrderBook = ({ buyOrders = [], sellOrders = [] }) => {
  const maxVolume = Math.max(
    ...buyOrders.map(o => o.volume),
    ...sellOrders.map(o => o.volume)
  );

  const OrderRow = ({ order, type }) => {
    const widthPercent = (order.volume / maxVolume) * 100;
    const isBuy = type === 'buy';

    return (
      <motion.div
        initial={{ opacity: 0, x: isBuy ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative h-8 flex items-center justify-between px-3 text-sm"
      >
        <div
          className={`absolute inset-0 ${
            isBuy ? 'bg-green-500/10' : 'bg-red-500/10'
          }`}
          style={{ width: `${widthPercent}%`, right: isBuy ? 0 : 'auto', left: isBuy ? 'auto' : 0 }}
        />
        <span className={`relative z-10 font-mono ${isBuy ? 'text-green-400' : 'text-red-400'}`}>
          ${order.price.toFixed(2)}
        </span>
        <span className="relative z-10 text-gray-400 font-mono">{order.volume}</span>
        <span className="relative z-10 text-gray-500 font-mono text-xs">
          ${(order.price * order.volume).toFixed(0)}
        </span>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
        Order Book
      </h3>

      {/* Header */}
      <div className="flex justify-between px-3 mb-2 text-xs text-gray-500 font-medium">
        <span>Price (USD)</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      {/* Sell Orders */}
      <div className="space-y-1 mb-4">
        {sellOrders.slice(0, 8).reverse().map((order, idx) => (
          <OrderRow key={`sell-${idx}`} order={order} type="sell" />
        ))}
      </div>

      {/* Current Price */}
      <div className="bg-gray-800/50 rounded-lg p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <span className="text-2xl font-bold text-white">$1,234.56</span>
        </div>
        <span className="text-green-400 text-sm font-medium">+2.34%</span>
      </div>

      {/* Buy Orders */}
      <div className="space-y-1">
        {buyOrders.slice(0, 8).map((order, idx) => (
          <OrderRow key={`buy-${idx}`} order={order} type="buy" />
        ))}
      </div>
    </motion.div>
  );
};

export default OrderBook;
