'use client';

import { useState } from 'react';
import RenderResumePdf from './RenderResumePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Image from 'next/image';


// - Deliver a Github repository, ready for npm i && npm start

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
        setPdfData('');

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
            
            if(data.error) {
                console.log('error fetching data', data.error)
                setError('We were unable to create your resume. Please try again.');
            } else {
                console.log('data', data); 
                setPdfData(data);
            }

        } catch(error) {
            console.log('error fetching data');
            setError('We were unable to create your resume. Please try again.');
        } finally {
            setLoading(false);
            setName('');
        }
        
    }

    return(
        <div className="flex flex-col gap-16 justify-center">
            <div className="flex flex-col gap-4">
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
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-[#BBB7E2] hover:bg-[#DFD0FB] border border-transparent disabled:bg-transparent disabled:border-[#4F4F4F] font-bold py-4 rounded-full px-12 text-xl flex-row fade-in-animation delay-2000 w-fit text-nowrap"
                    >
                        {loading ? 'Generating...' : 'Create Resume'}
                    </button>
                </form>
                {error && <p className="text-red-600">{error}</p>}
            </div>
            {pdfData &&
                <div className='flex justify-center'>
                    <PDFDownloadLink
                        document={<RenderResumePdf pdfData={pdfData} />}
                        fileName="resume.pdf"
                        className="bg-[#BBB7E2] hover:bg-[#DFD0FB] font-bold py-4 rounded-full px-12 text-xl flex-row fade-in-animation delay-2000 w-fit text-nowrap"
                    >
                        {({ blob, url, loading, error }) =>
                            "Download PDF Resume"
                        }
                    </PDFDownloadLink>
                </div>
            }
        </div>
    )
}
