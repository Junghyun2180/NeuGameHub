interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  isActive: boolean;
}

interface ThreeColumnLayoutProps {
  children: React.ReactNode;
  leftAds?: Ad[];
  rightAds?: Ad[];
}

function AdSidebar({ ads }: { ads: Ad[] }) {
  if (ads.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-20 space-y-4">
      {ads.map((ad) => (
        <a
          key={ad.id}
          href={ad.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded overflow-hidden border border-steam-border hover:border-steam-blue-dark transition-colors group"
        >
          {/* If the ad has a real image URL, show it; otherwise show placeholder */}
          {ad.imageUrl && ad.imageUrl.startsWith("http") ? (
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="bg-steam-card aspect-[2/3] flex items-center justify-center p-3">
              <div className="text-center">
                <div className="text-steam-text-muted text-[10px] mb-2 uppercase tracking-wider">
                  AD
                </div>
                <div className="text-steam-text text-xs font-medium group-hover:text-steam-blue transition-colors leading-tight">
                  {ad.title}
                </div>
              </div>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}

export default function ThreeColumnLayout({
  children,
  leftAds = [],
  rightAds = [],
}: ThreeColumnLayoutProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Left Ad Column - hidden below lg breakpoint (1024px) */}
        <aside className="hidden lg:block w-[160px] shrink-0">
          <AdSidebar ads={leftAds} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">{children}</main>

        {/* Right Ad Column - hidden below lg breakpoint (1024px) */}
        <aside className="hidden lg:block w-[160px] shrink-0">
          <AdSidebar ads={rightAds} />
        </aside>
      </div>
    </div>
  );
}
