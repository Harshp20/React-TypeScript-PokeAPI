interface Props {
  isPrevPageAvailable: boolean;
  isNextPageAvailable: boolean;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

const Pagination: React.FC<Props> = ({
  isPrevPageAvailable,
  isNextPageAvailable,
  goToPreviousPage,
  goToNextPage,
}) => {
  return (
    <>
      {isPrevPageAvailable && <button onClick={goToPreviousPage}>Previous</button>}
      {isNextPageAvailable && <button onClick={goToNextPage}>Next</button>}
    </>
  );
};

export default Pagination;
