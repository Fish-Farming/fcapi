module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/sensors",
    "title": "Sensor Group Data",
    "description": "Sensors Group Data",
    "type": "object",
    "properties": {
      "timestamp": {
        "description": "DateTime Record",
        "type": "string"
      },
      "allText": {
        "description": "Body text of the blog article",
        "type": "string"
      },
      "summary": {
        "description": "Optional short text summary of article",
        "type": "string"
      },
      "imageURL": {
        "description": "URL for main image to show in article",
        "type": "uri"
      },
      "published": {
        "description": "Is the article published or not",
        "type": "boolean"
      },
      "authorID": {
        "description": "User ID of the article author",
        "type": "integer",
        "minimum": 0
      },
    },
    "required": ["title", "allText", "authorID"]
  
}
