type Snappable = { x: number; y: number; width: number; height: number };

export function getCenter(element: Snappable): { x: number; y: number } {
    return { 
        x: element.x + element.width / 2, 
        y: element.y + element.height / 2 
    };
}

export function isCloseEnough(a: number, b: number, threshold: number): boolean {
    return Math.abs(a - b) <= threshold;
}

export function snapToGrid(currentEl: Snappable, otherEls: Snappable[], snapThreshold: number): Snappable {
    let bestSnapX: number | null = null;
    let bestSnapY: number | null = null;

    for (const otherEl of otherEls) {
        if (isCloseEnough(currentEl.x, otherEl.x, snapThreshold) ||
            isCloseEnough(currentEl.x + currentEl.width, otherEl.x + otherEl.width, snapThreshold)) {
            bestSnapX = isCloseEnough(currentEl.x, otherEl.x, snapThreshold) ? otherEl.x : otherEl.x + otherEl.width - currentEl.width;
        }

        if (isCloseEnough(currentEl.y, otherEl.y, snapThreshold) ||
            isCloseEnough(currentEl.y + currentEl.height, otherEl.y + otherEl.height, snapThreshold)) {
            bestSnapY = isCloseEnough(currentEl.y, otherEl.y, snapThreshold) ? otherEl.y : otherEl.y + otherEl.height - currentEl.height;
        }

        const currentCenter = getCenter(currentEl);
        const otherCenter = getCenter(otherEl);
        if (isCloseEnough(currentCenter.x, otherCenter.x, snapThreshold)) {
            bestSnapX = otherEl.x + (otherEl.width - currentEl.width) / 2;
        }
        if (isCloseEnough(currentCenter.y, otherCenter.y, snapThreshold)) {
            bestSnapY = otherEl.y + (otherEl.height - currentEl.height) / 2;
        }
    }

    return {
        ...currentEl,
        x: bestSnapX !== null ? bestSnapX : currentEl.x,
        y: bestSnapY !== null ? bestSnapY : currentEl.y
    };
}
