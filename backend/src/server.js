import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
    try {
        const { app } = await import('./app.js');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })

    } catch (fatalErr) {
        console.error('\n[FATAL STARTUP CRASH] Server failed to initialize safely!');
        console.error('Reason:', fatalErr.message);

        process.exit(1);
    }
}

await bootstrap();