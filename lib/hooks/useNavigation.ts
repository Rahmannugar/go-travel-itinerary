import { useRouter } from "next/navigation";
import { useState } from "react";

type NavigationItem = "activities" | "hotels" | "flights";

export const useNavigation = () => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<NavigationItem | null>(null);

  const navigateTo = (route: NavigationItem) => {
    setActiveRoute(route);
    router.push(`/${route}`);
  };

  const isActiveRoute = (route: NavigationItem) => activeRoute === route;

  return {
    navigateTo,
    isActiveRoute,
    activeRoute,
  };
};
