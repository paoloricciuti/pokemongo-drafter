import React from 'react';
import Menu from '../../components/Menu';

const article = ({ article }) => {
    return (
        <div className="main">
            <div className="articles-container for-article">
            <Menu href="/articles" name="Back" icon="arrow_back" />
                <div className="article-title">
                    <h1>
                        {article.title}
                    </h1>
                    <p className="author">{article.author}</p>
                </div>
                <hr />
                <div style={{maxWidth: "100%", padding: "1rem"}} dangerouslySetInnerHTML={{__html: article.article}}>
                </div>
            </div>
        </div>
    )
};
export default article;

export async function getServerSideProps(context) {
    return (await (new Promise((resolve) => {
        context.req.db.query(`SELECT * FROM articles WHERE slug LIKE '${context.params.slug}'`, (err, results) => {
            if (err || results.length==0 || results.length>1) {
                resolve({
                    notFound: true
                })
            } else {
                const md = require('markdown-it')({
                    linkify: true
                });
                results[0].article=md.render(results[0].article);
                resolve({
                    props: {
                        article: JSON.parse(JSON.stringify(results[0]))
                    }
                })
            }
        });
    })))
}