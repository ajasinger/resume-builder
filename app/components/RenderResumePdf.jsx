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
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 14,
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
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
});

// Define Header component
const Header = ({ name, headline, profileImage }) => (
  <View fixed style={styles.headerSection}>
    <View>
      {name && <Text style={styles.header}>{name}</Text>}
      {headline && <Text style={styles.subHeader}>{headline}</Text>}
    </View>
    {profileImage && (
      <Image
        style={styles.image}
        src={profileImage}
      />
    )}
  </View>
);

export default function RenderResumePdf({ pdfData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Header
          name={pdfData?.bioData?.name}
          headline={pdfData?.bioData?.headline}
          profileImage={pdfData?.bioData?.profileImage}
        />
        {/* Body */}
        <View style={styles.section}>
          <Text style={styles.bodyHeader}>Experience</Text>
          {pdfData?.experienceData?.map((job, index) => (
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
  );
}
