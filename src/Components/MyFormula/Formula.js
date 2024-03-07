import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axiosConfig";

const StockAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [stockName, setStockName] = useState('');
  const [rapidGrowRate, setRapidGrowRate] = useState('');
  const [permanentGrowRate, setPermanentGrowRate] = useState('');
  const [customizedYear, setCustomizedYear] = useState('');
  const navigate = useNavigate();
  const [stockData, setStockData] = useState(null);

  const backHome = () => {
    navigate("/");
  };

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const requestBody = {
        rapidGrowRate: rapidGrowRate,
        permanentGrowRate: permanentGrowRate,
        customizedYear: customizedYear
      };
      const response = await api.post(`/dfcApi/ev_value/${stockName}`, requestBody);
      setStockData(response.data); // Set the fetched data

      
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
    setLoading(false);
  };

  console.log("得到", stockData)

  return (
    <div>
      <div className='pt-5'></div>
      <div className='row justify-content-center'>
        <div className='col-md-4'>
          <input
            type="text"
            placeholder="Enter input1"
            value={rapidGrowRate}
            onChange={(e) => setRapidGrowRate(e.target.value)}
          />
        </div>
        <div className='col-md-4'>
          <input
            type="text"
            placeholder="Enter input2"
            value={permanentGrowRate}
            onChange={(e) => setPermanentGrowRate(e.target.value)}
          />
        </div>
        <div className='col-md-4'>
          <input
            type="text"
            placeholder="Enter input3"
            value={customizedYear}
            onChange={(e) => setCustomizedYear(e.target.value)}
          />
        </div>
      </div>
      
      <div className='pt-5'></div>

      <div>
        <input
          type="text"
          placeholder="Enter stock name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
      </div>

      <div className='pt-5'></div>
      <button onClick={fetchStockData}>輸入</button>

      <div className='pt-5'></div>
      {loading && <p>Loading...</p>}

      {
  stockData && (
    <div>
      {Object.entries(stockData).map(([key, value], index) => {
        if (key === 'WACC') return null; // Skip rendering WACC for now
        if (key === 'V_value') return null; // Skip rendering V_value for now
        if (key === 'EV') return null; // Skip rendering V_value for now
        return (
          <div key={index}>
            {key}: {value}
          </div>
        );
      })}
      <div className='pt-5'></div>
      {stockData['WACC'] && (
        <div>
          以上能算出 WACC: {stockData['WACC']}
        </div>
      )}

      <div className='pt-5'></div>
      {stockData['V_value'] && (
        <div>
          接著再算出 V_value （終值）: {stockData['V_value']}
        </div>
      )}

      <div className='pt-5'></div>
      {stockData['EV'] && (
        <div>
          再來能算出EV（企業價值）: {stockData['EV']}
        </div>
      )}
    </div>
  )
}



      <div className='pt-5'></div>

      
       


      <div className='pt-5'></div>
      <div>
        <button type="button" onClick={backHome}>返回首頁</button>
      </div>
    </div>
  );
};

export default StockAnalyzer;
