export const translateType = (type) => {
    switch (type) {
        case 'reqLoan':
            return 'Préstamo'
        case 'giveLoan':
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