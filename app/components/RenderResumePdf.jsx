import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  bodyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bodySubHeader: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: 'semibold'
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
  greyText: {
    fontSize: 12,
    color: '#4F4F4F',
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

// Define Header component
const Header = ({ name, headline }) => (
  <View fixed style={styles.section}>
    <Text style={styles.header}>{name}</Text>
    <Text style={styles.subHeader}>{headline}</Text>
  </View>
);


export default function RenderResumePdf({ pdfData }) {
    return(
            <Document>
                <Page size="A4" style={styles.page}> 
                    {/* Header */}
                    {/* <View style={styles.section}>
                    <Text style={styles.header}>{pdfData?.bioData?.name}</Text> */}
                    {/* {pdfData?.src && pdfData?.src && <Image style={styles.image} src={pdfData?.src} />} */}
                    {/* <Text style={styles.subHeader}>{pdfData?.bioData?.headline}</Text>
                    </View>  */}
                    <Header 
                      name={pdfData?.bioData?.name} 
                      headline={pdfData?.bioData?.headline} 
                    />
                    {/* Body */}
                    <View style={styles.section}>
                    <Text style={styles.bodyHeader}>Experience</Text>
                    {pdfData?.experienceData && pdfData?.experienceData?.map((job, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.bodySubHeader}>{job.title}</Text>
                        <Text style={styles.text}>{job.company}</Text>
                        <Text style={styles.greyText}>{job.duration}</Text>
                        {job.jobSummary && <Text style={styles.text}>{job.jobSummary}</Text>}
                        </View>
                    ))}
                    </View> 
                </Page>
            </Document> 
    )
}




