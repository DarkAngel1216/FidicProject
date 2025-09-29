import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export function ContractPDF({ template, contractContent }) {
  const font = template?.font || 'Helvetica';

  const pageStyle = {
    ...styles.page,
    backgroundColor: template?.pageColor || '#FFFFFF',
    border: template?.borderWidth ? `${template.borderWidth}px solid ${template.borderColor || '#000000'}` : 'none',
    fontFamily: font,
  };

  return (
    <Document>
      <Page size="A4" style={pageStyle}>
        <View style={styles.section}>
          {template?.logo && (
            <Image style={styles.logo} src={template.logo} />
          )}
          {template?.title && (
            <Text style={styles.title}>{template.title}</Text>
          )}
          <Text>{contractContent}</Text>
        </View>
      </Page>
    </Document>
  );
}
