export const toFahrenheit = (celsius: number | undefined) => {
    if(celsius !== undefined) return Math.round((celsius * 9/5) + 32);
}