import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Target } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const PortfolioAnalytics = ({ portfolio }) => {
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Value',
      value: portfolio?.totalValue || 100000,
      prefix: '$',
      color: 'blue',
      change: '+5.2%'
    },
    {
      icon: TrendingUp,
      label: 'Total P&L',
      value: portfolio?.totalPnl || 0,
      prefix: '$',
      color: portfolio?.totalPnl >= 0 ? 'green' : 'red',
      change: portfolio?.totalPnl >= 0 ? '+' : '-'
    },
    {
      icon: Activity,
      label: 'Daily P&L',
      value: portfolio?.dailyPnl || 0,
      prefix: '$',
      color: portfolio?.dailyPnl >= 0 ? 'green' : 'red',
      change: portfolio?.dailyPnl >= 0 ? '+' : '-'
    },
    {
      icon: Target,
      label: 'ROI',
      value: portfolio?.roiPercentage || 0,
      suffix: '%',
      color: portfolio?.roiPercentage >= 0 ? 'green' : 'red',
      change: portfolio?.roiPercentage >= 0 ? '+' : '-'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-green-500 to-emerald-500',
      red: 'from-red-500 to-rose-500',
      purple: 'from-purple-500 to-pink-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all group"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(stat.color)} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClasses(stat.color)} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Label */}
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>

              {/* Value */}
              <div className="text-3xl font-bold text-white mb-1">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={2}
                />
              </div>

              {/* Change Indicator */}
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.value >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.value >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Portfolio Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-400" />
            Portfolio Breakdown
          </h3>
          <span className="text-sm text-gray-400">
            Cash: ${portfolio?.cashBalance?.toFixed(2) || '100,000.00'}
          </span>
        </div>

        {/* Allocation Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Invested</span>
              <span className="text-white font-medium">
                ${portfolio?.investedAmount?.toFixed(2) || '0.00'}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((portfolio?.investedAmount || 0) / (portfolio?.totalValue || 100000)) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Cash Balance</span>
              <span className="text-white font-medium">
                ${portfolio?.cashBalance?.toFixed(2) || '100,000.00'}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((portfolio?.cashBalance || 100000) / (portfolio?.totalValue || 100000)) * 100}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioAnalytics;
