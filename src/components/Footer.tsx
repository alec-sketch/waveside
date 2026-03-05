import Link from "next/link";
import WaveLogo from "./WaveLogo";

export default function Footer() {
  return (
    <footer className="bg-navy text-ocean-pale mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
              <WaveLogo className="w-7 h-7" />
              <span><span className="text-ocean-light">Wave</span>side</span>
            </h3>
            <p className="text-sm">
              Democratizing surf culture by making wave pool feasibility
              accessible to everyone.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/technologies" className="hover:text-white transition-colors">Technologies</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">Calculator</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ocean/30 mt-8 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Waveside. All rights reserved.</p>
          <p className="mt-2 text-ocean/40 hover:text-sand transition-colors duration-700 cursor-default select-none" title="you found it">
            no waves were harmed in the making of this site &mdash; alec just mass-produced them
          </p>
        </div>
      </div>
    </footer>
  );
}
