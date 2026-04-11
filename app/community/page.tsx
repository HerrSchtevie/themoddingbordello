import { CommunityLinks } from '@/components/community/CommunityLinks';

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
      <p className="text-bordello-muted mb-8">Connect with The Modding Bordello community.</p>
      <CommunityLinks />
    </div>
  );
}
