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

const Card = ({ address, district, description, propertyCode, price }: any) => {
  const cardStyle = StyleSheet.create({
    container: {
      width: "100%",
      border: "1px solid black",
      fontSize: "11",
      padding: 16,
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
      marginBottom: "12px",
    },
    footer: {
      flexDirection: "row",
      marginTop: "20px",
      justifyContent: "space-between",
    },
  });

  return (
    <div style={cardStyle.container}>
      <div style={cardStyle.row}>
        <div style={{ marginRight: "20px", width: "auto", maxWidth: "360px" }}>
          <Text style={cardStyle.textProperty}>Logradouro</Text>
          <Text style={cardStyle.text}>{address}</Text>
        </div>
        <div style={{ width: "100%", maxWidth: "130px" }}>
          <Text style={cardStyle.textProperty}>Bairro</Text>
          <Text style={cardStyle.text}>{district}</Text>
        </div>
      </div>
      <div>
        <Text style={cardStyle.textProperty}>Descrição</Text>
        <Text style={cardStyle.text}>{description}</Text>
      </div>
      <div style={cardStyle.footer}>
        <Text style={cardStyle.textProperty}>
          {propertyCodeFormatter({ value: propertyCode })}
        </Text>
        <Text style={cardStyle.textProperty}>{price}</Text>
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
        Imóveis para venda
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
        {property[i]?.id ? (
          <Card
            address={property[i]?.address}
            district={property[i]?.district}
            description={property[i]?.propertyDescription}
            propertyCode={property[i]?.propertyCode}
            price={property[i]?.sellValue}
          />
        ) : null}
        {property[i + 1]?.id ? (
          <Card
            address={property[i + 1]?.address}
            district={property[i + 1]?.district}
            description={property[i + 1]?.propertyDescription}
            propertyCode={property[i + 1]?.propertyCode}
            price={property[i + 1]?.sellValue}
          />
        ) : null}
        {property[i + 2]?.id ? (
          <Card
            address={property[i + 2]?.address}
            district={property[i + 2]?.district}
            description={property[i + 2]?.propertyDescription}
            propertyCode={property[i + 2]?.propertyCode}
            price={property[i + 2]?.sellValue}
          />
        ) : null}
        {property[i + 3]?.id ? (
          <Card
            address={property[i + 3]?.address}
            district={property[i + 3]?.district}
            description={property[i + 3]?.propertyDescription}
            propertyCode={property[i + 3]?.propertyCode}
            price={property[i + 3]?.sellValue}
          />
        ) : null}
      </Page>
    );
  }

  return pages;
};

const PropertiesForSale = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      setData(await Report.propertyForSale());
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

export default PropertiesForSale;
