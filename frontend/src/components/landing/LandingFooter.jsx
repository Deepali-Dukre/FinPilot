import Logo from '../ui/Logo';

export default function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <Logo />
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} FinPilot. All rights reserved.</p>
      </div>
    </footer>
  );
}
