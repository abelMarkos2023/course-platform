export function formatPlural(length:number, singular:string, plural:string,includeCount : boolean=true) {
    const word= length === 1 ? singular : plural;

    return includeCount ? `${length} ${word}` : word
}

export function formatPrice(amount:number,{showZeroAsNumber = false} = {}){
    const formatter = new Intl.NumberFormat(undefined,{
        style:'currency',
        currency:'USD',
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2
    })
    if(amount == 0 && !showZeroAsNumber) return 'Free'
    return formatter.format(amount)
}