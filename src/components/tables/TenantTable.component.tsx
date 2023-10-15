import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef } from "react";
import { propertyCodeFormatter, cpfFormatter } from "../../services/formatters";
import TenantService from "../../services/tenantService";
import { GridReadyEvent } from "ag-grid-community";

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const columnDefs = [
  {
    field: "property.propertyCode",
    headerName: "Código do locatário",
    valueFormatter: propertyCodeFormatter,
  },
  { field: "fullName", headerName: "Nome" },
  {
    field: "contact1",
    headerName: "Contato 1 (Locatário)",
  },
  { field: "rg", headerName: "RG" },
  { field: "cpf", headerName: "CPF / CNPJ", valueFormatter: cpfFormatter },
];

const TenantTable = ({
  setSelected,
  deleteCallback,
}: {
  setSelected: any;
  deleteCallback?: any;
}) => {
  const gridRef = useRef<any>(null);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    TenantService.getData().then((data) => {
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

export default TenantTable;
