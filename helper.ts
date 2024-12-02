export function explodeLinebreaks(text: string): Array<string> {
    return text.split("\n");
}

export function explodeWhitespaces(text: string): Array<string> {
    return text.split(/\s+/);
}