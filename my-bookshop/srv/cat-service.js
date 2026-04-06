module.exports = (srv) => {
    const { Books } = cds.entities('my.bookshop')

    srv.after('READ', 'Books', (each) => {
        if (each.stock > 111) {
            each.title += ' -- 11% discount!';
        }



    })

    srv.before('CREATE', 'Orders', async(req) => {
        const order = req.data
        if(!order.amount || order.amount <= 0) {
            return req.error(400, 'Amount must be a positive integer')
        }
        const tx = cds.transaction(req)
        const affectedRows = await tx.run(
            UPDATE(Books)
                .set({'stock': { '-=': order.amount }})
                .where({ id: order.book_id, stock: { '>=': order.amount } })

        )
        if (affectedRows === 0) {
            req.error(409, 'Not enough stock available')
        }
    })

}