interface Source {
  id: string;
  name: string;
}

interface TopHeadlineArticle {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

type TopHeadlinesResponse = {
  status: string;
  totalResults: number;
  articles: TopHeadlineArticle[];
};

interface TopHeadlinesQueryParams {
  pageSize: number;
  page: number;
}
