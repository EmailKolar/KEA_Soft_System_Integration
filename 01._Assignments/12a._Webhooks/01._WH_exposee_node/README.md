# **WEBHOOK INTEGRATION GUIDE**

If you want to integrate my exposed webhooks, read this guide.

---

## **Supported Event Types**

| **Event Type**       | **Description**                          |
|-----------------------|------------------------------------------|
| `invoice.created`     | When a new invoice is created            |
| `invoice.sent`        | When an invoice is sent to a client      |
| `invoice.paid`        | When an invoice is marked as paid        |
| `invoice.cancelled`   | When an invoice is cancelled             |

---

## **How to Register a Webhook**

### **Endpoint**:  
`POST /webhooks/register`

### **Request Body**:
```json
{
  "url": "https://your-server.com/whatever",
  "event": "invoice.paid"
}
```

### **Response**:
```json
{
  "success": true,
  "id": 1
}
```

---

## **Test Webhooks With `/ping`**

You can test if your server is receiving webhooks correctly.

### **Endpoint**:  
`POST /ping`

This triggers a fake `invoice.paid` event for testing purposes.

---

## **Trigger Other Events (for Dev/Test)**

You can manually trigger any event using:

### **Endpoint**:  
`POST /simulate/:event`

### **Example**:
`POST /simulate/invoice.created`

### **Request Body (optional)**:
```json
{
  "custom": "data"
}
```

---

## **How to Unregister a Webhook**

### **Endpoint**:  
`POST /webhooks/unregister`

### **Request Body**:
```json
{
  "url": "https://your-server.com/whatever",
  "event": "invoice.paid"
}
```

### **Response**:
```json
{
  "success": true
}
```


