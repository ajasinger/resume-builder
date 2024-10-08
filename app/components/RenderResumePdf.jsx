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
    marginBottom: 20,
    position: 'fixed',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  bodyHeader: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 12,
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


export default function RenderResumePdf({ pdfData }) {
    return(
            <Document>
                <Page size="A4" style={styles.page}> 
                    {/* Header */}
                    <View style={styles.section}>
                    <Text style={styles.header}>{pdfData?.bioData?.name}</Text>
                    {/* {pdfData?.src && pdfData?.src && <Image style={styles.image} src={pdfData?.src} />} */}
                    <Text style={styles.subHeader}>{pdfData?.bioData?.headline}</Text>
                    </View> 

                    {/* Body */}
                    <View style={styles.section}>
                    <Text style={styles.subHeader}>Experience</Text>
                    {pdfData?.experienceData && pdfData?.experienceData?.map((job, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={styles.bodyHeader}>{job.title}</Text>
                        <Text style={styles.text}>{job.company}</Text>
                        <Text style={styles.greyText}>{job.duration}</Text>
                        <Text style={styles.text}>{job.jobSummary}</Text>
                        </View>
                    ))}
                    </View> 
                </Page>
            </Document> 
    )
}




