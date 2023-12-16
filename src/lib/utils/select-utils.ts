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
