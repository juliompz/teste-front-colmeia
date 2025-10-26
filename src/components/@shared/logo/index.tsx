"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link href="/">
      <Image
        src={
          theme === "light"
            ? "/images/logos/colmeiaStoreLogo.png"
            : "/images/logos/colmeiaStoreLogoWhite.png"
        }
        alt="COLMEIASTORE"
        width={100}
        height={26.14}
      />
    </Link>
  );
};

export { Logo };
