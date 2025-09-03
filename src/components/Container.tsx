import { cn } from "@/lib/utils";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
};

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-4xl", 
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
};

export default function Container({ 
  children, 
  className, 
  size = "xl" 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        "mx-auto px-4 md:px-6",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
