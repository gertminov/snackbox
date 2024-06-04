const eur = Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
})

export function formatPrice(price: number) {
    return eur.format(price)
}