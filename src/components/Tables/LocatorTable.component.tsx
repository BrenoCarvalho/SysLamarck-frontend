import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import LocatorService from "../../services/LocatorService";
import { useCallback, useEffect, useRef, useState } from "react";

const defaultColumnData = {
  flex: 1,
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
};

const dateFormatter = ({ value }: { value: any }) => {
  const splited_date = value.split("-");
  return `${splited_date[2]}/${splited_date[1]}/${splited_date[0]}`;
};

const cpfFormatter = ({ value }: { value: any }) => {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const rgFormatter = ({ value }: { value: any }) => {
  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
};

const columnDefs = [
  { field: "locatorCode", headerName: "Código", width: 98, flex: 0 },
  { field: "fullName", headerName: "Nome" },
  { field: "provisionService", headerName: "Prestação de serviço" },
  {
    field: "birthDate",
    headerName: "Data de nascimento",
    valueFormatter: dateFormatter,
  },
  { field: "email", headerName: "Email" },
  {
    field: "cpf",
    headerName: "CPF",
    flex: 0,
    width: 140,
    valueFormatter: cpfFormatter,
  },
  {
    field: "rg",
    headerName: "RG",
    flex: 0,
    width: 140,
    valueFormatter: rgFormatter,
  },
];

const LocatorTable = ({
  service,
  setSelected,
  deleteCallback,
}: {
  service: LocatorService;
  setSelected: any;
  deleteCallback?: any;
}) => {
  const [data, setData] = useState([]);
  const gridRef = useRef<any>(null);

  const onGridReady = async (params: any) => {
    setData(await service.getData());
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
