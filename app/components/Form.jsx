'use client';

import { useState } from 'react';
import RenderResumePdf from './RenderResumePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

// Create a React web app that takes a LinkedIn URL and spits out a personalized PDF resume
// Project Requirements:
// - Deliver a Github repository, ready for npm i && npm start
// - Use any web scraper you'd like, (or even the LinkedIn API if you manage to get access)
// - Use react-pdf (https://react-pdf.org/) to generate the output
// - The resume should include the full work and/or education sections. Anything else is optional
// - Ensure the PDF contains a header and/or footer that repeats on every page
// - Include the person's profile picture somewhere in the PDF

export default function Form() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const [error, setError] = useState('');

    const handleFormSubmit = async(e) => {
        e.preventDefault();

        if(!name) {
            setError('Please enter a valid LinkedIn profile URL.')
        }

        setLoading(true);
        setError('');

        try{
            const profileName = name.trim();

            const res = await fetch('/api/profileData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: profileName
                })
            });
    
            if(!res.ok) {
                setError('We were unable to create your resume. Please try again.');
                console.log('fetch error in handleFormSubmit')
            }
    
            const data = await res.json();
            console.log('data', data);
            setPdfData(data);

        } catch(error) {
            console.log('error fetching data');
            setError('We were unable to create your resume. Please try again.');
        } finally {
            setLoading(false);
        }
        
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit} className="flex flex-wrap gap-4">
                {/* <label htmlFor="name font-sans">Enter a Linkedin URL:</label> */}
                <div className="flex gap-1 items-center text-[#4F4F4F] text-md font-sans bg-white py-4 rounded-full px-12 w-fit">
                    <p>https://www.linkedin.com/in/</p>
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoComplete="name"
                        placeholder="janesmith"
                        className="border-b-2 focus:outline-none"
                        aria-label='complete the LinkedIn URL with a username'
                    />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#BBB7E2] hover:bg-[#DFD0FB] disabled:bg-[#4F4F4F] font-bold py-4 rounded-full px-12 text-xl flex-row fade-in-animation delay-2000 w-fit text-nowrap"
                >
                    {loading ? 'Generating...' : 'Create Resume'}
                </button>
            </form>
            {pdfData &&
                <div>
                    <PDFDownloadLink
                        document={<RenderResumePdf pdfData={pdfData} />}
                        fileName="resume.pdf"
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
                    {/* <PDFViewer>
                        <RenderResumePdf pdfData={pdfData} />
                    </PDFViewer> */}
                    <p>name: {pdfData?.bioData?.name}</p>
                    <p>headline: {pdfData?.bioData?.headline}</p>
                    <p>profile image: {pdfData?.bioData?.profileImage}</p>
                    {pdfData?.experienceData?.map((job, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            company: {job?.company}
                            time: {job?.duration}
                            title: {job?.title}
                            summary: {job?.jobSummary}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
