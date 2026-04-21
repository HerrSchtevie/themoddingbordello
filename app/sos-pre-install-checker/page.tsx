import { Suspense } from 'react';
import { PreInstallChecker } from '@/components/checker/PreInstallChecker';

export const metadata = {
  title: 'SOS Pre-Install Checker | The Modding Bordello',
  description:
    'Validate your hardware and storage setup before installing a Wabbajack modlist from The Modding Bordello.',
};

interface PageProps {
  searchParams?: {
    list?: string;
    profile?: string;
  };
}

export default function PreInstallCheckerPage({ searchParams }: PageProps) {
  const initialList = searchParams?.list;
  const initialProfile = searchParams?.profile;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">SOS Pre-Install Checker</h1>
        <p className="text-bordello-muted">
          Confirm your system and install setup are ready before installing a Bordello modlist.
          This tool does not scan your machine or predict performance — it validates the
          values you enter against the published requirements.
        </p>
      </div>

      <Suspense fallback={<div className="text-bordello-muted">Loading…</div>}>
        <PreInstallChecker initialList={initialList} initialProfile={initialProfile} />
      </Suspense>
    </div>
  );
}
