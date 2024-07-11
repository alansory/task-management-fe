import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsList } from '../actions/newsActions';

function NewsCard() {
  const observer = useRef();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.news.isFetching);
  const articles = useSelector(state => state.news.data);
  const currentPage = useSelector(state => state.news.currentPage);
  const totalPages = useSelector(state => state.news.totalPages);
  const [loadingMore, setLoadingMore] = useState(false);

  const lastArticleRef = useCallback(
    node => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setLoadingMore(true);
          dispatch(getNewsList(currentPage + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, currentPage, totalPages, dispatch]
  );
  
  useEffect(() => {
    dispatch(getNewsList());
  }, [dispatch]);

  return (
    <div className="news-container">
      {isFetching && articles.length === 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="card-container">
          {!isFetching && articles.length === 0 ? (
            <p>No news found.</p>
          ) : (
            articles.map((news, index) => {
              const isLastArticle = articles.length === index + 1;
              const key = `${news.id}-${index}`;
              const newsImage = news?.featured_image?.cloudinary_meta?.webp?.original?.url??news?.featured_image?.source
              return (
                <Link key={key} to={`/news/${news.slug}`} className="card-link">
                  <Card ref={isLastArticle ? lastArticleRef : null} className="card">
                    <Card.Img variant="top" className="card-img" src={newsImage} alt={news?.featured_image?.alt || news.title} />
                    <Card.Body className="card-body">
                      <h2 className="news-title">{news.title}</h2>
                      <Card.Text className="news-text">{news.text}</Card.Text>
                      <Button className="card-button" variant="primary">Read more</Button>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      )}
      {loadingMore && <p className="loading">Loading more...</p>}
    </div>
  );
}

export default NewsCard;
