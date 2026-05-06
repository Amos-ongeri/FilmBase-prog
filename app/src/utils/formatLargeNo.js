//removes 0s and replace with letter e.g 20000000 to $20M
export const formatNumber = (number) => {
    if(!number || number === 0) return "N/A";
    const units = ["", "K", "M", "B", "T"];
    const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

    const suffix = units[tier];

    const scale = Math.pow(10, tier * 3);

    const scaled = number / scale;

    return "$" + scaled.toFixed(1).replace(/\.0$/,"") + suffix;
}