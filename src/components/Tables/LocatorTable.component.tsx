import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import LocatorService from "../../services/LocatorService";
import { useCallback, useEffect, useRef, useState } from "react";
import { cpfFormatter, dateFormatter } from "../../services/Formatters";

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const columnDefs = [
  { field: "id", headerName: "Código", width: 98, flex: 0 },
  { field: "fullName", headerName: "Nome" },
  { field: "provisionService", headerName: "Prestação de serviço" },
  {
    field: "birthDate",
    headerName: "Data de nascimento",
    valueFormatter: dateFormatter,
  },
  { field: "contact1", headerName: "Contato 1" },
  {
    field: "cpf",
    headerName: "CPF / CNPJ",
    flex: 0,
    width: 160,
    valueFormatter: cpfFormatter,
  },
  {
    field: "rg",
    headerName: "RG",
    flex: 0,
    width: 140,
  },
];

const LocatorTable = ({
  setSelected,
  deleteCallback,
}: {
  setSelected: any;
  deleteCallback?: any;
}) => {
  const [data, setData] = useState([]);
  const gridRef = useRef<any>(null);

  const onGridReady = async () => {
    setData(await LocatorService.getData());
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

export default LocatorTable;
