import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './ContactsOption.module.css';

export default function ContactOption() {
    const { theme } = useContext(ThemeContext);
    const { lang } = useParams();

    const navigate = useNavigate();

    const alterLang = lang === 'en' ? 'ua' : 'en';
    const switchLanguage = () => navigate(`/contacts/${alterLang}`);

    const contactsByLang = {
        ua: {
            lang: 'Ukrainian',
            tel: '+38 066 322 5721',
            email: 'support@example.com',
            hours: 'Пн–Пт, 09:00–18:00',
            address: 'Київ, Україна'

        },
        en: {
            lang: 'English',
            tel: '+1 (202) 555-0199',
            email: 'support@example.com',
            hours: 'Mon–Fri, 9 AM–6 PM',
            address: 'New York, USA'
        }
    }
    const defaultLang = 'en';
    const contactData = contactsByLang[lang] || contactsByLang[defaultLang];

    return (
        <div className={styles['contact-option']}>

            <h1>Contact us ({contactData.lang})</h1>
            <div>
                <span><strong>Tel:</strong>{contactData.tel}</span>
                <span><strong>Email:</strong>{contactData.email}</span>
                <span><strong>Hours:</strong>{contactData.hours}</span>
                <span><strong>Address:</strong>{contactData.address}</span>
            </div>

            <button onClick={switchLanguage}>
                {alterLang === 'ua' ? 'Ukrainian' : 'English'} Speaking Option
            </button>

        </div>
    )
}