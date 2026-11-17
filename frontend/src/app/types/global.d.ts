declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.svg?react' {
    import type { FC, SVGProps } from 'react';
    const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}