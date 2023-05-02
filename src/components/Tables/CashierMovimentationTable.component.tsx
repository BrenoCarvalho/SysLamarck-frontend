import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import PropertyService from "../../services/PropertyService";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  dateFormatter,
  propertyCodeFormatter,
} from "../../services/Formatters";
import MovimentationService from "../../services/cashier/Movimentation";

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
    field: "date",
    headerName: "Data",
    valueFormatter: dateFormatter,
    width: 160,
    flex: 0,
  },
  { field: "credit", headerName: "Crédito", width: 130, flex: 0 },
  { field: "debit", headerName: "Débito", width: 130, flex: 0 },
];

const CashierMovimentationTable = ({
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
    setData(await MovimentationService.getData());
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

export default CashierMovimentationTable;
