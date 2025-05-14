import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <PaginationButton 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </PaginationButton>
      
      {pageNumbers.map((number) => (
        <PageNumber 
          key={number}
          isActive={currentPage === number}
          onClick={() => onPageChange(number)}
        >
          {number}
        </PageNumber>
      ))}
      
      <PaginationButton 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.disabled ? '#e0d8ca' : '#3c2415'};
  color: ${props => props.disabled ? '#999' : '#fff'};
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: #59372a;
  }
`;

const PageNumber = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isActive ? '#3c2415' : 'transparent'};
  color: ${props => props.isActive ? '#fff' : '#3c2415'};
  border: 1px solid ${props => props.isActive ? '#3c2415' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? '#3c2415' : '#f4f1ea'};
  }
`;

export default Pagination;