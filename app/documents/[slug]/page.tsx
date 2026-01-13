import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Tag, ExternalLink, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { getArticleBySlug, articlesData } from "@/lib/articles-data"

export function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-4xl">
            <Button variant="ghost" size="sm" asChild className="mb-6">
              <Link href="/documents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documents
              </Link>
            </Button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{article.category}</Badge>
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {article.title}
              </h1>

              <p className="text-xl text-muted-foreground">
                {article.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-4xl">
            <article className="prose prose-gray dark:prose-invert max-w-none">
              {article.content.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-foreground">
                    {section.title}
                  </h2>

                  {section.content && (
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {section.content}
                    </p>
                  )}

                  {section.list && (
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <ul className="space-y-4">
                          {section.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                {item.url ? (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                                  >
                                    {item.name}
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                ) : (
                                  <span className="font-medium">{item.name}</span>
                                )}
                                {item.note && (
                                  <span className="ml-2 text-sm text-muted-foreground italic">
                                    {item.note}
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {section.points && (
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {section.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground leading-relaxed">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {section.subsections && (
                    <div className="space-y-6 mb-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <h3 className="text-2xl font-semibold mb-4 text-foreground">
                            {subsection.title}
                          </h3>
                          {subsection.content && (
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {subsection.content}
                            </p>
                          )}
                          {subsection.points && (
                            <Card>
                              <CardContent className="pt-6">
                                <ul className="space-y-3">
                                  {subsection.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start gap-3">
                                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                      <span className="text-muted-foreground leading-relaxed">
                                        {point}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.tools && (
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {section.tools.map((tool, toolIndex) => (
                            <div key={toolIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-foreground">
                                  {tool.name}:
                                </span>{" "}
                                <span className="text-muted-foreground">
                                  {tool.description}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {section.additionalInfo && (
                    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                      <p className="text-muted-foreground leading-relaxed">
                        {section.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </article>
          </div>
        </section>

        {/* Navigation */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <Button variant="outline" size="lg" asChild>
                <Link href="/documents">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Articles
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/#contact">Get Help</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 items-center">
          <p className="text-xs text-muted-foreground">© 2026 Tech Services Nano. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="/#services" className="text-xs hover:underline underline-offset-4">
              Services
            </Link>
            <Link href="/documents" className="text-xs hover:underline underline-offset-4">
              Documents
            </Link>
            <Link href="/#contact" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
