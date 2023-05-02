import {
  Page as PagePdfRender,
  Text,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import Report from "../../services/Report";
import {
  dateFormatter,
  propertyCodeFormatter,
} from "../../services/Formatters";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://assets.recurrency.com/fonts/Inter/Inter-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://assets.recurrency.com/fonts/Inter/Inter-SemiBold.ttf",
      fontWeight: "semibold",
    },
  ],
});

const Header = () => {
  const style = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginBottom: 38,
      marginTop: "3",
    },
    text: {
      fontSize: 18,
      fontWeight: "semibold",
      fontFamily: "Inter",
      color: "gray",
      marginTop: "-6px",
    },
    img: {
      width: "132px",
      position: "absolute",
      left: "0px",
    },
  });

  return (
    <div style={style.container}>
      <Image src="./logo.jpeg" style={style.img} />
      <Text style={style.text} fixed>
        Ficha de cadastro
      </Text>
    </div>
  );
};

const Footer = () => {
  return (
    <Text
      style={{
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
      }}
      render={({ pageNumber, totalPages }: any) =>
        `${pageNumber} / ${totalPages}`
      }
    />
  );
};

const Page = ({ children }: any) => {
  return (
    <PagePdfRender
      style={{ paddingTop: 35, paddingBottom: 50, paddingHorizontal: 35 }}
    >
      <Header />
      {children}
      <Footer />
    </PagePdfRender>
  );
};

const LocatorInfo = ({ data }: any) => {
  const style = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "column",
      marginBottom: 38,
      marginTop: "3",
    },
    title: {
      width: "100%",
      textAlign: "center",
      fontSize: 15,
      fontWeight: "semibold",
      fontFamily: "Inter",
      marginTop: "-6px",
      marginBottom: "6px",
    },
    key: {
      fontSize: 11,
      fontWeight: "semibold",
      fontFamily: "Inter",
      marginTop: "-6px",
    },
    value: {
      fontSize: 11,
      fontFamily: "Inter",
      marginTop: "-6px",
    },
    img: {
      width: "132px",
      position: "absolute",
      left: "0px",
    },
    rowDouble: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    row: {
      flexDirection: "row",
      textAlign: "left",
      minWidth: "40%",
    },
  });

  return (
    <div style={style.container}>
      <Text style={style.title} fixed>
        Locador
      </Text>
      <hr
        style={{
          border: "0.4px solid black",
          marginBottom: "18px",
        }}
      />
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Nome: </Text>
          <Text style={style.value}>{data?.fullName}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Código: </Text>
          <Text style={style.value}>{data?.locatorCode}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Endereço: </Text>
          <Text style={style.value}>{data?.address || "Indefinido"}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>CEP: </Text>
          <Text style={style.value}>{data?.cep || "Indefinido"}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Bairro: </Text>
          <Text style={style.value}>{data?.district || "Indefinido"}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Cidade: </Text>
          <Text style={style.value}>{data?.city || "Indefinido"}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>RG: </Text>
          <Text style={style.value}>{data?.rg || "Indefinido"}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>CPF: </Text>
          <Text style={style.value}>{data?.cpf || "Indefinido"}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Contato: </Text>
          <Text style={style.value}>{data?.contact1 || "Indefinido"}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Banco: </Text>
          <Text style={style.value}>{data?.bank || "Indefinido"}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Agência: </Text>
          <Text style={style.value}>{data?.agency || "Indefinido"}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Número da conta: </Text>
          <Text style={style.value}>{data?.accountNumber || "Indefinido"}</Text>
        </div>
      </div>
      <div style={style.row}>
        <Text style={style.key}>Tipo de conta: </Text>
        <Text style={style.value}>{data?.accountType || "Indefinido"}</Text>
      </div>
    </div>
  );
};

const PropertyInfo = ({ data }: any) => {
  const style = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "column",
      marginBottom: 38,
    },
    title: {
      width: "100%",
      textAlign: "center",
      fontSize: 15,
      fontWeight: "semibold",
      fontFamily: "Inter",
      marginTop: "-6px",
      marginBottom: "6px",
    },
    key: {
      fontSize: 11,
      fontWeight: "semibold",
      fontFamily: "Inter",
      marginTop: "-6px",
    },
    value: {
      fontSize: 11,
      fontFamily: "Inter",
      marginTop: "-6px",
    },
    img: {
      width: "132px",
      position: "absolute",
      left: "0px",
    },
    rowDouble: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    row: {
      flexDirection: "row",
      textAlign: "left",
      minWidth: "40%",
    },
  });

  return (
    <div style={style.container}>
      <Text style={style.title} fixed>
        Imóvel
      </Text>
      <hr
        style={{
          border: "0.4px solid black",
          marginBottom: "18px",
        }}
      />
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Endereço: </Text>
          <Text style={style.value}>{data?.address}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Código: </Text>
          <Text style={style.value}>
            {propertyCodeFormatter({ value: data?.propertyCode })}
          </Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Bairro: </Text>
          <Text style={style.value}>{data?.district}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Cidade: </Text>
          <Text style={style.value}>{data?.city}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>CEP: </Text>
          <Text style={style.value}>{data?.cep}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Valor aluguél: </Text>
          <Text style={style.value}>{data?.leaseAmount}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>EDP: </Text>
          <Text style={style.value}>{data?.edpInstallation}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>RGI: </Text>
          <Text style={style.value}>{data?.rgi}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Fornecimento: </Text>
          <Text style={style.value}>{data?.supply}</Text>
        </div>
      </div>
    </div>
  );
};

