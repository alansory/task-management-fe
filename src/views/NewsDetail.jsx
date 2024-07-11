import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsDetail, getArticleCount, incrementArticleCount } from '../actions/newsActions';
import { useDispatch, useSelector } from 'react-redux';
import { ARTICLE_LIMIT } from '../constans';

function NewsDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.news.isFetching);
  const newsDetail = useSelector(state => state.news.detail);
  const seo = useSelector(state => state.news.detail?.seo); 
  const [articleLimitReached, setArticleLimitReached] = useState(false);

  useEffect(() => {
    const count = getArticleCount();
    if (count >= ARTICLE_LIMIT) {
      setArticleLimitReached(true);
    } else {
      incrementArticleCount();
    }
    dispatch(getNewsDetail(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    // Update SEO metadata when seo data changes
    if (seo) {
      document.title = seo.title; 
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.content = seo.description; 
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.content = seo.title; 
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.content = seo.description; 
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.content = seo.image; 
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) canonicalLink.href = seo.canonical_link;
    }
  }, [seo]);

  return (
    <div className="news-detail-container">
      {isFetching ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          {newsDetail ? (
            <div>
              <h2 className="news-title" >{newsDetail.title}</h2>
              {newsDetail.author ? (
                <p>Written by: {newsDetail.author.display_name}</p>
              ) : null}
              {articleLimitReached ? (
                <div>
                  <p>You have reached your monthly article limit.</p>
                  <div className="news-content blurred-content" dangerouslySetInnerHTML={{ __html: newsDetail.content.slice(0, 500) + '...' }}></div>
                </div>
              ) : (
                <div className="news-content" dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>
              )}
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default NewsDetail;
