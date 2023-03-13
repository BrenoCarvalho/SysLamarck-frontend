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
import { propertyCodeFormatter } from "../../../services/Formatters";

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

const Card = ({ address, district, tenant, propertyCode, vacant }: any) => {
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
          <Text style={cardStyle.text}>{address}</Text>
        </div>
        <div style={{ width: "100%", maxWidth: "130px" }}>
          <Text style={cardStyle.textProperty}>Bairro</Text>
          <Text style={cardStyle.text}>{district}</Text>
        </div>
      </div>
      <div>
        <Text style={cardStyle.textProperty}>Locatário</Text>
        <Text style={cardStyle.text}>{tenant}</Text>
      </div>
      <div style={cardStyle.footer}>
        <Text style={cardStyle.textProperty}>
          {propertyCodeFormatter({ value: propertyCode })}
        </Text>
        <Text style={cardStyle.textProperty}>
          Vago: {vacant ? "Sim" : "Não"}
        </Text>
      </div>
    </div>
  );
};

const LocatorName = ({
  code,
  name,
}: {
  code: string | number;
  name: string;
}) => {
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
      <Text style={style.name}>
        {code} - {name}
      </Text>
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
        Imóveis por locador
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

const generatePages = (
  locatorCode: string | number,
  locatorName: string,
  properties: any
) => {
  const pages = [];

  for (let i = 0; i < properties?.length; i += 5) {
    pages.push(
      <Page>
        {i === 0 ? <LocatorName code={locatorCode} name={locatorName} /> : null}
        {properties[i] ? (
          <Card
            address={properties[i]?.address}
            district={properties[i]?.district}
            tenant={properties[i]?.tenant}
            propertyCode={properties[i]?.propertyCode}
            vacant={properties[i]?.vacant}
          />
        ) : null}
        {properties[i + 1] ? (
          <Card
            address={properties[i + 1]?.address}
            district={properties[i + 1]?.district}
            tenant={properties[i + 1]?.tenant}
            propertyCode={properties[i + 1]?.propertyCode}
            vacant={properties[i + 1]?.vacant}
          />
        ) : null}
        {properties[i + 2] ? (
          <Card
            address={properties[i + 2]?.address}
            district={properties[i + 2]?.district}
            tenant={properties[i + 2]?.tenant}
            propertyCode={properties[i + 2]?.propertyCode}
            vacant={properties[i + 2]?.vacant}
          />
        ) : null}
        {properties[i + 3] ? (
          <Card
            address={properties[i + 3]?.address}
            district={properties[i + 3]?.district}
            tenant={properties[i + 3]?.tenant}
            propertyCode={properties[i + 3]?.propertyCode}
            vacant={properties[i + 3]?.vacant}
          />
        ) : null}
        {properties[i + 4] ? (
          <Card
            address={properties[i + 4]?.address}
            district={properties[i + 4]?.district}
            tenant={properties[i + 4]?.tenant}
            propertyCode={properties[i + 4]?.propertyCode}
            vacant={properties[i + 4]?.vacant}
          />
        ) : null}
      </Page>
    );
  }

  return pages;
};

const PropertiesByLocator = ({ locatorCode }: any) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      setData(await Report.propertyByLocator(locatorCode));
    };

    if (!data) loadData();
  });

  return (
    <Document>
      {generatePages(
        data?.locatorCode,
        data?.locatorName,
        data?.properties
      ).map((obj) => {
        return obj;
      })}
    </Document>
  );
};

export default PropertiesByLocator;