const ContractInfo = ({ data }: any) => {
  const style = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "column",
      marginBottom: 38,
    },
    title: {
      width: "100%",
      textAlign: "center",
      fontSize: 15,
      fontWeight: "semibold",
      fontFamily: "Inter",
      marginTop: "-6px",
      marginBottom: "6px",
    },
    key: {
      fontSize: 11,
      fontWeight: "semibold",
      fontFamily: "Inter",
      marginTop: "-6px",
    },
    value: {
      fontSize: 11,
      fontFamily: "Inter",
      marginTop: "-6px",
    },
    img: {
      width: "132px",
      position: "absolute",
      left: "0px",
    },
    rowDouble: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "8px",
    },
    row: {
      flexDirection: "row",
      textAlign: "left",
      minWidth: "40%",
    },
  });

  return (
    <div style={style.container}>
      <Text style={style.title} fixed>
        Contrato
      </Text>
      <hr
        style={{
          border: "0.4px solid black",
          marginBottom: "18px",
        }}
      />
      <div
        style={{
          justifyContent: "center",
          width: "100%",
          marginBottom: "12px",
        }}
      >
        <Text style={{ color: "gray", fontSize: "12px", fontWeight: "bold" }}>
          Locatário
        </Text>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Nome: </Text>
          <Text style={style.value}>{data?.fullName}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Contato: </Text>
          <Text style={style.value}>
            {propertyCodeFormatter({ value: data?.contact1 })}
          </Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>CPF: </Text>
          <Text style={style.value}>{data?.cpf}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>RG: </Text>
          <Text style={style.value}>{data?.rg}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Profissão: </Text>
          <Text style={style.value}>{data?.profession}</Text>
        </div>
      </div>
      <div
        style={{
          marginTop: "12px",
          justifyContent: "center",
          width: "100%",
          marginBottom: "12px",
        }}
      >
        <Text style={{ color: "gray", fontSize: "12px", fontWeight: "bold" }}>
          Contrato
        </Text>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Tipo: </Text>
          <Text style={style.value}>{data?.contract.goal}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Dia de pagamento: </Text>
          <Text style={style.value}>{data?.contract.payday}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Início: </Text>
          <Text style={style.value}>
            {dateFormatter({ value: data?.contract.start })}
          </Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Término: </Text>
          <Text style={style.value}>
            {dateFormatter({ value: data?.contract.end })}
          </Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Reajuste: </Text>
          <Text style={style.value}>{data?.contract.reajust}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Valor integral: </Text>
          <Text style={style.value}>{data?.contract.integralValue}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Índice: </Text>
          <Text style={style.value}>{data?.contract.index}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Duração: </Text>
          <Text style={style.value}>{data?.contract.duration}</Text>
        </div>
      </div>
      <div
        style={{
          marginTop: "12px",
          justifyContent: "center",
          width: "100%",
          marginBottom: "12px",
        }}
      >
        <Text style={{ color: "gray", fontSize: "12px", fontWeight: "bold" }}>
          Fiador
        </Text>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Nome: </Text>
          <Text style={style.value}>{data?.bail.fullNameG1}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Contato: </Text>
          <Text style={style.value}>{data?.bail.contact1G1}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>CPF: </Text>
          <Text style={style.value}>{data?.bail.cpfG1}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>RG: </Text>
          <Text style={style.value}>{data?.bail.rgG1}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Endereço: </Text>
          <Text style={style.value}>{data?.bail.addressG1}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Bairro: </Text>
          <Text style={style.value}>{data?.bail.districtG1}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Cidade: </Text>
          <Text style={style.value}>{data?.bail.cityG1}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>CEP: </Text>
          <Text style={style.value}>{data?.bail.cepG1}</Text>
        </div>
      </div>
    </div>
  );
};

const RegistrationForm = ({ tenantCode }: any) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      setData(await Report.registrationForm(tenantCode));
    };

    if (!data) loadData();
  });

  return (
    <Document>
      <Page>
        <LocatorInfo data={data?.locator} />
        <PropertyInfo data={data?.property} />
        <ContractInfo data={data?.tenant} />
      </Page>
    </Document>
  );
};

export default RegistrationForm;
