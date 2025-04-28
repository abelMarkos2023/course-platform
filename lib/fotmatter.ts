export function formatPlural(length:number, singular:string, plural:string,includeCount : boolean=true) {
    const word= length === 1 ? singular : plural;

    return includeCount ? `${length} ${word}` : word
}