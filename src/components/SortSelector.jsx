const SortSelector = ({ sortBy, onSortChange }) => {
    return (
        <div className="controls">
            <label htmlFor="sort">Sort By:</label>
            <select name="" id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                <option value="market_cap_desc">Market capitilisation(from high to low)</option>
                <option value="price_desc">Price(from high to low) </option>
                <option value="price_asc">Price(from low to high)</option>
                <option value="change_desc">Change 24h(from high to low)</option>
                <option value="change_asc">Change 24h(from low to high)</option>
            </select>
        </div>
    )
}

export default SortSelector