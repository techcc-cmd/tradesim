import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Award, Medal } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const Leaderboard = ({ traders = [], currentUser }) => {
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <span className="text-gray-500 font-bold">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-600';
    if (rank === 3) return 'bg-gradient-to-r from-orange-500 to-red-500';
    return 'bg-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Leaderboard
        </h3>
        <span className="text-sm text-gray-400">Top Traders</span>
      </div>

      <div className="space-y-3">
        {traders.map((trader, index) => {
          const isCurrentUser = trader.username === currentUser;
          const rank = index + 1;

          return (
            <motion.div
              key={trader.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl p-4 transition-all ${
                isCurrentUser
                  ? 'bg-blue-600/20 border-2 border-blue-500'
                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800'
              }`}
            >
              {/* Rank Badge */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${getRankBadge(rank)} flex items-center justify-center`}>
                  {getRankIcon(rank)}
                </div>

                {/* Trader Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold">{trader.username}</h4>
                    {isCurrentUser && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">You</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-gray-400 text-sm">
                      {trader.totalTrades} trades
                    </span>
                    <span className="text-gray-400 text-sm">
                      {trader.winRate}% win rate
                    </span>
                  </div>
                </div>

                {/* P&L */}
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter
                      value={trader.totalPnl}
                      prefix="$"
                      decimals={2}
                    />
                  </div>
                  <div className={`text-sm font-medium ${trader.roiPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trader.roiPercentage >= 0 ? '+' : ''}{trader.roiPercentage.toFixed(2)}% ROI
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {rank <= 3 && (
                <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((trader.totalPnl / traders[0].totalPnl) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${getRankBadge(rank)}`}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all"
      >
        View Full Leaderboard
      </motion.button>
    </motion.div>
  );
};

export default Leaderboard;
