import {
  Page as PagePdfRender,
  Text,
  Document,
  StyleSheet,
  Font,
  Image,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import ReportService from "../../../services/reportService";
import {
  dateFormatter,
  propertyCodeFormatter,
} from "../../../services/formatters";

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

const Header = ({ title }: any) => {
  const style = StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginBottom: 36,
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
        {title}
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

const Page = ({ children, title }: any) => {
  return (
    <PagePdfRender
      style={{ paddingTop: 35, paddingBottom: 50, paddingHorizontal: 35 }}
      orientation="landscape"
      wrap={false} // check that the print is correct.
    >
      <Header title={title} />
      {children}
      <Footer />
    </PagePdfRender>
  );
};

const Table = ({ header, data }: any) => {
  const styles = StyleSheet.create({
    table: {
      display: "flex",
      width: "auto",
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "25%",
      borderLeftWidth: 0,
      borderTopWidth: 0,
      marginRight: 6,
    },
    tableCell: {
      fontFamily: "Inter",
      margin: "auto",
      marginTop: 5,
      fontSize: 8,
    },
    tableCellHeader: {
      fontFamily: "Inter",
      margin: "auto",
      marginTop: 5,
      fontSize: 8,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {header?.map((col: any) => {
          return (
            <View style={styles.tableCol}>
              <Text style={styles.tableCellHeader}>{col}</Text>
            </View>
          );
        })}
      </View>
      <hr
        style={{
          border: "0.4px solid black",
          marginTop: "4px",
          marginBottom: "3px",
        }}
      />
      {data?.map((row: any) => {
        const itemsRow = Object?.values(row);

        itemsRow[0] =
          typeof itemsRow[0] === "string"
            ? propertyCodeFormatter({ value: itemsRow[0] })
            : itemsRow[0];
        itemsRow[3] = dateFormatter({ value: itemsRow[3] });
        itemsRow[4] = dateFormatter({ value: itemsRow[4] });

        return (
          <View style={styles.tableRow}>
            {itemsRow?.map((col: any) => {
              return (
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{col}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const generatePages = (data: any, pageTitle: string) => {
  const pages = [];

  for (let i = 0; i < data?.length; i += 20) {
    const newData = data.slice(i, i + 20);

    pages.push(
      <Page title={pageTitle}>
        <Table
          header={[
            "Cod. de propriedade",
            "Nome locador",
            "Nome locatário",
            "Data início",
            "Data fim",
            "Tipo imóvel",
          ]}
          data={newData}
        />
      </Page>
    );
  }

  return pages;
};

const NoneContractFound = ({ pageTitle }: any) => {
  return (
    <Page title={pageTitle}>
      <Text
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5px",
          marginLeft: "10px",
        }}
      >
        Nenhum contrato encontrado.
      </Text>
    </Page>
  );
};

const ContractsByPeriod = ({ startDate, endDate, mode }: any) => {
  const pageTitle =
    mode === 1
      ? "Contratos iniciados por período"
      : "Contratos finalizados por período";

  const [data, setData] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      setData(await ReportService.contractsByPeriod(startDate, endDate, mode));
    };

    if (!data) loadData();
  });

  return (
    <Document>
      {data?.length ? (
        generatePages(data, pageTitle)?.map((obj: any) => {
          return obj;
        })
      ) : (
        <NoneContractFound pageTitle={pageTitle} />
      )}
    </Document>
  );
};

export default ContractsByPeriod;
