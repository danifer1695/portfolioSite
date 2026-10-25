import { createNavigation } from 'next-intl/navigation';
import { routing } from './routings';

export const { Link, usePathname, getPathname } = createNavigation(routing);
