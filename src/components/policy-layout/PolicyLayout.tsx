import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PolicyLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const PolicyLayout = ({ title, lastUpdated, children }: PolicyLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/"
          className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mb-8">
              Last updated: {lastUpdated}
            </p>
          )}

          <div className="prose prose-slate max-w-none">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
