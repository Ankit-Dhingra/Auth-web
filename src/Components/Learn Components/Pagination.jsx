import {
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from "@remixicon/react";

const Pagination = ({ currentPage, setCurrentPage, noOfPages }) => {
  return (
    <div className="pagination-container">
      <h1 className="mt-10 gap-4 flex ">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          <RiArrowLeftDoubleLine className="text-2xl" />
        </button>
        {[...Array(noOfPages).keys()].map((page) => (
          <span
            className={`page-number border-2 border-gray-300 px-2 py-1 rounded-lg cursor-pointer ${currentPage === page + 1 ? "bg-red-400 text-white" : ""}`}
            key={page}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </span>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, noOfPages))
          }
        >
          <RiArrowRightDoubleLine className="text-2xl" />
        </button>
      </h1>
    </div>
  );
};

export default Pagination;
