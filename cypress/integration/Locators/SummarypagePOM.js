const summaryselector = {		
	"enrollsettings" : 'form > div > div:nth-of-type(4) > div:nth-of-type(1) > div',
	"packs" : 'div[style="min-height: 0px;"] > div > div > div:nth-child(even) > div > b',
	"pv" : 'div[style="min-height: 0px;"] > div > div > div:nth-child(even) >:nth-child(2)',
	"price" : 'div[style="min-height: 0px;"] > div > div > div:nth-child(even) >:nth-child(3)',
	"account" : 'form div div:nth-of-type(4) div:nth-of-type(7) div span',
	"billaddress" : 'div:nth-of-type(9) > div:nth-of-type(2) > div > div',
	"shipping" : 'div:nth-of-type(4) > div > div > label',
	"shipaddress" : 'div:nth-of-type(9) > div:nth-of-type(3) > div > div',
	
	"termsconditions" : '[type="checkbox"]',
	"terms" : '[name="term1"]',
	"payment" : '[name="term2"]',
	"summarycontinue": '[type="submit"]',
	"orderpopup" : '[role="document"]',
	"sucessmessage" : 'div div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1)',
	"ordernumber" : 'div[role=document] > div > div:nth-of-type(2)',
	"distributorid" : 'div[role=document] > div > div:nth-of-type(2)',
	"finish" : 'div[role=document] a',

	"cart" : '.btn > .icon',
	"enroller" : 'div[role="document"]>div> div> span + div > span:nth-child(1)',
	"sponsor" : 'div[role="document"]>div> div> span + div > span:nth-child(2)'

	}
export default summaryselector	