type Source = {
  id: string;
  name: string;
};

type NewsArticle = {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type NewsResponse = {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
};

type NewsQueryParams = {
  pageSize: number;
  page: number;
};
