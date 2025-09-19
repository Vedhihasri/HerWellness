import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import insightsData from "./insights.json";
import "./insights.css";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const foundArticle = insightsData.find((a) => a.id.toString() === id);
    setArticle(foundArticle || null);
  }, [id]);

  if (!article) {
    return (
      <div className="article-page">
        <div className="article-wrapper">
          <h1>Article Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-wrapper">
        {article.image && (
          <div className="article-hero">
            <img src={article.image} alt={article.title} />
          </div>
        )}

        <h1 className="article-title">{article.title}</h1>

        {article.description && (
          <p className="article-desc">{article.description}</p>
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }}
        />
      </div>
    </div>
  );
}
