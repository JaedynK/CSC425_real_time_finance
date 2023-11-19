import { useEffect, useState } from 'react'
import './App.css'
import { CartesianGrid, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function App() {
   // State to toggle between forms and charts
  const [isBuyView, setIsBuyView] = useState(true); 
  // State to hold sale and spent data
  const [saleData, setSaleData] = useState([]);
  const [spentData, setSpentData] = useState([]);

  // State for new sale and spent entries
  const [newSale, setNewSale] = useState({
    sale_total: 0,
    sale_qty: 0,
    sale_item_name: '',
    emp_name: '',
  });
  const [newSpent, setNewSpent] = useState({
    spent_total: 0,
    spent_qty: 0,
    spent_item_name: '',
    category: '',
  });

  // Fetch sale data from the server
  const fetchSaleData = () => {
    axios.get('http://127.0.0.1:8000/sale/').then((response) => {
      const getSale = response.data;
      setSaleData(getSale);
      console.log(getSale)
    });
  };

  // Post new sale data to the server
  const postSaleData = () => {
    axios.post('http://127.0.0.1:8000/sale/', newSale).then((response) => {
      console.log('Sale data posted:', response.data);
      // You can update the state or perform any other actions after successful POST
      fetchSaleData();
    });
  };

  // Fetch spent data from the server
  const fetchSpentData = () => {
    axios.get('http://127.0.0.1:8000/spent/').then((response) => {
      const getSpent = response.data;
      setSpentData(getSpent);
      console.log(getSpent)
    });
  };

  // Post new spent data to the server
  const postSpentData = () => {
    axios.post('http://127.0.0.1:8000/spent/', newSpent).then((response) => {
      console.log('Spent data posted:', response.data);
      // You can update the state or perform any other actions after successful POST
      fetchSpentData()
    }).catch((error) => {
    console.error('Error posting spent data:', error);
  });
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchSaleData();
    fetchSpentData();
  }, []);

  // Toggle between Sale and Spent views
  const handleButtonClick = () => {
    setIsBuyView(!isBuyView);
  };

    return (
      <div className="App">
      <Button onClick={handleButtonClick} variant="success">
        {isBuyView ? 'Sold' : 'Spent'}
      </Button>

      {isBuyView ? (
        // Buy view
        <>
          <BarChart width={730} height={250} data={saleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sale_item_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sale_qty" fill="#8884d8" />
            <Bar dataKey="sale_total" fill="#82ca9d" />
          </BarChart>

            {/* Sale Form */}
            <form
            onSubmit={(e) => {
              e.preventDefault();
              postSaleData();
            }}
          >
            <label>
              Sale Total:
              <input
                type="number"
                value={newSale.sale_total}
                onChange={(e) => setNewSale({ ...newSale, sale_total: e.target.value })}
              />
            </label>
            <label>
              Sale Quantity:
              <input
                type="number"
                value={newSale.sale_qty}
                onChange={(e) => setNewSale({ ...newSale, sale_qty: e.target.value })}
              />
            </label>
            <label>
              Item Name:
              <input
                type="text"
                value={newSale.sale_item_name}
                onChange={(e) => setNewSale({ ...newSale, sale_item_name: e.target.value })}
              />
            </label>
            <label>
              Employee Name:
              <input
                type="text"
                value={newSale.emp_name}
                onChange={(e) => setNewSale({ ...newSale, emp_name: e.target.value })}
              />
            </label>
            <button type="submit">Add Sale</button>
          </form>
        </>
      ) : (
        <>
        {/* Spent view */}
          <BarChart width={730} height={250} data={spentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="spent_item_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="spent_qty" fill="#ff0000" />
            <Bar dataKey="spent_total" fill="#0000ff" />
          </BarChart>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              postSpentData();
            }}
          >
            <label>
              Total Spent:
              <input
                type="number"
                value={newSpent.spent_total}
                onChange={(e) => setNewSpent({ ...newSpent, spent_total: e.target.value })}
              />
            </label>
            <label>
              Spent Quantity:
              <input
                type="number"
                value={newSpent.spent_qty}
                onChange={(e) => setNewSpent({ ...newSpent, spent_qty: e.target.value })}
              />
            </label>
            <label>
              Item Name:
              <input
                type="text"
                value={newSpent.spent_item_name}
                onChange={(e) => setNewSpent({ ...newSpent, spent_item_name: e.target.value })}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={newSpent.category}
                onChange={(e) => setNewSpent({ ...newSpent, category: e.target.value })}
              />
            </label>
            <button type="submit">Add Spent</button>
          </form>
            {/* Spent Form */}
        </>
      )}
    </div>
  );
};

export default App
