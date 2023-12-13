## List

### Danh sách cuộc hội thoại

GET /ai-chat/contexts

```json
{
    "status": "OK",
    "data": [
        {
            "id": 1,
            "title": "Tiêu đề cuộc hội thoại 1",
            "createdAt": 1686109014,
            "updatedAt": 1686109014
        },
        {
            "id": 2,
            "title": "Tiêu đề cuộc hội thoại 2",
            "createdAt": 1686109014,
            "updatedAt": 1686109014
        }
    ]
}
```

### Xóa cuộc hội thoại

DELETE /ai-chat/contexts/{context_id}

```json
{
    "status": "OK",
    "data": null
}
```

### Chi tiết cuộc hội thoại

GET /ai-chat/messages?contextId=1&cursor=10&limit=10

```json
{
    "status": "OK",
    "data": {
        "nextCursor": 1,
        "limit": 10,
        "messages": [
            {
                "id": 1,
                "role": "user",
                "content": "Hello",
                "createdAt": 1686109014,
                "updatedAt": 1686109014
            },
            {
                "id": 2,
                "role": "assistant",
                "content": "Hi",
                "createdAt": 1686109014,
                "updatedAt": 1686109014
            },
        ]
    }
}
```


Trường hợp không còn gì:

```json
{
    "status": "OK",
    "data": {
        "nextCursor": 0,
        "limit": 10,
        "messages": []
    }
}
```

- Nếu cursor = null hoặc undefined sẽ lấy các tin nhắn mới nhất
- Nếu cursor = 1 số thì sẽ lấy các tin nhắn cũ hơn tin có id là số cursor


### Gửi tin nhắn

POST /ai-chat/messages

body:

```json
{
    "contextId": 1,
    "content": "Hello",
}
```

- Nếu contextId = null thì là new chat


response:

```json
{
    "status": "OK",
    "data": {
        "context": {
            "id": 1,
            "title": "Hello",
            "createdAt": 1686109014,
            "updatedAt": 1686109014,
        },
        "user": {
            "id": 1,
            "role": "user",
            "content": "Hello",
            "createdAt": 1686109014,
            "updatedAt": 1686109014
        },
        "assistant": {
            "id": 2,
            "role": "assistant",
            "content": "Hi",
            "createdAt": 1686109014,
            "updatedAt": 1686109014
        }
    }
}
```
