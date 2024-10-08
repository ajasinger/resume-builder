import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
export default function RenderResumePdf(){
 return(
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
 )
}





// import React from 'react';
// import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// // Create styles for the PDF document
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   subHeader: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 12,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
// });


// export default function RenderResumePdf({ userData }) {
//     return(
//         <div>
//             <Document>
//                 <Page size="A4" style={styles.page}> 
//                     {/* Header with Profile Pic */}
//                     <View style={styles.section}>
//                     <Text style={styles.header}>{userData?.name}</Text>
//                     {profilePic && profilePic && <Image style={styles.image} src={userData?.profilePic} />}
//                     <Text style={styles.subHeader}>{userData?.headline}</Text>
//                     </View> 

//                     {/* Experience Section */}
//                     <View style={styles.section}>
//                     <Text style={styles.subHeader}>Experience</Text>
//                     {userData?.experience && userData?.experience.map((job, index) => (
//                         <View key={index} style={{ marginBottom: 10 }}>
//                         <Text style={styles.text}>Title: {job.title}</Text>
//                         <Text style={styles.text}>Company: {job.company}</Text>
//                         <Text style={styles.text}>Duration: {job.duration}</Text>
//                         <Text style={styles.text}>Summary: {job.jobSummary}</Text>
//                         </View>
//                     ))}
//                     </View>
//                 </Page>
//             </Document> 
//         </div>
//     )
// }