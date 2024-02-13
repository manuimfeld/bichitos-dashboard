import Link from "next/link";

export default function SidebarLinks({ item }) {
  return (
    <Link
      href={item.path}
      className="flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base"
    >
      <span className="text-xl">{item.icon()}</span>
      {item.label}
    </Link>
  );
}
