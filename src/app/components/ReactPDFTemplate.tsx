"use client";

import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ParsedFormData } from "../types";

const ReactPDFTemplate = ({
  parsedFormData,
}: {
  parsedFormData: ParsedFormData;
}) => {
  return (
    <Document>
      <Page>
        <Text>Attention: {parsedFormData.attention}</Text>
        {parsedFormData.entity ? <Text>{parsedFormData.entity}</Text> : null}
      </Page>
    </Document>
  );
};

export default ReactPDFTemplate;
