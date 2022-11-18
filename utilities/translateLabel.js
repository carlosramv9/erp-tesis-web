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

export const translateBankOperations = (type) => {
    switch (type) {
        case 'pendient':
            return 'Pendiente'
        case 'accepted':
            return 'Aceptado'
        case 'verifying':
            return 'Verificando'
        case 'verified':
            return 'Verificado'
        case 'paid':
            return 'Pagado'
        case 'complete':
            return 'Completo'
        case 'cancelled':
            return 'Cancelado'
        case 'refused':
            return 'Rechazado'
        default:
            return ''
    }
}