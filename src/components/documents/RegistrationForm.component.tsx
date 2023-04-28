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
import { propertyCodeFormatter } from "../../services/Formatters";

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
          <Text style={style.key}>Valor integral: </Text>
          <Text style={style.value}>{data?.integralValue}</Text>
        </div>
      </div>
      <div style={style.rowDouble}>
        <div style={style.row}>
          <Text style={style.key}>Valor aluguél: </Text>
          <Text style={style.value}>{data?.leaseAmount}</Text>
        </div>
        <div style={style.row}>
          <Text style={style.key}>Desconto: </Text>
          <Text style={style.value}>{data?.discount}</Text>
        </div>
      </div>
    </div>
  );
};

const RegistrationForm = ({ tenantCode }: any) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      setData(await Report.registrationForm(1));
    };

    if (!data) loadData();
  });

  return (
    <Document>
      <Page>
        <LocatorInfo data={data?.locator} />
        <PropertyInfo data={data?.property} />
      </Page>
    </Document>
  );
};

export default RegistrationForm;
