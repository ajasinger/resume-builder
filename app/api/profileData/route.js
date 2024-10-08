import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {

    const {name} = await request.json();

    if(!name) return NextResponse.json({ error: 'Please provide a name' }, { status: 400 });

    try{

        //navigate to login page in new browser
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://www.linkedin.com/login');

        //login
        await page.type('#username', process.env.LINKEDIN_USERNAME);
        await page.type('#password', process.env.LINKEDIN_PASSWORD);
        await page.click('button[type="submit"]');

        await page.waitForNavigation();

        //navigate to profile page and wait for section to load
        await page.goto(`https://www.linkedin.com/in/${name}`);
        await page.waitForSelector('main.scaffold-layout__main');

        const bioData = await page.evaluate(() => {
            
            const mainDiv = document.querySelector('main.scaffold-layout__main');
    
            // Extract name, headline, image src
            const name = mainDiv.querySelector('h1').innerText;
            const headline = mainDiv.querySelector('div.text-body-medium').innerText;
            const profileImage = mainDiv.querySelector('img.evi-image.profile-photo-edit__preview')?.src;

            return { name, headline, profileImage };
        });

        //navigate to experience page and wait for section to load
        await page.goto(`https://www.linkedin.com/in/${name}/details/experience`);
        await page.waitForSelector('.pvs-list__container');

        // Extracting experience data
        const experienceData = await page.evaluate(() => {
            const items = [];
            const containerDiv = document.querySelector('.pvs-list__container');

            if (containerDiv) {
                const listItems = containerDiv.querySelectorAll('.display-flex.flex-column.full-width.align-self-center');

                listItems.forEach(item => {
                    let title = '';
                    let duration = '';
                    let company = '';
                    let jobSummary = '';

                    const jobDetails = item.querySelector('.display-flex.flex-row.justify-space-between');

                    if (jobDetails) {
                        title = jobDetails.querySelector('.display-flex.align-items-center.mr1.t-bold')?.innerText?.trim().split('/n')[0] || '';
                        company = jobDetails.querySelector('.t-14.t-normal')?.innerText?.trim().split(' · ')[0].split('/n')[0] || '';
                        duration = jobDetails.querySelector('.t-14.t-normal.t-black--light')?.innerText?.trim().split(' · ')[0].split('/n')[0] || '';
                    }

                    // Optional: Get the job summary if available
                    jobSummary = item.querySelector('.pvs-entity__sub-components')?.innerText?.split("Skills:")[0].trim() || '';

                    if (title && duration) {
                        items.push({ title, company, duration, jobSummary });
                    }
                });
            }

            return items;
        });

        //close window
        await browser.close();

        return NextResponse.json({bioData, experienceData});

    }catch(error) {
        console.error('Error fetching user data', error);
        return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
    }
}
