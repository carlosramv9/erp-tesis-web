export const translateType = (type) => {
    switch (type) {
        case 'loan':
            return 'Préstamo'
        case 'payment':
            return 'Pago'
        case 'transfer':
            return 'Tranferencia'
        case 'deposit':
            return 'Deposito'
        default:
            return ''
    }
}