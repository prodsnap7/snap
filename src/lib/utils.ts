import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
    y?: number;
    x?: number;
    start?: number;
    duration?: number;
};

export const flyAndScale = (
    node: Element,
    params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;

    const scaleConversion = (
        valueA: number,
        scaleA: [number, number],
        scaleB: [number, number]
    ) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;

        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;

        return valueB;
    };

    const styleToString = (
        style: Record<string, number | string | undefined>
    ): string => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined) return str;
            return str + `${key}:${style[key]};`;
        }, "");
    };

    return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
            const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
            const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
            const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t
            });
        },
        easing: cubicOut
    };
};

interface Moveable {
    x: number;
    y: number;
    width: number;
    height: number;
}

function normalize(element: Moveable): Moveable {
    let newX = element.x;
    let newY = element.y;
    let newWidth = element.width;
    let newHeight = element.height;

    if (element.width < 0) {
        newX = element.x + element.width;
        newWidth = Math.abs(element.width);
    }
    if (element.height < 0) {
        newY = element.y + element.height;
        newHeight = Math.abs(element.height);
    }

    return { x: newX, y: newY, width: newWidth, height: newHeight };
}

export function isOverlapping(element1: Moveable, element2: Moveable): boolean {
    const normalizedElement2 = normalize(element2);

    // Check if one element is to the right of the other
    if (element1.x + element1.width <= normalizedElement2.x || 
        normalizedElement2.x + normalizedElement2.width <= element1.x) {
        return false;
    }

    // Check if one element is above the other
    if (element1.y + element1.height <= normalizedElement2.y || 
        normalizedElement2.y + normalizedElement2.height <= element1.y) {
        return false;
    }

    // If neither is true, there is an overlap
    return true;
}


export type MakeOneRequired<T, K extends keyof T> = Partial<T> & { [P in K]-?: T[P] };
