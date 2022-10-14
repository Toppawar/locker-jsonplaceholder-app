import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Flex,
  useColorModeValue,
  Text,
  TableCaption,
  Heading,
} from '@chakra-ui/react';

import { BiFirstPage, BiLastPage } from "react-icons/bi";

import { GrNext, GrPrevious } from "react-icons/gr";

import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

import usePagination from '../../hooks/usePagination';

const ArrowOrder = ({ isOrdered, order }) => {
  if (!isOrdered) {
    return null;
  }

  return order === "asc"
    ? (<AiOutlineSortAscending style={{ height: "20px", width: "20px" }} />)
    : (<AiOutlineSortDescending style={{ height: "20px", width: "20px" }} />);
};

const Table = ({
  data = [],
  header = [],
  onOrder,
  paginated,
  pageSize,
  onRowClick,
  orderBy,
  fieldsToOrder = []
}) => {
  const {
    page,
    currentPage,
    pages,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    firstPage,
    lastPage
  } = usePagination({
    data,
    pageSize: paginated ? pageSize : data.length
  });

  const handleDoubleClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleOrder = (columnHeaderName) => {
    if (onOrder && fieldsToOrder.includes(columnHeaderName)) {
      onOrder(columnHeaderName);
    }
  };

  return (
    <TableContainer>
      <ChakraTable variant="simple">
        {!page.length ? (
          <TableCaption>
            <Heading size="md">
              No data to load
            </Heading>
          </TableCaption>
        ) : null}
        <Thead>
          <Tr>
            {header.map((columnHeader) => {
              const isOrdered = orderBy?.header === columnHeader;
              return (
                <Th key={`${columnHeader}`} cursor="pointer" onClick={() => { return handleOrder(columnHeader); }}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>
                      {columnHeader}
                    </Text>
                    <ArrowOrder isOrdered={isOrdered} order={orderBy?.order} />
                  </Flex>
                </Th>
              );
            })}
          </Tr>

        </Thead>
        <Tbody>
          {page.length ? page.map((row, rowIndex) => {
            const fields = Object.values(row);
            return (
              <Tr
                cursor="pointer"
                _hover={{ opacity: "0.9", boxShadow: "1.5px 2px 1.5px #ccc" }}
                key={`${rowIndex + 1}`}
                onDoubleClick={() => { return handleDoubleClick(row); }}
              >
                {fields.map((field, index) => {
                  return (
                    <Td key={`${field}-${index + 1}`}>{field}</Td>
                  );
                })}
              </Tr>
            );
          }) : null}
        </Tbody>
      </ChakraTable>
      {paginated ? (
        <Flex mt="3" width="100%" justifyContent="center" alignItems="center">
          <IconButton
            onClick={firstPage}
            ml="2"
            mr="2"
            disabled={!canPreviousPage}
            backgroundColor={useColorModeValue("gray.300", "gray.700")}
            icon={(
              <BiFirstPage
                style={{
                  height: "1.75rem",
                  width: "1.75rem"
                }}
              />
)}
          />
          <IconButton
            ml="2"
            mr="2"
            backgroundColor={useColorModeValue("gray.300", "gray.700")}
            disabled={!canPreviousPage}
            onClick={previousPage}
            icon={<GrPrevious />}
          />
          <Flex>
            <Text>
              Page
            </Text>
            <Text ml="3" fontWeight="500">
              {currentPage + 1}
            </Text>
            <Text ml="3">
              of
            </Text>
            <Text ml="3" mr="3" fontWeight="500">
              {pages}
            </Text>
          </Flex>
          <IconButton
            ml="2"
            mr="2"
            backgroundColor={useColorModeValue("gray.300", "gray.700")}
            disabled={!canNextPage}
            onClick={nextPage}
            icon={<GrNext />}
          />
          <IconButton
            ml="2"
            mr="2"
            backgroundColor={useColorModeValue("gray.300", "gray.700")}
            onClick={lastPage}
            disabled={!canNextPage}
            icon={(
              <BiLastPage style={{
                height: "1.75rem",
                width: "1.75rem"
              }}
              />
)}
          />
        </Flex>
      ) : null}
    </TableContainer>
  );
};

export default Table;
