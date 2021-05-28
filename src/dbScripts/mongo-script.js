var Database = 'nodeCourse'
var Collection = 'restaurant_main'
var DataToLoad = [
    {
        "restID": "R101",
        "restName": "The Reservoire",
        "location": "Bengaluru",
        "rating": 4.5,
        "cuisine": [ "North Indian", "Multicuisine", "Chinese", "European"],
        "budget": 1200,
        "menu": [ 
            {
                "dish": "Hot & Sour",
                "price": 120
            },
            {
                "dish": "Panner Tikka",
                "price": 150
            },
            {
                "dish": "Mushroom Tikka",
                "price": 180
            },
            {
                "dish": "Bririyani",
                "price": 200
            }
        ]
    },
    {
        "restID": "R102",
        "restName": "Roots",
        "location": "Bengaluru",
        "rating": 4.3,
        "cuisine": [ "North Indian", "Multicuisine", "Chinese"],
        "budget": 1200,
        "menu": [ 
            {
                "dish": "Aloo Ghobi Masala",
                "price": 180
            },
            {
                "dish": "Dal Fry",
                "price": 150
            },
            {
                "dish": "Bririyani",
                "price": 200
            }
        ]
    }
];

var MyCollection = db.getSiblingDB(Database).getCollection(Collection);
var session = db.getMongo().startSession();
session.startTransaction();
try {
    printjson({"Pre-remove count": MyCollection.count()});
    // Remove all documents
    MyCollection.remove({});
    
    printjson({"Pre-load count": MyCollection.count()});
    // Insert toLoad
    MyCollection.insert(DataToLoad);

    printjson({"Post-load count": MyCollection.count()});
}
catch (error) {
	session.abortTransaction();
    throw error; 
}
session.commitTransaction();
session.endSession();
