import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { currencyFormatter, dateFormatter } from "../../services/Formatters";
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
    field: "contractCode",
    headerName: "Nº Contrato",
    width: 127,
    flex: 0,
  },
  { field: "installmentNumber", width: 120, flex: 0, headerName: "Nº Parcela" },
  {
    field: "dueDate",
    headerName: "Data vencimento",
    valueFormatter: dateFormatter,
    width: 160,
    flex: 0,
  },
  {
    field: "installmentValue",
    headerName: "Valor Parcela",
    width: 140,
    flex: 0,
    valueFormatter: currencyFormatter,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    flex: 0,
  },
];

const RentMovimentationTable = ({
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
          onGridReady={onGridReady}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </Flex>
  );
};

export default RentMovimentationTable;
