package com.tradesim.config;

import com.tradesim.trading.entity.Stock;
import com.tradesim.trading.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class StockDataInitializer implements CommandLineRunner {

    private final StockRepository stockRepository;

    @Override
    public void run(String... args) {
        if (stockRepository.count() == 0) {
            List<Stock> stocks = Arrays.asList(
                Stock.builder().symbol("RELIANCE").name("Reliance Industries").currentPrice(new BigDecimal("2450.75")).previousClose(new BigDecimal("2405.45")).openPrice(new BigDecimal("2410.00")).highPrice(new BigDecimal("2465.00")).lowPrice(new BigDecimal("2405.00")).changePercent(new BigDecimal("1.88")).build(),
                Stock.builder().symbol("TCS").name("Tata Consultancy").currentPrice(new BigDecimal("3580.20")).previousClose(new BigDecimal("3605.70")).openPrice(new BigDecimal("3600.00")).highPrice(new BigDecimal("3610.00")).lowPrice(new BigDecimal("3570.00")).changePercent(new BigDecimal("-0.71")).build(),
                Stock.builder().symbol("INFY").name("Infosys Ltd").currentPrice(new BigDecimal("1520.40")).previousClose(new BigDecimal("1501.50")).openPrice(new BigDecimal("1505.00")).highPrice(new BigDecimal("1525.00")).lowPrice(new BigDecimal("1500.00")).changePercent(new BigDecimal("1.26")).build(),
                Stock.builder().symbol("HDFCBANK").name("HDFC Bank").currentPrice(new BigDecimal("1650.80")).previousClose(new BigDecimal("1618.65")).openPrice(new BigDecimal("1620.00")).highPrice(new BigDecimal("1655.00")).lowPrice(new BigDecimal("1615.00")).changePercent(new BigDecimal("1.99")).build(),
                Stock.builder().symbol("ICICIBANK").name("ICICI Bank").currentPrice(new BigDecimal("980.50")).previousClose(new BigDecimal("988.70")).openPrice(new BigDecimal("985.00")).highPrice(new BigDecimal("992.00")).lowPrice(new BigDecimal("978.00")).changePercent(new BigDecimal("-0.83")).build(),
                Stock.builder().symbol("BHARTIARTL").name("Bharti Airtel").currentPrice(new BigDecimal("1180.30")).previousClose(new BigDecimal("1158.00")).openPrice(new BigDecimal("1160.00")).highPrice(new BigDecimal("1185.00")).lowPrice(new BigDecimal("1155.00")).changePercent(new BigDecimal("1.93")).build(),
                Stock.builder().symbol("WIPRO").name("Wipro Ltd").currentPrice(new BigDecimal("445.60")).previousClose(new BigDecimal("439.80")).openPrice(new BigDecimal("440.00")).highPrice(new BigDecimal("448.00")).lowPrice(new BigDecimal("438.00")).changePercent(new BigDecimal("1.32")).build(),
                Stock.builder().symbol("SBIN").name("State Bank of India").currentPrice(new BigDecimal("625.90")).previousClose(new BigDecimal("638.20")).openPrice(new BigDecimal("635.00")).highPrice(new BigDecimal("640.00")).lowPrice(new BigDecimal("623.00")).changePercent(new BigDecimal("-1.93")).build(),
                Stock.builder().symbol("ADANIENT").name("Adani Enterprises").currentPrice(new BigDecimal("2890.40")).previousClose(new BigDecimal("2811.90")).openPrice(new BigDecimal("2820.00")).highPrice(new BigDecimal("2900.00")).lowPrice(new BigDecimal("2810.00")).changePercent(new BigDecimal("2.79")).build(),
                Stock.builder().symbol("TATAMOTORS").name("Tata Motors").currentPrice(new BigDecimal("785.20")).previousClose(new BigDecimal("769.60")).openPrice(new BigDecimal("770.00")).highPrice(new BigDecimal("790.00")).lowPrice(new BigDecimal("768.00")).changePercent(new BigDecimal("2.03")).build(),
                Stock.builder().symbol("AXISBANK").name("Axis Bank").currentPrice(new BigDecimal("1095.75")).previousClose(new BigDecimal("1114.15")).openPrice(new BigDecimal("1110.00")).highPrice(new BigDecimal("1118.00")).lowPrice(new BigDecimal("1092.00")).changePercent(new BigDecimal("-1.65")).build(),
                Stock.builder().symbol("MARUTI").name("Maruti Suzuki").currentPrice(new BigDecimal("12450.30")).previousClose(new BigDecimal("12204.50")).openPrice(new BigDecimal("12220.00")).highPrice(new BigDecimal("12480.00")).lowPrice(new BigDecimal("12200.00")).changePercent(new BigDecimal("2.01")).build(),
                Stock.builder().symbol("SUNPHARMA").name("Sun Pharma").currentPrice(new BigDecimal("1678.50")).previousClose(new BigDecimal("1645.60")).openPrice(new BigDecimal("1650.00")).highPrice(new BigDecimal("1685.00")).lowPrice(new BigDecimal("1645.00")).changePercent(new BigDecimal("2.00")).build(),
                Stock.builder().symbol("LT").name("Larsen & Toubro").currentPrice(new BigDecimal("3520.80")).previousClose(new BigDecimal("3566.00")).openPrice(new BigDecimal("3560.00")).highPrice(new BigDecimal("3570.00")).lowPrice(new BigDecimal("3515.00")).changePercent(new BigDecimal("-1.27")).build(),
                Stock.builder().symbol("TITAN").name("Titan Company").currentPrice(new BigDecimal("3245.60")).previousClose(new BigDecimal("3177.20")).openPrice(new BigDecimal("3180.00")).highPrice(new BigDecimal("3255.00")).lowPrice(new BigDecimal("3175.00")).changePercent(new BigDecimal("2.15")).build(),
                Stock.builder().symbol("ASIANPAINT").name("Asian Paints").currentPrice(new BigDecimal("2890.20")).previousClose(new BigDecimal("2925.90")).openPrice(new BigDecimal("2920.00")).highPrice(new BigDecimal("2930.00")).lowPrice(new BigDecimal("2885.00")).changePercent(new BigDecimal("-1.22")).build()
            );
            stockRepository.saveAll(stocks);
        }
    }
}
