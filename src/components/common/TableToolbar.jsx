import { FaSearch } from "react-icons/fa";

export default function TableToolbar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  total,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body">

        <div className="row g-3 align-items-center">

          <div className="col-lg-5">

            <div className="input-group">

              <span className="input-group-text">
                <FaSearch />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search minerals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          <div className="col-lg-3">

            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >

              <option value="">All Categories</option>

              <option>Coal</option>

              <option>Copper</option>

              <option>Gypsum</option>

              <option>Marble</option>

              <option>Limestone</option>

              <option>Other</option>

            </select>

          </div>

          <div className="col-lg-2">

            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >

              <option value="">All Status</option>

              <option>Published</option>

              <option>Draft</option>

            </select>

          </div>

          <div className="col-lg-2 text-end">

            <strong>Total : {total}</strong>

          </div>

        </div>

      </div>
    </div>
  );
}