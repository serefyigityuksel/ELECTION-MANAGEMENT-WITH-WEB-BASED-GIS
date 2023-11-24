import React, {useState, useEffect} from 'react';

function GetData() {
    const [merchants, setMerchants] = useState(false);
   useEffect(() => {
    getMerchant();
  }, []);
  
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data)
        setMerchants(data);
      });
  }
  
  return (
    <div>
      {merchants ? merchants : 'There is no data available'}
    </div>
  );
}

export default GetData



  

