const dateFormatter = ({ value }: { value: any }) => {
  const splited_date = value?.slice(0, 10)?.split("-");

  return splited_date?.length
    ? `${splited_date[2]}/${splited_date[1]}/${splited_date[0]}`
    : "";
};
const cpfFormatter = ({ value }: { value: any }) => {
  if (value?.indexOf(".") === -1) {
    if (value?.length <= 11) {
      return value?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      return value?.replace(/(\d{2})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-");
    }
  }

  return value;
};

const timeFormatter = ({ value }: { value: any }) => {
  return value.split("T")[1].split(".")[0];
};

const transactionTypeFormatter = ({ value }: { value: any }) => {
  return value === "credit" ? "Crédito" : "Débito";
};

// const rgFormatter = ({ value }: { value: any }) => {
//   return value?.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
// };

const phoneFormatter = ({ value }: { value: any }) => {
  return value?.replace(
    value?.length <= 10 ? /(\d{2})(\d{4})/ : /(\d{2})(\d{5})/,
    "$1 $2-"
  );
};

const cepFormatter = ({ value }: { value: any }) => {
  return value?.replace(value?.length <= 8 ? /(\d{5})/ : /(\d{6})/, "$1-");
};

const propertyCodeFormatter = ({ value }: { value: string }) => {
  return value?.replace(/(\d{3})/, "$1/");
};

const installmentStatusFormatter = ({ value }: { value: string }) => {
  const statusNames: any = {
    Pg: "Pago",
    Dv: "Aguardando pagamento",
    Ca: "Carência",
  };

  return statusNames[value];
};

const currencyFormatter = ({ value }: { value: any }) => {
  if (!value) {
    return "R$ 0,00";
  }

  const formatter = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return formatter?.format(value) || ("" as any);
};

export {
  dateFormatter,
  cpfFormatter,
  phoneFormatter,
  cepFormatter,
  propertyCodeFormatter,
  currencyFormatter,
  transactionTypeFormatter,
  installmentStatusFormatter,
  timeFormatter,
};
