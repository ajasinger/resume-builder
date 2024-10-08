'use client';

import { useState } from 'react';
import RenderResumePdf from './RenderResumePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';

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
    const [error, setError] = useState(false);

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await fetch('/api/profileData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name
                })
            });
    
            if(!res.ok) {
                setError(true);
                console.log('fetch error in handleFormSubmit')
            }
    
            const data = await res.json();
            console.log('data', data);
            setPdfData(data);

        } catch(error) {

            console.log('error fetching data');
            setError(true);
        
        } finally {
            setLoading(false);
        }
        
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                {/* <label htmlFor="name font-sans">Enter a Linkedin URL:</label> */}
                <div className="flex items-center text-[#4F4F4F] font-sans bg-white py-10 rounded-full px-12">
                    <p>https://www.linkedin.com/in/</p>
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoComplete="name"
                        placeholder="janedoe"
                        className="border-4 border-color:black rounded"
                        //className="relative flex flex-col flex-nowrap items-center gap-4 text-gray-dark tablet:h-[62px] tablet:flex-row tablet:gap-0 tablet:rounded-[64px] tablet:bg-white tablet:py-[8px] tablet:pl-[24px] tablet:pr-[4px]"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-[#BBB7E2] hover:bg-[#DFD0FB] font-bold py-10 rounded-full px-12 text-[21px] flex-row fade-in-animation delay-2000 w-fit"
                    //className="whitespace-nowrap rounded-full cursor-default hover:cursor-pointer disabled:cursor-default flex items-center justify-center font-semibold  text-coal bg-primary hover:bg-primary-light active:bg-primary-dark disabled:bg-gray-extra-light disabled:text-gray px-12 h-14 min-h-14 text-[21px] flex-row fade-in-animation delay-2000 w-fit opacity-0"
                >
                    Generate PDF
                </button>
            </form>
            <PDFDownloadLink
                    document={<RenderResumePdf />}
                    fileName="resume.pdf"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download PDF'
                    }
                </PDFDownloadLink>
        </div>
    )
}