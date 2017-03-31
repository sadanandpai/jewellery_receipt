# Api for jewellery shop receipt application

### Get all Records
```
Method: GET
url: https://jewel-api.herokuapp.com/jewel/
```
------------------------------------------------------------------------------
###Get with ID
```
Method: GET
url: https://jewel-api.herokuapp.com/jewel/:id
e.g: https://jewel-api.herokuapp.com/jewel/58673734f283560528493f3e
```
------------------------------------------------------------------------------
###Insert Record
```
Method: POST
url: https://jewel-api.herokuapp.com/jewel/
Content-Type: application/json
Data Structure: 
	invoice_num: Number ,
	buyer: String,
	seller: String,
	items: [],
	total_items: Number,
	labour_cost: Number,
	gross_amt: Number,
	vat: Number,
e.g:
{
	"invoice_num": "1001",
	"buyer": "Utkarsh",
	"seller": "Utkarsh sell",
	"items" : [{"item_no": "1","item_name":"master1 jewel","qty":"1","amt":"1000"},
			   {"item_no": "2","item_name":"master2 jewel","qty":"100","amt":"9999"},
			   {"item_no": "3","item_name":"master3 jewel","qty":"5","amt":"100000"}
			  ],
	"total_items":"3",
	"labour_cost": 300,
	"gross_amt":110999,
	"vat" : 2
}
```
------------------------------------------------------------------------------
###Soft Delete
```
Method: DELETE
url: https://jewel-api.herokuapp.com/jewel/:id
e.g: https://jewel-api.herokuapp.com/jewel/58673734f283560528493f3e
```

------------------------------------------------------------------------------
###Number of invoices in DB
```
Method: GET
url: https://jewel-api.herokuapp.com/jewel-inv
```
------------------------------------------------------------------------------

## Thank You Masters
