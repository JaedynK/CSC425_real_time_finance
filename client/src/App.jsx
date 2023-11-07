import { useEffect, useState } from 'react'
import './App.css'
import { CartesianGrid, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function App() {
  // const [sale, setSales] = useState([])
  const [saleData, setSaleData] = useState([]);

  const fetchSaleData = () => {
    axios.get('http://127.0.0.1:8000/sale/').then((response) => {
      const newData = response.data;
      setSaleData(newData);
      console.log(newData)
    });
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchSaleData();
  }, []);

    return (
    <div className="App">

<Button onClick={()=>{fetchSaleData()}} variant="success">Success</Button>

      <BarChart width={730} height={250} data={saleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}

export default App
