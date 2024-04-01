import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const Stock = () => {
  const [stockChartXValues, setStockChartXValues] = useState<string[]>([]);
  const [stockChartYValues, setStockChartYValues] = useState<number[]>([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = () => {
    const API_KEY: string = 'RIBXT3XYLI69PC0Q';
    const StockSymbol: string = 'IBM';
    let API_CALL: string = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    
    fetch(API_CALL)
      .then(response => response.json())
      .then((data) => {
        const xValuesFunction: string[] = [];
        const yValuesFunction: number[] = [];
        for (var key in data['Time Series (Daily)']) {
          xValuesFunction.push(key);
          yValuesFunction.push(parseFloat(data['Time Series (Daily)'][key]['1. open']));
        }
        setStockChartXValues(xValuesFunction);
        setStockChartYValues(yValuesFunction);
      });
  };

  // JSX code with TailwindCSS classes
  return (
    <div className="stock-container">
       <h1>Stock</h1>
       <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'The Plot'}}
        />
    </div>
  );
};

export default Stock;
