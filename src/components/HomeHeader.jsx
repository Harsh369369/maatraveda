import React from "react";
import { Link } from "../utils/router-compat";
import { MapPin, Heart, User } from "lucide-react";

export default function HomeHeader({ user, userIsAuthenticated }) {
  return (
    <div className="md:hidden flex items-center justify-between px-6 pt-5 pb-2 bg-[#FAF7F2]">
      <Link
        to={userIsAuthenticated ? "/profile" : "/login"}
        className="flex items-start gap-2.5 text-left cursor-pointer hover:opacity-85 transition-opacity"
      >
        <MapPin className="h-5 w-5 text-[#5B7917] mt-0.5 shrink-0 stroke-[2.5]" />
        <div className="flex flex-col">
          <span className="text-[10px] font-sans font-black text-[#5B7917] uppercase tracking-wider leading-none">
            {userIsAuthenticated ? "Deliver to" : "HOME"}
          </span>
          <span className="text-sm font-sans font-black text-[#0D3500] leading-tight block mt-0.5">
            {userIsAuthenticated && user
              ? user.address || user.city || "Add Delivery Address"
              : "Amrapali Golf Homes"}
          </span>
          <span className="text-[11px] font-sans font-medium text-charcoal/50 leading-tight block mt-0.5">
            {userIsAuthenticated && user
              ? ""
              : "Noida"}
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          to="/wishlist"
          className="w-10 h-10 rounded-full bg-white border border-[#D8D5CD]/60 text-charcoal/80 hover:shadow-md flex items-center justify-center shadow-xs transition-all"
        >
          <Heart className="h-4.5 w-4.5 stroke-[2]" />
        </Link>
        <Link
          to="/profile"
          className="w-10 h-10 rounded-full bg-white border border-[#D8D5CD]/60 text-charcoal/80 hover:shadow-md flex items-center justify-center shadow-xs transition-all overflow-hidden"
        >
          {userIsAuthenticated && user ? (
            <span className="font-sans font-black text-xs text-mv-dark-green">
              {user.name.slice(0, 2).toUpperCase()}
            </span>
          ) : (
            <User className="h-4.5 w-4.5 stroke-[2]" />
          )}
        </Link>
      </div>
    </div>
  );
}
