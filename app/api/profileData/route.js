import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {

    const {name} = await request.json();

    if(!name) return NextResponse.json({ error: 'Please provide a name' }, { status: 400 });

    try{

        //navigate to login page in new browser
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://www.linkedin.com/in/login');

        //login
        await page.type('#username', process.env.LINKEDIN_USERNAME);
        await page.type('#password', process.env.LINKEDIN_PASSWORD);
        await page.click('button[type="submit"]');

        await page.waitForNavigation();

        //navigate to profile page 
        // await page.goto(`https://www.linkedin.com/in/${name}`, { waitUntil: 'networkidle2' });
        await page.goto(`https://www.linkedin.com/in/ajasinger`, { waitUntil: 'networkidle2' });

        //get user info
        const profileData = await page.evaluate(() => {
            const name = document.querySelector('.pv-top-card--list li').innerText;
            const profilePhoto = document.querySelector('.pv-top-card__photo img').src;
            const workExperience = Array.from(
              document.querySelectorAll('.experience-section .pv-position-entity')
            ).map((exp) => {
              const title = exp.querySelector('h3').innerText;
              const company = exp.querySelector('.pv-entity__secondary-title').innerText;
              const dates = exp.querySelector('.pv-entity__date-range span:nth-child(2)').innerText;
              return { title, company, dates };
            });
            
            return { name, profilePhoto, workExperience };
          });

        //close window
        await browser.close();

        console.log('profileData', profileData);

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