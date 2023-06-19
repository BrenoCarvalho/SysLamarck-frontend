import { Flex } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  currencyFormatter,
  dateFormatter,
  timeFormatter,
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
    field: "installment.currentInstallment",
    headerName: "Nº Parcela",
    width: 148,
    flex: 0,
  },
  {
    field: "installment.contract.tenant.property.locator.fullName",
    headerName: "Locador",
    flex: 1,
  },
  {
    field: "installment.contract.tenant.fullName",
    headerName: "Locatário",
    flex: 1,
  },
  {
    field: "installment.dueDate",
    headerName: "Data Vencimento",
    valueFormatter: dateFormatter,
    flex: 1,
  },
  {
    field: "type",
    headerName: "Tipo",
    flex: 1,
    valueFormatter: transactionTypeFormatter,
  },
  {
    field: "amount",
    headerName: "Valor",
    valueFormatter: currencyFormatter,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Hora",
    valueFormatter: timeFormatter,
    flex: 1,
  },
  {
    field: "formOfPayment",
    headerName: "Forma de Pagamento",
    flex: 1,
  },
];

const RentTransactionTable = ({
  setSelected,
  readyData,
}: {
  setSelected?: any;
  readyData?: any;
}) => {
  const [data, setData] = useState([]);
  const gridRef = useRef<any>(null);

  const onGridReady = async () => {
    setData(
      await TransactionService.getTransactions({
        category: "rent",
        allRelations: true,
      })
    );
  };

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef?.current?.api.getSelectedRows();
    setSelected(selectedRows.length === 1 ? selectedRows[0] : {});
  }, [setSelected]);

  return (
    <Flex w="100%" h="100%">
      <div
        className="ag-theme-alpine customStyle"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColumnData}
          columnDefs={columnDefs}
          rowData={readyData ?? data}
          onGridReady={onGridReady}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </Flex>
  );
};

export default RentTransactionTable;
