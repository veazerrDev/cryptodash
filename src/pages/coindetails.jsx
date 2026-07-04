import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import CoinChart from "../components/CoinChart"

const API_URL = import.meta.env.VITE_COIN_API_URL

const CoinDetailsPage = () => {
    const { id } = useParams()
    const [coin, setCoin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`)
                if (!res.ok) {
                    throw new Error("Fail to fetch coin data")
                }
                const data = await res.json()
                setCoin(data)
                console.log(data);
            } catch (error) {
                setError(error.message)
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCoin()
    }, [id])
    return (
        <div className="coin-details-container">
            <Link to="/">Back to home</Link>
            <h1 className="coin-details-title">{ coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin details" }</h1>
            {/* { loading && <p>Loading...</p> } */ }
            { loading && <Loader /> }
            { error && (
                <div className="error">
                    <p>❌ { error }</p>
                </div>
            ) }
            <CoinChart coinId={ id } />
            {
                !loading && !error && coin && (
                    <>
                        <img src={ coin.image.large } alt={ coin.name } className="coin-details-image" />
                        <h2 className="coin-price">${ coin.market_data.current_price.usd }</h2>
                        <div className="coin-details-info">
                            <ul className="coin-stats-list">
                                <li className="coin-stats-item">
                                    <p>Rank: { coin.market_cap_rank != null ? `#${coin.market_cap_rank}` : "No data" }</p>
                                </li>
                                <li className="coin-stats-item">
                                    <p>Market cap: { coin.market_data.market_cap?.usd != null ? `$${coin.market_data.market_cap.usd.toLocaleString()}` : "No data" }</p>
                                </li>
                                <li className="coin-stats-item">
                                    <p>Fully Diluted Valuation: { coin.market_data.fully_diluted_valuation?.usd != null ? `$${coin.market_data.fully_diluted_valuation.usd.toLocaleString()}` : "No data" }</p>
                                </li>
                                <li className="coin-stats-item">
                                    <p>Total Supply: { coin.market_data.total_supply != null ? coin.market_data.total_supply.toLocaleString() : "No data" }</p>
                                </li>
                                <li className="coin-stats-item">
                                    <p>Max Supply: { coin.market_data.max_supply != null ? coin.market_data.max_supply.toLocaleString() : "No data" }</p>
                                </li>
                            </ul>
                            <p className="coin-details-description">{ coin.description.en.split(". ")[0] + "." }</p>
                            <div className="coin-details-links">
                                { coin.links.homepage[0] && (
                                    <p className=""><a href={ coin.links.homepage[0] } target="_blank" rel="noopener noreferer">Website</a></p>
                                ) }
                                { coin.links.blockchain_site[0] && (
                                    <p className=""><a href={ coin.links.blockchain_site[0] } target="_blank" rel="noopener noreferer">Blockchain explorer</a></p>
                                ) }
                            </div>
                        </div>
                    </>
                )
            }
        </div>

    )
}
export default CoinDetailsPage