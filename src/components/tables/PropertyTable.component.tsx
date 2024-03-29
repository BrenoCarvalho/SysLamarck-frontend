import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import PropertyService from "../../services/propertyService";
import { useCallback, useEffect, useRef } from "react";
import { propertyCodeFormatter } from "../../services/formatters";
import { GridReadyEvent } from "ag-grid-community";

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const vacantFormatter = ({ value }: any) => {
  return value ? "Sim" : "Não";
};

const columnDefs = [
  {
    field: "propertyCode",
    headerName: "Código do imóvel",
    valueFormatter: propertyCodeFormatter,
  },
  { field: "locator.fullName", headerName: "Locador" },
  { field: "propertyType", headerName: "Tipo de imóvel" },
  { field: "goalOfProperty", headerName: "Objetivo" },
  { field: "vacant", headerName: "Vago", valueFormatter: vacantFormatter },
  { field: "address", headerName: "Endereço" },
  { field: "propertyDescription", headerName: "Descrição" },
];

const PropertyTable = ({
  setSelected,
  deleteCallback,
}: {
  setSelected: any;
  deleteCallback?: any;
}) => {
  const gridRef = useRef<any>(null);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    PropertyService.getData().then((data) => {
      params.api.setRowData(data);
    });
  }, []);

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
          onGridReady={onGridReady}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </Flex>
  );
};

export default PropertyTable;
