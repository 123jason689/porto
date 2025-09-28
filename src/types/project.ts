export default interface Project {
    title: string,
    summary: string
    role: string,
    features: string, 
    tech: string,
    achievement: string,
    next: string,
    color: string,
    highlights: string[],
    model?: string
    image?: string
    links?: { label: string; url: string }[]
}