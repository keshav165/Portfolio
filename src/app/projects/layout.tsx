import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Keshav Reddy',
  description: 'Explore my portfolio of projects in AI/ML, Computer Vision, and Full-Stack Development.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
