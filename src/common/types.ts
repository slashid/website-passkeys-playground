export interface BlogFrontmatter {
  title: string
  coverImage: string
  category: string
  publishedDate: string
  description?: string[] | string
  author: { name: string; avatar?: string }
}

export interface CareersFrontmatter {
  role: string
  location: string
  jobType: string
}

export interface LegalFrontmatter {
  title: string
  publishedDate: string
}
