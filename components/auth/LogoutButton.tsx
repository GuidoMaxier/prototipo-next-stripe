import { signOut } from "@/lib/auth";

interface LogoutButtonProps {
  className?: string;
  label?: string;
  variant?: "nav" | "sidebar";
}

export default function LogoutButton({ className, label = "LOGOUT", variant }: LogoutButtonProps) {
  // Common style for the dashboard sidebar
  const sidebarStyles = "btn btn-ghost btn-block btn-sm text-red-500 font-bold rounded-lg text-[10px] uppercase tracking-widest hover:bg-red-500/10";
  
  // Common style for the main navbar dropdown
  const navStyles = "text-red-500 font-bold text-xs uppercase tracking-widest w-full text-center py-3 px-3 hover:bg-red-500/5 rounded-xl transition-colors block";

  const finalClassName = className || (variant === "sidebar" ? sidebarStyles : variant === "nav" ? navStyles : "");

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className={variant === "sidebar" ? "w-full" : ""}
    >
      <button type="submit" className={finalClassName}>
        {label}
      </button>
    </form>
  );
}
