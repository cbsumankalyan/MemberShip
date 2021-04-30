const paymentselector = {	
	"ccname": '[name="creditCardName"]',
	"ccnumber": '[name="creditCardNumber"]',
	"creditcardmonth": '[name="creditCardMonth"]',
	"creditcardyear": '[name="creditCardYear"]',
	"cvv": '[name="creditCardCVV"]',

	"Billingaddress1": '[name="billing_address_line1"]',
	"Billingaddress1postalcode": '[name="billing_address_postal_code"]',
	"Billingaddress1city": '[name="billing_address_city"]',
	"Billingaddress1state":'[name="billing_address_state"]',

	"Sameasbilling" : '[name="copyBillingAddress"]',
	"shippaddress1" : '[name="shipping_address_line1"]',
	"shippaddress2" : '[name="shipping_address_line2"]',
	"shipppostalcode" : '[name="shipping_address_postal_code"]',
	"shippcity" : '[name="shipping_address_city"]',
	"shippstate" : '[name="shipping_address_state"]',
	


	"Paymentcontinue": '[type="submit"]',
	"Shippingmethods": '[name="shippingMethod"]',
	"Usethisaddress": 'div:nth-of-type(1) > div > div:nth-of-type(3) > button'

}
export default paymentselector	