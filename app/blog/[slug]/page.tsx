import blogsData from '@/data/blogs.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // بلاگ تلاش کریں
  const post = blogsData.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0b132b] py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[32px] shadow-xl border border-slate-100">
        <Link href="/" className="text-xs font-bold text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>
        
        <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-extrabold rounded-full uppercase tracking-wider mb-3">
          {post.category}
        </span>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="text-slate-700 text-base leading-relaxed space-y-4">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  )
}
