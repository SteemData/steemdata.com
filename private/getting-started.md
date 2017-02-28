### Getting Started
To use SteemData from your favorite language, just install the appropriate MongoDB library. You can find one for all major languages like [JavaScript](https://www.npmjs.com/package/mongodb), [Python](http://api.mongodb.com/python/current/installation.html), [Go](http://labix.org/mgo) and [others](https://docs.mongodb.com/manual/applications/drivers/).

You can connect to the public SteemData server via the following URI:
```
mongodb://steemit:steemit@mongo1.steemdata.com:27017/SteemData
```

This tutorial uses **Python**, for which you can install a neat helper library that includes PyMongo and a few extra niceties.

```
pip install -U steemdata
```

**Quick example:**
```
> from steemdata import SteemData

> s = SteemData()

> s.info()
mongodb://steemit:steemit@mongo1.steemdata.com:27017/SteemData

> s.Accounts.find_one({'name':'furion'})['balances']
{'SAVINGS_SBD': 100.0,
 'SAVINGS_STEEM': 0.0,
 'SBD': 6.453,
 'STEEM': 66.157,
 'VESTS': 86491944.341744}
```

### RoboMongo
I highly recommend [RoboMongo](https://robomongo.org/) as a cross-platform GUI utility for playing around with SteemData.

https://vimeo.com/205691651

*You can find sample queries from the video [here](https://gist.github.com/Netherdrake/a844ebf771c96929bee8ddb446d1cfa6)*.


### Collections

#### Accounts
Accounts contains Steem Accounts and their:
- account info / profile
- balances
- vesting routes
- open conversion requests
- voting history on posts
- a list of followers and followings
- witness votes
- curation stats

#### Posts
Here you can find all top-level posts, with full-text search support for content bodies.

#### Operations
Operations contains all the events that happened on the blockchain so far.
You can query for operations in individual blocks, or by time, operation type (comment, transfer, vote...) or arbitrary properties. See [Digging Deeper]() for examples.

#### AccountOperations
Same as operations, but with account ownership attached for easy querying.

#### PriceHistory
Snapshots of Bitcoin, STEEM, SBD and USD implied prices.

---

You can access collections easily via SteemData helper.
```
> s = SteemData()
> [print(x) for x in s.__dict__.keys()]
db
Operations
AccountOperations
PriceHistory
Posts
Accounts
```

We can see a few properties starting with UPPER case letters. These give us easy access to main SteemData collections. Alternatively, you can query a collection via `db` property.

```
s = SteemData()

# these two do the same thing
s.Accounts
s.db['Accounts']
```

### Querying
If you're new to MongoDB, I highly recommend [this querying guide](https://docs.mongodb.com/manual/tutorial/query-documents/).

I will only point out a few gotchas in regards to SteemData.

#### Using Indexes
For best performance on your queries, make sure you're using indexed fields whenever possible. You can check out which fields are indexed by using `index_information()`:
```
s = SteemData()
indexes = list(s.Operations.index_information())
print(indexes)
```

As you will find out, most commonly queried fields are indexed, like `account`/`name`, `type`, `timestamp`, `identifier`, `permlink`, `author`, `memo` to name a few.


#### Using Projection
Using projection will make queries a lot faster, save bandwidth and do the job of only returning the data that you need.

For example, if you're only interested in someone's followers, you can use `projection` to get only that field.

```
s.Accounts.find_one({'name': steemit_username},
                    projection={'followers': 1, '_id': 0})
```

This is similar to `SELECT followers FROM accounts` vs `SELECT * FROM accounts` in SQL.

#### Using Limits
By default, all results will be returned. This could make queries run for longer, and is wasteful, especially if you only need *some* results at a time (ie. top 100).

This is where limits come in, for example, if we need top 100 accounts by SteemPower:
```
q = s.Accounts.find({},
                    projection={'sp': 1, 'name': 1, '_id': 0},
                    sort=[('sp', -1)],
                    limit=100)
print(list(c))
```


#### Pagination
Following the above example, we can get the *next* 100 accounts (100-200) by using `skip` argument

```
q = s.Accounts.find({},
                    projection={'sp': 1, 'name': 1, '_id': 0},
                    sort=[('sp', -1)],
                    limit=100,
                    skip=100)
```

#### Syntax Sugar
If you'd like, you can also use method chaining instead of arguments. For example:
```
s.Accounts.find({}).projection(...).sort(...).limit(100).skip(100)
```


### Example
Lets wrap up with a practical example. The [folowers page on steemit](https://steemit.com/@furion/followers) is pretty bland - it only shows usernames. What if we could spice it up, by displaying users *profile picture, steem-power, reputation, and their own followers statistics*. How would we obtain this data? Here is a function that is powering [an API endpoint that does just that](https://api0.steemdata.com/busy.org/furion/with_metadata/followers).

```
def busy_account_following(account_name, following):
    """
    Fetch users followers or followings and their metadata.
    Returned list is ordered by follow time (newest followers first). \n
    Usage: `GET /busy/<string:account_name>/with_metadata/<string:following>`\n
    `following` must be 'following' or 'followers'.\n
    """
    if following not in ['following', 'followers']:
        raise ParseError(detail='Please specify following or followers.')

    acc = mongo.db['Accounts'].find_one({'name': account_name}, {following: 1, '_id': 0})
    if not acc:
        raise NotFound(detail='Could not find STEEM account %s' % account_name)

    # if follower list is empty
    if not acc[following]:
        return []

    allowed_fields = {
        '_id': 0, 'name': 1, 'sp': 1, 'rep': 1, 'profile.profile_image': 1,
        'followers_count': 1, 'following_count': 1, 'post_count': 1,
    }
    accounts_w_meta = list(mongo.db['Accounts'].find({'name': {'$in': acc[following]}}, allowed_fields))

    # return in LIFO order (last to follow is listed first)
    accounts_ordered = list(repeat('', len(acc[following])))
    for a in accounts_w_meta:
        with suppress(ValueError):
            accounts_ordered[acc[following].index(a.get('name', None))] = a
    return [x for x in accounts_ordered if x][::-1]
```



### Digging Deeper
If you'd like to learn how [SteemData Charts](https://steemdata.com/charts) work behind the scenes, feel free to download and run [this iPython Notebook](https://github.com/SteemData/steemdata-charts/blob/master/Charts.ipynb).
It should give you some ideas of what SteemData can be used for, as well as provides a quick way for you to start playing with code and writing your own.

![](https://i.imgur.com/qw65eQD.png)
