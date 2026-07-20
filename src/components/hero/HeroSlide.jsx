import React from "react";
import { Link } from "../../utils/router-compat";

export default function HeroSlide({ slide }) {
  return (
    <Link
      to={slide.primaryButton?.link || "/products"}
      className="absolute inset-0 block cursor-pointer z-10"
    >
      <picture className="absolute inset-0 w-full h-full">
        <source media="(max-width:767px)" srcSet={slide.mobileImage || slide.desktopImage} />
        <img
          src={slide.desktopImage}
          alt={slide.title || "Maatraveda Ayurvedic Wellness"}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </picture>
    </Link>
  );
}
