import { getPortfolioData } from '@/lib/data';
import PortfolioClient from '@/components/portfolio/PortfolioClient';

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function HomePage() {
  const portfolioData = await getPortfolioData();

  return <PortfolioClient data={portfolioData} />;
}
