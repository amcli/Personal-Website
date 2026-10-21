export default function SiteFooter({ className = "" }) {
  return (
    <footer className={`flex flex-col gap-2 border-t border-ff-teal/15 pt-6 text-sm text-ff-muted ${className}`}>
      <p className="font-hud text-xs leading-relaxed text-ff-teal/70">
        "Though they are but specks, they shine brighter than the stars at night."
        <span className="text-ff-muted/80"> — Firefly, Honkai: Star Rail</span>
      </p>
      <p>&copy; {new Date().getFullYear()} Andrew M C Li. All rights reserved.</p>
      <p>Website created with React.js, HTML, CSS Tailwind, and Vite</p>
    </footer>
  );
}
