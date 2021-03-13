import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                    {/*open graph*/}
                    <meta property="og:title" content="Title"/>
                    <meta property="og:description" content="Express delivery"/>
                    <meta property="og:image"
                          content=""/>
                    <meta property="og:type" content="delivery"/>
                    <meta property="og:url" content=""/>

                    {/*title*/}
                    <title>Page of Express delivery</title>

                    {/*fonts, css*/}
                    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Play:wght@300;400;700&display=swap" rel="stylesheet" />
                </Head>
            <body>
                <Main />
            <NextScript />
            </body>
            </Html>
        )
    }
}

export default MyDocument