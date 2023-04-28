import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import PropertyService from "../../services/PropertyService";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  dateFormatter,
  propertyCodeFormatter,
} from "../../services/Formatters";

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const columnDefs = [
  {
    field: "",
    headerName: "Nº Lançamento",
    valueFormatter: propertyCodeFormatter,
    width: 148,
    flex: 0,
  },
  { field: "", headerName: "Descrição" },
  {
    field: "",
    headerName: "Data",
    valueFormatter: dateFormatter,
    width: 160,
    flex: 0,
  },
  { field: "", headerName: "Crédito", width: 130, flex: 0 },
  { field: "", headerName: "Débito", width: 130, flex: 0 },
];

const CashierMovimentationTable = ({
  setSelected,
  deleteCallback,
}: {
  setSelected?: any;
  deleteCallback?: any;
}) => {
  const [data, setData] = useState([]);
  const gridRef = useRef<any>(null);

  const onGridReady = async () => {
    setData(await PropertyService.getData());
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
