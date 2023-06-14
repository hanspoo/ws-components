import {
    Link,
    useMatch,
    useResolvedPath,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export function CustomLink({ children, to, ...props }: LinkProps) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}
