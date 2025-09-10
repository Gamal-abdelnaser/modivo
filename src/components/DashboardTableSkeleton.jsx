import { Box, Skeleton, Table } from '@chakra-ui/react';
import React from 'react';

const DashboardTableSkeleton = ({ rows = 5, cells = 6 }) => {
  const getCellProps = (index) => {
    const isButton = index >= cells - 2; // Last 2 columns for buttons
    return {
      height: isButton ? '5' : '2',
      width: '10',
      bg: isButton ? (index === cells - 2 ? 'red.400' : 'blue.400') : undefined,
    };
  };

  return (
    <Box maxW={'85%'}>
      <Table.Root size="sm" bg="none" striped>
        <Table.Body>
          {[...Array(rows)].map((_, rowIdx) => (
            <Table.Row key={rowIdx} bg="none">
              {[...Array(cells)].map((_, cellIdx) => (
                <Table.Cell key={cellIdx} p={2} textAlign={cellIdx >= cells - 2 ? 'end' : 'left'}>
                  <Skeleton {...getCellProps(cellIdx)} />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default DashboardTableSkeleton;
