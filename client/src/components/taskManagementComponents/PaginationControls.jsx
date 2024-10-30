import React from 'react';
import { Button } from 'react-bootstrap';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination mt-4">
            <Button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
};

export default PaginationControls;
