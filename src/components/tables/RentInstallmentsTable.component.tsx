import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef } from "react";
import { currencyFormatter, dateFormatter } from "../../services/formatters";
import { FaClock } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiCheckBadge } from "react-icons/hi2";

const statusIcons: any = {
  Dv: (
    <Flex w="100%" h="100%" align="center" paddingLeft="6px">
      <FaClock fontSize="22px" color="orange" />
    </Flex>
  ),
  Pg: (
    <Flex w="100%" h="100%" align="center" paddingLeft="6px">
      <BsFillCheckCircleFill fontSize="22px" color="green" />
    </Flex>
  ),
  Ca: (
    <Flex w="100%" h="100%" align="center" paddingLeft="3px">
      <HiCheckBadge fontSize="28px" color="purple" />
    </Flex>
  ),
};

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const columnDefs = [
  {
    field: "currentInstallment",
    width: 120,
    flex: 0,
    headerName: "Nº Parcela",
  },
  {
    field: "referenceMonth",
    headerName: "Mês referência",
    width: 160,
    flex: 1,
  },
  {
    field: "dueDate",
    headerName: "Data vencimento",
    valueFormatter: dateFormatter,
    width: 160,
    flex: 1,
  },
  {
    field: "amount",
    headerName: "Valor",
    width: 140,
    flex: 1,
    valueFormatter: currencyFormatter,
  },
  {
    field: "status",
    headerName: "Status",
    cellRenderer: ({ value }: { value: string }) => {
      return statusIcons[value];
    },
    width: 100,
    flex: 1,
  },
];

const RentInstallmentsTable = ({
  setSelected,
  data,
}: {
  setSelected?: any;
  data: [];
}) => {
  const gridRef = useRef<any>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef?.current?.api.getSelectedRows();
    setSelected(selectedRows.length === 1 ? selectedRows[0] : {});
  }, [setSelected]);

  return (
    <Flex h="100%">
      <div
        className="ag-theme-alpine customStyle"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColumnData}
          columnDefs={columnDefs}
          rowData={data}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </Flex>
  );
};

export default RentInstallmentsTable;
