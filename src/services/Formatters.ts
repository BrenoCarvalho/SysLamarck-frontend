const dateFormatter = ({ value }: { value: any }) => {
  const splited_date = value?.split("-");
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

const currencyFormatter = ({ value }: { value: any }) => {
  if (!value) {
    return;
  }

  if (value.indexOf(".") !== -1) {
    value = value.replace(".", ",");
  }

  value = "R$" + value.replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, "$1.");

  if (value.indexOf(",") === -1) return value + ",00";

  var decimals = value.split(",")[1];

  return decimals.length < 2 ? value + "0" : value;
};

export {
  dateFormatter,
  cpfFormatter,
  phoneFormatter,
  cepFormatter,
  propertyCodeFormatter,
  currencyFormatter,
};
