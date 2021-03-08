import Link from 'next/link';
import React from 'react';
import Menu from '../../components/Menu';

const articles = ({ articles }) => {
    return (
        <div className="main">
            <div className="articles-container">
                <Menu href="/" name="Home" icon="home" />
                <div style={{ backgroundImage: "url(../pogodrafter.png)" }} className="logo"></div>
                {
                    articles.map(article => (
                        <Link key={article.slug} href={`/articles/${article.slug}`}>
                            <div className="article">
                                <h3>{article.title}</h3>
                                <p className="author">{article.author}</p>
                                <hr />
                                <div>{article.description}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
};
export default articles;

export async function getServerSideProps(context) {
    return (await (new Promise((resolve) => {
        context.req.db.query("SELECT * FROM articles", (err, results) => {
            if (err) {
                resolve({
                    notFound: true
                })
            } else {
                resolve({
                    props: {
                        articles: JSON.parse(JSON.stringify(results))
                    }
                })
            }
        });
    })))
}