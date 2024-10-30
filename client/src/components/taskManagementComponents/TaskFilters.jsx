import React from 'react';

const TaskFilters = ({
    searchTitle,
    selectedStatus,
    sortOrder,
    pageSize,
    handleSearchChange,
    handleStatusChange,
    handleSortOrderChange,
    handlePageSizeChange,
    pageSizes
}) => {
    return (
        <div className="row mt-4">
            {/* Search Input - Full Width on Mobile */}
            <div className="col-6 col-md-6 mb-3 mb-md-0">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={handleSearchChange}
                    className="form-control"
                />
            </div>

            {/* Dropdown Filters - Stack on Mobile */}
            <div className="col-6 col-md-2 mb-3 mb-md-0">
                <select value={selectedStatus} onChange={handleStatusChange} className="form-control">
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="col-6 col-md-2 mb-3 mb-md-0">
                <select value={sortOrder} onChange={handleSortOrderChange} className="form-control">
                    <option value="desc">Sort Descending</option>
                    <option value="asc">Sort Ascending</option>
                </select>
            </div>

            <div className="col-6 col-md-2">
                <select value={pageSize} onChange={handlePageSizeChange} className="form-control">
                    {pageSizes.map(size => (
                        <option key={size} value={size}>{size} per page</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TaskFilters;
