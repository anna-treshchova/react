const styles = {
    container: `
            background-color: #FFFFFF; 
            padding: 30px 48px 60px;
            color: #222222;
            font-family: Inter, sans-serif;
            border: 1px solid #E2E2E2;
            border-radius: 12px;
            max-width: 540px;
            margin: auto;
        `,
    logo: `margin-left: -4px;`,
    title: `font-size: 32px; line-height: 1.2; color: #222222; margin: 20px 0 24px;`,
    warning: `font-size: 16px; line-height: 1.4; color: #222222; margin-bottom: 24px;`,
    code: `font-size: 32px; font-weight: 700; margin-bottom: 30px;`,
    divider: `width: 100%; height: 1px; background-color: #E5E5E5; margin-bottom: 30px;`,
    date: `font-size: 14px; font-weight: 400; color: #404040;`,
}

export const renderOtpMail = (code, date) => {
    const formattedCode = `${code.slice(0, 3)} ${code.slice(3)}`;

    const subject = `Your confirmation code is ${code}`

    const html = `
      <div style='${styles.container}'>
        <div style='${styles.logo}'>
          <img src='cid:logo' alt='Airbnb' width='34' height='34'>
        </div>
        <h1 style='${styles.title}'>Here's your Airbnb code</h1>
        <p style='${styles.warning}'>Never share your code with anyone — Airbnb employees will never ask for it.</p>
        <div style='${styles.code}'>${formattedCode}</div> 
        <div style='${styles.divider}'></div>
        <div style='${styles.date}'>${date}</div>
      </div>
    `;

    return { subject, html }
}