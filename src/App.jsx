import { use, useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

import HomePage from "./pages/Home"
import AboutPage from "./pages/about"
import NotFound from "./pages/notFound"
import CoinDetailsPage from "./pages/coindetails"
import Header from "./components/Header"

const API_URL = import.meta.env.VITE_COINS_API_URL

const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState("market_cap_desc")

  // useEffect( async () => {
  //   const response = await fetch(API_URL)
  // }, [])
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`)
        if (!res.ok) {
          throw new Error("Didn´t get data")
        }
        const data = await res.json()
        setCoins(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
        console.log(loading);

      }
    }
    fetchCoins()
  }, [limit])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <HomePage
            coins={ coins }
            filter={ filter }
            limit={ limit }
            loading={ loading }
            error={ error }
            sortBy={ sortBy }
            setLimit={ setLimit }
            setFilter={ setFilter }
            setSortBy={ setSortBy }
          />
        } />
        <Route path="/about" element={
          <AboutPage />
        } />
        <Route path="/coin/:id" element={
          <CoinDetailsPage />
        }/>


        <Route path="*" element={
          <NotFound />
        }/>
      </Routes>
    </>
  )
}

export default App