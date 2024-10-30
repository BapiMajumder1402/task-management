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
        <div className="d-flex justify-content-between mt-4">
            <input
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={handleSearchChange}
                className="form-control"
            />
            <select value={selectedStatus} onChange={handleStatusChange} className="form-control mx-2">
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <select value={sortOrder} onChange={handleSortOrderChange} className="form-control mx-2">
                <option value="desc">Sort Descending</option>
                <option value="asc">Sort Ascending</option>
            </select>
            <select value={pageSize} onChange={handlePageSizeChange} className="form-control mx-2">
                {pageSizes.map(size => (
                    <option key={size} value={size}>{size} per page</option>
                ))}
            </select>
        </div>
    );
};

export default TaskFilters;
