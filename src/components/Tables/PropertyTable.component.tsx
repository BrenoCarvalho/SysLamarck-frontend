import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import PropertyService from "../../services/PropertyService";
import { useCallback, useEffect, useRef, useState } from "react";
import { propertyCodeFormatter } from "../../services/Formatters";

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const columnDefs = [
  {
    field: "propertyCode",
    headerName: "Código do imóvel",
    valueFormatter: propertyCodeFormatter,
  },
  { field: "locatorName", headerName: "Locador" },
  { field: "propertyType", headerName: "Tipo de imóvel" },
  { field: "city", headerName: "Cidade" },
  { field: "address", headerName: "Endereço" },
  { field: "goalOfProperty", headerName: "Objetivo" },
  { field: "propertyDescription", headerName: "Descrição" },
];

const PropertyTable = ({
  setSelected,
  deleteCallback,
}: {
  setSelected: any;
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

export default PropertyTable;
