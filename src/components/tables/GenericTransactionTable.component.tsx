import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  currencyFormatter,
  dateFormatter,
  transactionTypeFormatter,
} from "../../services/formatters";
import TransactionService from "../../services/transactionService";

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const columnDefs = [
  {
    field: "id",
    headerName: "Nº Lançamento",
    width: 148,
    flex: 0,
  },
  { field: "description", headerName: "Descrição" },
  {
    field: "createdAt",
    headerName: "Data",
    valueFormatter: dateFormatter,
    width: 160,
    flex: 0,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 130,
    flex: 0,
    valueFormatter: transactionTypeFormatter,
  },
  {
    field: "amount",
    headerName: "Valor",
    width: 130,
    flex: 0,
    valueFormatter: currencyFormatter,
  },
];

const GenericTransactionTable = ({
  setSelected,
  deleteCallback,
  refreshTrigger,
}: {
  setSelected?: any;
  deleteCallback?: any;
  refreshTrigger?: any;
}) => {
  const [data, setData] = useState([]);
  const gridRef = useRef<any>(null);

  const onGridReady = async () => {
    setData(await TransactionService.getTransactions("generic"));
  };

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef?.current?.api.getSelectedRows();
    setSelected(selectedRows.length === 1 ? selectedRows[0] : {});
  }, [setSelected]);

  useEffect(() => {
    const selectedData = gridRef?.current?.api?.getSelectedRows();
    gridRef?.current?.api?.applyTransaction({
      remove: selectedData,
    });
  }, [deleteCallback]);

  useEffect(() => {
    if (refreshTrigger) {
      onGridReady();
    }
  }, [refreshTrigger]);

  return (
    <Flex h="100%">
      <div
        className="ag-theme-alpine customStyle"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColumnData}
          columnDefs={columnDefs}
          rowData={data}
          onGridReady={onGridReady}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </Flex>
  );
};

export default GenericTransactionTable;
