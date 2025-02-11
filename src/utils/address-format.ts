function formatAddress(address: string): string {
    return address.replace(/#/, " No ").replace(/\s+/g, "+");
}

export default formatAddress