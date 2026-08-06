import "./MuseumFilters.css";

const MuseumFilters = () => {

    return (
        <div className="museum-filters">
            <input
                type="text"
                placeholder="Search artworks..."
            />
            <select>
                <option>All Challenges</option>
            </select>
            <select>
                <option>Most Voted</option>
                <option>Newest</option>
                <option>Oldest</option>
            </select>
        </div>
    );
};

export default MuseumFilters;