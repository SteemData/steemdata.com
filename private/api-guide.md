
#### API Root: [https://webapi.steemdata.com](https://webapi.steemdata.com)

## Features

### XML and JSON support
The API will return XML or JSON, based on your request headers.
To get json, simply pass `Content-Type: application/json`.

### Simple Querying
We can query for various simple conditions using a `where` field. For example,
we could look up an individual user by username like this:
```
https://webapi.steemdata.com/Accounts?where=name==furion
```

Alternatively, we can also construct more powerful queries by passing in MongoDB
query objects.

For example, lets find all transfers incoming to a specific account (@furion):
```
https://webapi.steemdata.com/Operations?where={"type": "transfer", "to": "furion"}
```

### Sorting
We can sort by using a `sort` field. Prepending field name with `-` changes order from ascending to descending.

For example, we can find latest transfers with this query:
```
https://webapi.steemdata.com/Operations?where=type==transfer&sort=-timestamp
```


### HATEOAS for navigation and pagination
[HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) is a specification for linking to resources. These links can be followed by the client programatically.

For example, `GET https://webapi.steemdata.com/Operations` will contain the following links:
```
{
  "_meta": {
    "page": 1,
    "max_results": 50,
    "total": 34679606
  },
  "_links": {
    "last": {
      "href": "Operations?page=693593",
      "title": "last page"
    },
    "parent": {
      "href": "/",
      "title": "home"
    },
    "next": {
      "href": "Operations?page=2",
      "title": "next page"
    },
    "self": {
      "href": "Operations",
      "title": "Operations"
    }
  },
  "_items": [
    ...
  ]
}
```

We can simply follow the links for pagination, as well as see how many pages there are.

Additionally, each item will also have a link to itself:
```
"_items": [
  {
    "_links": {
        "self": {
          "href": "Operations/e35709a49ee67090905a42cebabf8eee9f0de11d",
          "title": "Operation"
        }
      },
    ...
  }
]
```

## Available Endpoints
WebAPI gives you access to all SteemData MongoDB collections.

[https://webapi.steemdata.com/Operations](https://webapi.steemdata.com/Operations)  
[https://webapi.steemdata.com/AccountOperations](https://webapi.steemdata.com/AccountOperations)  
[https://webapi.steemdata.com/Accounts](https://webapi.steemdata.com/Accounts)  
[https://webapi.steemdata.com/Posts](https://webapi.steemdata.com/Posts)  
[https://webapi.steemdata.com/Comments](https://webapi.steemdata.com/Comments)  
[https://webapi.steemdata.com/PriceHistory](https://webapi.steemdata.com/PriceHistory)  

Feel free to play around with this with `curl` or a GUI tool like `Postman`.



## Need custom functionality for your app?
While WebAPI can work well for most of data fetching related queries, occasionally, a more complex solution is required.

If you need a fast, bandwidth efficient, composite or aggregate query, or custom business logic, feel free to contact me, and I will create you a custom endpoint.

Available API's:
[https://api.steemdata.com](https://api.steemdata.com)