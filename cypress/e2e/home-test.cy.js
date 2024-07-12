describe('Test Automation', ()=> {
    let productName;
    beforeEach(()=> {
        cy.visit('https://www.automationexercise.com/')
    })

    it('Test 1', ()=> {
        cy.get('.features_items').contains('h2', 'Features Items')
        cy.get('.brands_products').contains('Brands')
    })

    it('Test 2', ()=> {
        cy.get('a').contains('Products').click()
        cy.get('.features_items').contains('All Products')
        cy.get('.features_items').find('div.col-sm-4').each((value, index)=> {
            if(index == 0) {
                cy.wrap(value).within(()=> {
                    cy.get('.productinfo').find('p').invoke('text').then((value)=> {
                        productName = value;
                    })
                    cy.get('a').contains('Add to cart').click()
                })
            }
        })
        cy.get('.modal-body').contains('Your product has been added to cart.')
        cy.get('a').contains('Cart').click()
        cy.get('.cart_description').find('a').invoke('text').then((value)=> {
            expect(value).equals(productName)
        })
    })
})