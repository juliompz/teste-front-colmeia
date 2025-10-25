"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          variant={"ghost"}
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Alterar tema</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { ThemeToggle };
