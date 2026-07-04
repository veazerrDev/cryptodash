import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale } from "chart.js"
import "chartjs-adapter-date-fns"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale)

const CoinChart = ({ coinId }) => {
    const [chartData, setChartData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`)
                const data = await res.json()
                const prices = data.prices.map((price) => ({
                    x: price[0],
                    y: price[1].toFixed(2)
                }))

                setChartData({
                    dataset: [
                        {
                            label: "Price in USD",
                            data: prices,
                            borderColor: "rgba(75, 190, 190, 0.9)",
                            backgroundColor: "rgba(75, 190, 190, 0.2)",
                            pointRadius: 0,
                            tension: 0.3,
                            filled: true
                        }
                    ]
                })
            }
            catch (error) {
                console.error("Error fetching chart data:", error)
            } finally {
                setLoading(false)

            }
        }
        fetchChartData()
    }, [coinId])
    if (loading) {
        return <div>Loading chart...</div>
    }
    return (
        <div>
            <Line
                data={ chartData }
                options={ {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                        },

                    },
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day"
                            },
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 7,
                            }
                        },
                        y: {
                            ticks: {
                                callback: (value) => `$ ${value.toLocaleString()}`
                            }
                        }
                    }
                } }
            />

        </div>
    )
}

export default CoinChart