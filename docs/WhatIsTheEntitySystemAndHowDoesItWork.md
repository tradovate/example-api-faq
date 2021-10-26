# What is the Entity System and How Does it Work?

The Entity System is the way that we classify data that can be retrieved or modified by using the Tradovate API. There are many different entity types, but there are also relationships between those types that can help us understand how to work with them.

The first major concept of the entity system is that each entity has a unique identifier, id. The id of any entity can be used to find that single entity instance. We can use the type of the entity to determine what endpoint to use to perform operations related to it. For example, if we wanted to find a list of accounts associated with our logged-on user, we would use the `/account/list` endpoint. However, this is only one of several standard entity operations. Every entity type that we can interact with has a basic set of operations that we can use. These operations have a simple naming pattern that works like this:

```
    /entityType/operation
```

Here are the operations common to all the entity types:

    * `/entityType/list` - retrieve all entities of `entityType` associated with your logged-in user.

    * `/entityType/item` - retrieve an entity of `entityType` by it’s id property.

    * `/entityType/items` - retrieve multiple entities of `entityType` by a list of id’s.

    * `/entityType/find` - retrieve an entity of `entityType` by it’s name.

    * `/entityType/deps` - retrieve all of the dependent entities for an instance of `entityType` by a `masterid`, where `masterid` is an entity's integer id.

    * `/entityType/ldeps` - retrieve all of the dependent entities for multiple instances of `entityType` by `masterids`, where `masterids` is a list of entities' integer id’s.

`entityType` above refers to any of these possible values:

* user
* account
* accountRiskStatus
* marginSnapshot
* userAccountAutoLiq
* cashBalance
* currency
* position
* fillPair
* order
* contract
* contractMaturity
* product
* exchange
* spreadDefinition
* command
* commandReport
* executionReport
* orderVersion
* fill
* orderStrategy
* orderStrategyLink
* userProperty
* property
* userPlugin
* contractGroup
* orderStrategyType

One caveat about working with the `/find` endpoints - if the entity type you’re operating on does not have a name field, the `/find` endpoint will never return anything. So for example, the position entity type doesn’t have a `name` field. Therefore, the `/find` endpoint is irrelevant for that particular entity type.