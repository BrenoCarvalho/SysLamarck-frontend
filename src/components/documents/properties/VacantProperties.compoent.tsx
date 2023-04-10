import {
  Page as PagePdfRender,
  Text,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import Report from "../../../services/Report";
import {
  currencyFormatter,
  propertyCodeFormatter,
} from "../../../services/Formatters";

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

const Card = ({ property }: any) => {
  const cardStyle = StyleSheet.create({
    container: {
      width: "100%",
      border: "1px solid black",
      fontSize: "11",
      padding: 12,
      borderRadius: "4px",
      marginBottom: "10px",
    },
    textProperty: {
      fontFamily: "Inter",
      fontWeight: "semibold",
    },
    text: {
      fontFamily: "Inter",
      fontWeight: "normal",
    },
    row: {
      flexDirection: "row",
      marginBottom: "8px",
    },
    footer: {
      flexDirection: "row",
      marginTop: "10px",
      justifyContent: "space-between",
    },
  });

  return (
    <div style={cardStyle.container}>
      <div style={cardStyle.row}>
        <div style={{ marginRight: "20px", width: "auto", maxWidth: "360px" }}>
          <Text style={cardStyle.textProperty}>Logradouro</Text>
          <Text style={cardStyle.text}>{property?.address}</Text>
        </div>
        <div style={{ marginRight: "20px", width: "auto", maxWidth: "100px" }}>
          <Text style={cardStyle.textProperty}>Bairro</Text>
          <Text style={cardStyle.text}>{property?.district}</Text>
        </div>
        <div style={{ marginRight: "20px", width: "auto", maxWidth: "80px" }}>
          <Text style={cardStyle.textProperty}>CEP</Text>
          <Text style={cardStyle.text}>{property?.cep}</Text>
        </div>
        <div style={{ marginRight: "20px", width: "auto", maxWidth: "130px" }}>
          <Text style={cardStyle.textProperty}>Cidade</Text>
          <Text style={cardStyle.text}>{property?.city}</Text>
        </div>
      </div>
      <div>
        <Text style={cardStyle.textProperty}>Descrição</Text>
        <Text style={cardStyle.text}>{property?.propertyDescription}</Text>
      </div>
      <div style={cardStyle.footer}>
        <Text style={cardStyle.textProperty}>
          {propertyCodeFormatter({ value: property?.propertyCode })}
        </Text>
        <Text style={cardStyle.textProperty}>
          {currencyFormatter({ value: property?.integralValue })}
        </Text>
        <Text style={cardStyle.textProperty}>
          {currencyFormatter({ value: property?.leaseAmount })}
        </Text>
      </div>
    </div>
  );
};

const SectionType = ({ name }: { name: string }) => {
  const style = StyleSheet.create({
    container: {
      marginBottom: "14px",
    },
    name: {
      fontFamily: "Inter",
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 5,
      marginLeft: 1,
    },
    divider: {
      border: "0.2px solid black",
    },
  });

  return (
    <div style={style.container}>
      <Text style={style.name}>{name}</Text>
      <hr style={style.divider} />
    </div>
  );
};

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
        Imóveis vagos
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

const generatePages = (property: any, type: any) => {
  const pages = [];

  for (let i = 0; i < property?.length; i += 4) {
    pages.push(
      <Page>
        <SectionType name={type} />
        {property[i]?.id ? <Card property={property[i]} /> : null}
        {property[i + 1]?.id ? <Card property={property[i + 1]} /> : null}
        {property[i + 2]?.id ? <Card property={property[i + 2]} /> : null}
        {property[i + 3]?.id ? <Card property={property[i + 3]} /> : null}
      </Page>
    );
  }

  return pages;
};

const VacantProperties = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      setData(await Report.propertyVacant());
    };

    if (!data) loadData();
  });

  return (
    <Document>
      {data?.residential?.length
        ? generatePages(data?.residential, "Residencial").map((obj) => {
            return obj;
          })
        : null}
      {data?.apartment?.length
        ? generatePages(data?.apartment, "Apartamento").map((obj) => {
            return obj;
          })
        : null}
      {data?.commercial?.length
        ? generatePages(data?.commercial, "Comercial").map((obj) => {
            return obj;
          })
        : null}
      {data?.terrain?.length
        ? generatePages(data?.terrain, "Terreno").map((obj) => {
            return obj;
          })
        : null}
    </Document>
  );
};

export default VacantProperties;
