import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request) {

    try{

        // Launch the browser, open a new blank page, navigate the page to a URL & wait for page to load
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.linkedin.com/in/ajasinger', {
            waitUntil: 'networkidle2',
          });

        // Extract data from the page using evaluate
        const profileData = await page.evaluate(() => {

            // You can customize the selectors based on what you need to scrape
            const name = document.querySelector('.pv-text-details__left-panel h1')?.innerText;
            const headline = document.querySelector('.text-body-medium')?.innerText;
            const location = document.querySelector('.pv-top-card--list-bullet li')?.innerText;
            
            return {
            name,
            headline,
            location,
            };
        });

        // Log the scraped profile data
        console.log('Profile Data:', profileData);
        
        await browser.close();

        return NextResponse.json(profileData);

    }catch(error) {
        console.error('Error fetching user data', error);
        return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
    }
}


 // const res = await fetch('https://www.linkedin.com/in/');
        // const html = await res.text();

        // console.log(html);
        // console.log('try ended')