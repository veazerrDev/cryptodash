import { useEffect, useState } from "react"
const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"

const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Don´t get data")
        }
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setCoins(data)
        // setLoading(false)
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message)
        // setLoading(false)
      })
      .finally(() => {
        setLoading(false)
        console.log(loading);
      })
  }, [])

  return (
    <div>
      <h1>🚀CryptoDash</h1>
    </div>
  )
}

export default App