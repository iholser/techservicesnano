import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { articlesData } from "@/lib/articles-data"

export default function DocumentsPage() {
  const articles = articlesData

  // Placeholder articles - hidden for now
  // const placeholderArticles = [
  //   {
  //     title: "Essential Computer Maintenance Tips",
  //     category: "Maintenance",
  //     description:
  //       "Learn how to keep your computer running smoothly with regular maintenance tasks and best practices.",
  //     readTime: "5 min read",
  //     icon: <Monitor className="h-5 w-5" />,
  //     tags: ["Beginner", "Maintenance"],
  //   },
  //   {
  //     title: "Understanding Cybersecurity Basics",
  //     category: "Security",
  //     description:
  //       "A comprehensive guide to protecting yourself online, including password management and identifying threats.",
  //     readTime: "8 min read",
  //     icon: <Shield className="h-5 w-5" />,
  //     tags: ["Security", "All Levels"],
  //   },
  //   {
  //     title: "Setting Up Your Home Network",
  //     category: "Networking",
  //     description: "Step-by-step instructions for setting up a secure and reliable home Wi-Fi network.",
  //     readTime: "6 min read",
  //     icon: <Wifi className="h-5 w-5" />,
  //     tags: ["Intermediate", "Networking"],
  //   },
  //   {
  //     title: "Smartphone Security Guide",
  //     category: "Security",
  //     description: "Protect your mobile device with these essential security tips and privacy settings.",
  //     readTime: "4 min read",
  //     icon: <Smartphone className="h-5 w-5" />,
  //     tags: ["Beginner", "Security"],
  //   },
  //   {
  //     title: "Cloud Storage Best Practices",
  //     category: "Cloud Services",
  //     description: "Maximize your cloud storage efficiency and security with these professional tips.",
  //     readTime: "7 min read",
  //     icon: <Cloud className="h-5 w-5" />,
  //     tags: ["Intermediate", "Cloud"],
  //   },
  //   {
  //     title: "Troubleshooting Common PC Issues",
  //     category: "Troubleshooting",
  //     description: "Quick solutions for the most common computer problems you might encounter.",
  //     readTime: "10 min read",
  //     icon: <Search className="h-5 w-5" />,
  //     tags: ["All Levels", "Troubleshooting"],
  //   },
  // ]

  // Placeholder fliers - hidden for now
  // const fliers = [
  //   {
  //     title: "Service Menu & Pricing Guide",
  //     description: "Complete overview of all our services with transparent pricing information.",
  //     fileSize: "2.4 MB",
  //     format: "PDF",
  //   },
  //   {
  //     title: "Cybersecurity Checklist",
  //     description: "Essential security measures to protect your digital life.",
  //     fileSize: "850 KB",
  //     format: "PDF",
  //   },
  //   {
  //     title: "Senior Technology Guide",
  //     description: "Simplified technology tutorials designed specifically for seniors.",
  //     fileSize: "3.1 MB",
  //     format: "PDF",
  //   },
  //   {
  //     title: "Computer Maintenance Schedule",
  //     description: "A handy reference guide for keeping your computer in top condition.",
  //     fileSize: "620 KB",
  //     format: "PDF",
  //   },
  //   {
  //     title: "Small Business IT Solutions",
  //     description: "Technology solutions tailored for small business needs.",
  //     fileSize: "1.8 MB",
  //     format: "PDF",
  //   },
  //   {
  //     title: "Password Management Guide",
  //     description: "Create and manage strong passwords to protect your accounts.",
  //     fileSize: "1.2 MB",
  //     format: "PDF",
  //   },
  // ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
                  Resources & Documentation
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                  Access helpful articles, guides, and downloadable resources to support your technology journey. From
                  beginner tutorials to advanced troubleshooting, we've got you covered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Helpful Articles</h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                Explore our collection of expert-written guides covering essential tech topics. Each article is designed
                to help you understand and solve common technology challenges.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Link key={index} href={`/documents/${article.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">{article.icon}</div>
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">{article.readTime}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{article.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10 transition-colors">
                        Read Article
                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Fliers Section - Hidden for now */}
        {/* <section className="w-full py-12 md:py-20 lg:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Downloadable Resources</h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                Download our professionally designed fliers, guides, and reference materials. Perfect for printing or
                keeping on your device for quick reference.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fliers.map((flier, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-xs">
                          {flier.format}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{flier.fileSize}</p>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{flier.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{flier.description}</p>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-4">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Need More Help?</h3>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  Can't find what you're looking for? Our team is here to answer your questions and provide personalized
                  support for your technology needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/#contact">Contact Us</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/#services">View Our Services</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
