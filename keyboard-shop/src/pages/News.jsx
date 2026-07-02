import { Link } from "react-router-dom";
import { newsData } from "../data/newsData";

export default function News() {
  const featuredArticle = newsData[0];
  const sideArticles = newsData.slice(1, 3);
  const gridArticles = newsData.slice(3);

  return (
    <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      {/* Header Section */}
      <header className="mb-xl text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-gutter">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-sm">News & Insights</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Dive deep into the world of mechanical keyboards. From switch teardowns to artisan keycap spotlights, we bring you precision-engineered knowledge.</p>
        </div>
        {/* Category Chips */}
        <div className="flex flex-wrap gap-xs justify-center md:justify-end">
          <button className="bg-[#F5E6FF] text-primary-container font-label-sm text-label-sm px-4 py-2 rounded-full hover:bg-surface-container-high transition-colors">All</button>
          <button className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-4 py-2 rounded-full hover:bg-surface-container-high transition-colors">Guides</button>
          <button className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-4 py-2 rounded-full hover:bg-surface-container-high transition-colors">Reviews</button>
          <button className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-4 py-2 rounded-full hover:bg-surface-container-high transition-colors">News</button>
        </div>
      </header>

      {/* Featured Article (Bento Style) */}
      <section className="mb-xl grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <Link to={`/news/${featuredArticle.id}`} className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden card-hover group cursor-pointer relative h-[500px] block">
          <img alt="Featured Image" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={featuredArticle.image}/>
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-lg w-full">
            <span className="inline-block bg-primary-container text-white font-label-sm text-label-sm px-3 py-1 rounded-full mb-md">{featuredArticle.category}</span>
            <h2 className="font-headline-md text-headline-md text-white mb-sm group-hover:text-inverse-primary transition-colors">{featuredArticle.title}</h2>
            <p className="font-body-md text-body-md text-surface-variant max-w-2xl mb-md">{featuredArticle.summary}</p>
            <div className="flex items-center gap-sm text-inverse-on-surface font-label-sm text-label-sm">
              <span>{featuredArticle.date}</span>
              <span className="w-1 h-1 bg-outline rounded-full"></span>
              <span>{featuredArticle.readTime}</span>
            </div>
          </div>
        </Link>
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {sideArticles.map(article => (
            <Link key={article.id} to={`/news/${article.id}`} className="flex-1 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden card-hover p-md flex flex-col justify-between cursor-pointer block">
              <div>
                <span className="inline-block bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm px-3 py-1 rounded-full mb-md">{article.category}</span>
                <h3 className="font-headline-md text-[20px] leading-snug text-on-surface mb-sm">{article.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">{article.summary}</p>
              </div>
              <div className="mt-md text-secondary font-label-sm text-label-sm">{article.date}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Grid Articles */}
      <h2 className="font-headline-md text-headline-md text-on-surface mb-lg border-b border-outline-variant pb-sm">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {gridArticles.map(article => (
          <Link key={article.id} to={`/news/${article.id}`} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden card-hover flex flex-col cursor-pointer block">
            <div className="h-48 relative overflow-hidden bg-surface-container-high">
              <img alt="Article Image" className="w-full h-full object-cover" src={article.image}/>
            </div>
            <div className="p-md flex flex-col flex-grow">
              <span className="text-primary font-label-sm text-label-sm mb-xs">{article.category}</span>
              <h3 className="font-headline-md text-[20px] leading-snug text-on-surface mb-sm hover:text-primary transition-colors">{article.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md flex-grow line-clamp-3">{article.summary}</p>
              <div className="flex items-center justify-between mt-auto pt-md border-t border-surface-container-high">
                <span className="text-secondary font-label-sm text-label-sm">{article.date}</span>
                <span className="material-symbols-outlined text-outline">arrow_forward</span>
              </div>
            </div>
          </Link>
        ))}
        {/* Newsletter CTA */}
        <div className="md:col-span-1 lg:col-span-2 bg-[#F1F5F9] rounded-xl border border-outline-variant p-lg flex flex-col justify-center items-center text-center">
          <span className="material-symbols-outlined text-[48px] text-primary mb-sm">mail</span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Stay Updated</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg max-w-md">Get the latest reviews, guides, and news delivered straight to your inbox weekly.</p>
          <div className="flex w-full max-w-md">
            <input className="flex-grow bg-white border border-outline-variant rounded-l-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-body-md text-body-md text-on-surface" placeholder="Your email address" type="email"/>
            <button className="bg-primary-container text-white px-6 py-2 rounded-r-lg font-label-sm text-label-sm hover:bg-primary-container/90 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="mt-xl flex justify-center items-center gap-sm">
        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-[#F5E6FF] text-primary-container font-label-sm text-label-sm font-bold flex items-center justify-center">1</button>
        <button className="w-10 h-10 rounded-full border border-outline-variant hover:bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition-colors">2</button>
        <button className="w-10 h-10 rounded-full border border-outline-variant hover:bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center transition-colors">3</button>
        <span className="text-on-surface-variant">...</span>
        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
