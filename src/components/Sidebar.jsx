const links = [
  { label: "Home", path: "/", icon: "⌂" },
  { label: "Explore", path: "/explore", icon: "↗" },
  { label: "Subscriptions", path: "/subscriptions", icon: "▣" },
  { label: "Library", path: "/library", icon: "▤" },
];

function Sidebar({ currentPath }) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 border-r border-neutral-200 bg-white p-3 md:block">
      <nav className="space-y-1">
        {links.map((link) => {
          const isActive = currentPath === link.path;

          return (
            <a
              key={link.path}
              href={`#${link.path}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                isActive
                  ? "bg-neutral-100 text-neutral-950"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <span className="grid h-6 w-6 place-items-center text-lg">
                {link.icon}
              </span>
              {link.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
