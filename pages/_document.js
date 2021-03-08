import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                    (function (c, l, a, r, i, t, y) {
                        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
                        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
                    })(window, document, "clarity", "script", "57s2lnu4su");
                    ` }} />
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#234375" />
                    <meta name="description" content="The ultimate draft chooser for Pokemon GO" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}