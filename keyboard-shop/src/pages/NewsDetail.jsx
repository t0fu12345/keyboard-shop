import { Link, useParams } from "react-router-dom";
import { newsData } from "../data/newsData";

export default function NewsDetail() {
  const { id } = useParams();
  const article = newsData.find(a => a.id === id);

  if (!article) {
    return (
      <div className="pt-32 pb-xl max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h1 className="font-display-lg text-headline-md mb-4 text-on-surface">Article Not Found</h1>
        <Link to="/news" className="text-primary hover:underline">← Back to News</Link>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-xl max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
      {/* Main Content */}
      <article className="md:col-span-8 bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden">
        {/* Hero Image */}
        <div className="w-full h-[400px] relative">
          <img alt="Hero" className="w-full h-full object-cover" src={article.image}/>
        </div>
        <div className="p-lg">
          {/* Meta */}
          <div className="flex items-center gap-sm mb-md">
            <span className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">{article.category}</span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">{article.date}</span>
            <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span> {article.readTime}
            </span>
          </div>
          {/* Title */}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-lg">{article.title}</h1>
          {/* Author */}
          <div className="flex items-center gap-md mb-xl border-b border-surface-container pb-md">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
              <img alt="Author" className="w-full h-full object-cover" src={article.authorImage}/>
            </div>
            <div>
              <p className="font-headline-md text-[16px] font-semibold text-on-surface">{article.author}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">{article.authorRole}</p>
            </div>
          </div>
          {/* Content Body */}
          <div className="font-body-lg text-body-lg text-on-surface space-y-lg">
            {article.content.map((block, idx) => {
              if (block.type === 'paragraph') {
                return <p key={idx} className="leading-relaxed">{block.text}</p>;
              } else if (block.type === 'heading') {
                return <h2 key={idx} className="font-headline-md text-headline-md text-on-surface mt-xl mb-md">{block.text}</h2>;
              } else if (block.type === 'list') {
                return (
                  <ul key={idx} className="list-none space-y-md ml-sm border-l-2 border-primary-container pl-md">
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
            {/* Keeping the tech spec static mock for demonstration purposes if desired, but we can just leave it out as it's article specific. */}
          </div>
        </div>
      </article>
      
      {/* Sidebar */}
      <aside className="md:col-span-4 space-y-xl">
        {/* Related News */}
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-md">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Related Insights</h3>
          <div className="space-y-md">
            {newsData.filter(a => a.id !== article.id).slice(0, 3).map(related => (
              <Link key={related.id} className="group block border-b border-surface-container pb-md last:border-0 last:pb-0" to={`/news/${related.id}`}>
                <p className="font-body-md text-body-md text-on-surface group-hover:text-primary-container transition-colors font-medium">{related.title}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">{related.date}</p>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-md">
          <h3 className="font-headline-md text-[18px] font-semibold text-on-surface mb-md">Popular Tags</h3>
          <div className="flex flex-wrap gap-xs">
            <span className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#F5E6FF] hover:text-[#BD00FF] transition-colors">#CustomKB</span>
            <span className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#F5E6FF] hover:text-[#BD00FF] transition-colors">#MechanicalKeyboard</span>
            <span className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#F5E6FF] hover:text-[#BD00FF] transition-colors">#Guide</span>
            <span className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#F5E6FF] hover:text-[#BD00FF] transition-colors">#Switches</span>
            <span className="bg-[#F1F5F9] text-[#475569] font-label-sm text-label-sm px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#F5E6FF] hover:text-[#BD00FF] transition-colors">#Mods</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
