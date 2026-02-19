interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  isActive: boolean;
}

interface AdBannerProps {
  ad: Ad;
}

export default function AdBanner({ ad }: AdBannerProps) {
  return (
    <a
      href={ad.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded overflow-hidden border border-steam-border hover:border-steam-blue-dark transition-colors group"
    >
      <div className="bg-steam-card aspect-[2/3] flex items-center justify-center p-3">
        <div className="text-center">
          <div className="text-steam-text-muted text-xs mb-2 uppercase tracking-wider">
            AD
          </div>
          <div className="text-steam-text text-xs font-medium group-hover:text-steam-blue transition-colors">
            {ad.title}
          </div>
        </div>
      </div>
    </a>
  );
}
